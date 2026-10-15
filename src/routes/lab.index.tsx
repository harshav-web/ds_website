import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState, type FormEvent } from 'react';
import { Plus, FlaskConical, BookOpen, Code2 } from 'lucide-react';
import { PageHeading } from '@/components/laboratory/shell';
import { StudentCard } from '@/components/laboratory/student-card';
import { ExperimentList } from '@/components/laboratory/experiment-list';
import { experiments, practicalCount, type Experiment } from '@/data/experiments';
import { readExperiments, storageKey } from '@/data/local-experiments';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
export const Route = createFileRoute('/lab/')({ head: () => ({ meta: [{ title: 'Laboratory Experiments | Data Science — Semester 5' }, { name: 'description', content: 'Explore six Data Science experiments and 26 practical sections in Harshavardhan Reddy V.’s laboratory.' }, { property: 'og:title', content: 'Data Science Laboratory Experiments' }, { property: 'og:description', content: 'Import, clean, transform, visualize and analyze real data with Python.' }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] }), component: Laboratory });
function Laboratory() {
 const [extra, setExtra] = useState<Experiment[]>([]); const [open, setOpen] = useState(false); const [error, setError] = useState('');
 useEffect(() => setExtra(readExperiments()), []);
 function save(event: FormEvent<HTMLFormElement>) {
   event.preventDefault(); const data = new FormData(event.currentTarget); const field = (name: string) => String(data.get(name) ?? '').trim();
   const id = field('number').padStart(2, '0');
   if ([...experiments, ...extra].some(item => item.id === id)) { setError('This experiment number already exists. Choose another number.'); return; }
   const newExperiment: Experiment = { id, title: field('title'), summary: field('description'), date: field('date'), status: field('status'), remarks: field('remarks'), sections: [{ title: field('title'), objective: field('objective'), code: field('code'), video: '', }] };
   try { const next = [...extra, newExperiment]; localStorage.setItem(storageKey, JSON.stringify(next)); setExtra(next); setOpen(false); setError(''); } catch { setError('Your browser could not save this experiment. Check available storage.'); }
 }
 return <main className="page-container lab-page"><PageHeading title="Data Science Laboratory and Learnings" subtitle="Small experiments. Meaningful discoveries." profile/><StudentCard/><div className="lab-stats"><span><FlaskConical/>{6 + extra.length}<small>Experiments</small></span><span><BookOpen/>{practicalCount + extra.length}<small>Practical sections</small></span><span><Code2/>Python<small>Ready to run</small></span></div><section><div className="section-title"><h2>Experiments <span>{6 + extra.length} experiments</span></h2><Button variant="outline" onClick={() => setOpen(true)}><Plus/>Add experiment</Button></div><ExperimentList items={[...experiments, ...extra]}/></section><Dialog open={open} onOpenChange={setOpen}><DialogContent className="experiment-modal"><DialogTitle>Add an experiment</DialogTitle><DialogDescription>A new entry in your personal laboratory.</DialogDescription><form className="experiment-form" onSubmit={save}><div className="form-grid"><label>Experiment number<input name="number" type="number" min="7" max="999" defaultValue={7 + extra.length} required/></label><label>Date<input name="date" type="date" required/></label></div><label>Title<input name="title" required/></label><label>Objective<textarea name="objective" rows={2} required/></label><label>Description<textarea name="description" rows={2} required/></label><label>Python code<textarea name="code" rows={5} defaultValue={'print("Hello, Data Science!")'} required/></label><div className="form-grid"><label>Status<select name="status"><option>In progress</option><option>Completed</option></select></label><label>Remarks<input name="remarks"/></label></div>{error && <p role="alert" className="form-error">{error}</p>}<Button type="submit"><Plus/>Save experiment</Button></form></DialogContent></Dialog></main>;
}
