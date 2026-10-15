let runtime;
let initialized = false;
self.onmessage = async ({ data }) => {
  try {
    if (!initialized) {
      self.postMessage({ type: 'status', text: 'Preparing Python and data science packages…' });
      importScripts('https://cdn.jsdelivr.net/pyodide/v0.27.7/full/pyodide.js');
      runtime = await loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.27.7/full/' });
      await runtime.loadPackage(['numpy', 'pandas', 'matplotlib', 'micropip']);
      await runtime.runPythonAsync("import micropip\nawait micropip.install(['openpyxl', 'seaborn'])");
      initialized = true;
    }
    self.postMessage({ type: 'status', text: 'Running your code…' });
    runtime.setStdout({ batched: (text) => self.postMessage({ type: 'stdout', text }) });
    runtime.setStderr({ batched: (text) => self.postMessage({ type: 'stdout', text }) });
    await runtime.runPythonAsync(`import matplotlib\nmatplotlib.use('agg')\nimport matplotlib.pyplot as plt\nplt.close('all')\n`);
    await runtime.runPythonAsync(data.code);
    const plots = await runtime.runPythonAsync(`\nimport io, base64\n_images = []\nfor _number in plt.get_fignums():\n    _buffer = io.BytesIO()\n    plt.figure(_number).savefig(_buffer, format='png', bbox_inches='tight', dpi=110)\n    _images.append(base64.b64encode(_buffer.getvalue()).decode('ascii'))\n_images\n`);
    self.postMessage({ type: 'done', plots: plots.toJs() });
    plots.destroy();
  } catch (error) {
    self.postMessage({ type: 'error', text: String(error) });
  }
};
