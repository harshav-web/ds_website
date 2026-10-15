import { useEffect, useRef, useState } from 'react';
import { Check, Copy, Play, RotateCcw, Square, Terminal, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CodeRunner({ initialCode }: { initialCode: string }) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [plots, setPlots] = useState<string[]>([]);
  const [running, setRunning] = useState(false);
  const [status, setStatus] = useState('');
  const [copied, setCopied] = useState(false);
  const worker = useRef<Worker | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { worker.current?.terminate(); if (timer.current) clearTimeout(timer.current); }, []);
  function stop() {
    worker.current?.terminate(); worker.current = null;
    if (timer.current) clearTimeout(timer.current);
    setRunning(false); setStatus('Execution stopped.');
  }
  function run() {
    setRunning(true); setOutput(''); setPlots([]); setStatus('Preparing Python…');
    if (!worker.current) worker.current = new Worker(import.meta.env.BASE_URL + 'python-worker.js');
    worker.current.onmessage = ({ data }) => {
      if (data.type === 'status') setStatus(data.text);
      if (data.type === 'stdout') setOutput(value => value + data.text + '\n');
      if (data.type === 'done' || data.type === 'error') {
        if (timer.current) clearTimeout(timer.current);
        setRunning(false);
        setStatus(data.type === 'error' ? 'Execution failed' : 'Execution complete');
        if (data.type === 'error') setOutput(value => value + data.text);
        else setPlots(data.plots);
      }
    };
    worker.current.onerror = () => { stop(); setStatus('Python could not load. Check your connection and try again.'); };
    worker.current.postMessage({ code });
    timer.current = setTimeout(() => { stop(); setStatus('Time limit reached. Try again after packages have downloaded.'); }, 180000);
  }
  async function copy() {
    try { await navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 1800); }
    catch { setStatus('Copy unavailable. Select and copy the code manually.'); }
  }
  return <div className="code-workspace">
    <div className="code-toolbar"><div className="flex items-center gap-2"><span className="file-dot"/><span>main.py</span><span className="code-language">Python 3</span></div><div className="flex gap-1"><Button variant="ghost" size="icon" title="Reset code" aria-label="Reset code" onClick={() => setCode(initialCode)} disabled={running}><RotateCcw/></Button><Button variant="ghost" size="icon" title="Copy code" aria-label="Copy code" onClick={copy}>{copied ? <Check/> : <Copy/>}</Button></div></div>
    <div className="editor-wrap"><div className="line-numbers" aria-hidden="true">{code.split('\n').map((_, index) => <span key={index}>{index + 1}</span>)}</div><textarea aria-label="Python source code" className="python-editor" value={code} onChange={event => setCode(event.target.value)} spellCheck={false}/></div>
    <div className="run-toolbar"><span className="flex items-center gap-2"><span className="ready-dot"/>Browser Python · pandas + NumPy</span>{running ? <Button variant="secondary" onClick={stop}><Square/>Stop</Button> : <Button onClick={run}><Play/>Run code</Button>}</div>
    <div className="output-panel"><div className="output-label"><Terminal size={15}/>OUTPUT {running && <Loader2 className="animate-spin" size={14}/>}<span role="status">{status}</span></div>{output ? <pre>{output}</pre> : <p className="output-empty">{running ? 'Your Python session is starting…' : 'Ready when you are.'}</p>}{plots.map((plot, index) => <img key={index} src={`data:image/png;base64,${plot}`} alt={`Python chart output ${index + 1}`} className="plot-output"/>)}</div>
  </div>;
}
