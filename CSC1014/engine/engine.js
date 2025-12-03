// engine/engine.js

// 1. Configuration
const defaultPlaygroundCode = `# Welcome to the CSC1014 Playground
# This is a real Python environment running in your browser.

def greet(name):
    return f"Hello, {name}!"

students = ["Alice", "Bob", "Charlie"]

print("--- Class Roster ---")
for s in students:
    print(greet(s))
`;

let pyodide = null;

async function loadPyodideEngine(setStatus) {
    if (pyodide) return pyodide;

    setStatus('Downloading Python Engine...', 'idle');
    
    // Initialize Pyodide
    pyodide = await loadPyodide();
    
    // Optional: Load common packages if you need them later
    // await pyodide.loadPackage(["numpy", "pandas"]);
    
    setStatus('Python Ready', 'idle');
    return pyodide;
}

function initPlayground(id) {
    const section = document.getElementById(id);
    if(!section) return;

    const codeTA = section.querySelector('textarea.code');
    const outputEl = section.querySelector('.output-box');
    const statusEl = section.querySelector('.status-text');
    const dotEl = section.querySelector('.dot');
    const btnRun = section.querySelector('.run');
    const btnClear = section.querySelector('.clear');
    const btnReset = section.querySelector('.reset');
    
    // Set initial code
    const htmlCode = codeTA.value.trim();
    const editor = CodeMirror.fromTextArea(codeTA, {
        mode: 'python', theme: 'eclipse',
        lineNumbers: true, matchBrackets: true, indentUnit: 4
    });
    editor.setValue(htmlCode.length > 0 ? htmlCode : defaultPlaygroundCode);
    requestAnimationFrame(() => editor.refresh());
    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => editor.refresh());
    }
    const editorWrapper = editor.getWrapperElement();
    editorWrapper.style.position = editorWrapper.style.position || 'relative';
    const overlay = document.createElement('div');
    overlay.style.position = 'absolute';
    overlay.style.inset = '0';
    overlay.style.zIndex = '5';
    overlay.style.pointerEvents = 'none';
    overlay.setAttribute('aria-hidden', 'true');
    editorWrapper.appendChild(overlay);

    // Helper: UI Updates
    function setStatus(msg, type='idle'){
        if(statusEl) statusEl.textContent = msg;
        if(dotEl) dotEl.className = 'dot ' + (type === 'idle' ? '' : type);
    }

    function setControlsDisabled(disabled, msg){
        [btnRun, btnClear, btnReset].forEach(btn => {
            if(btn) btn.disabled = disabled;
        });
        editor.setOption('readOnly', disabled ? true : false);
        editorWrapper.classList.toggle('readonly', disabled);
        overlay.style.pointerEvents = disabled ? 'auto' : 'none';
        const wrapEl = editorWrapper;
        if(disabled){
            wrapEl.style.height = 'auto';
            wrapEl.style.minHeight = '120px';
        } else {
            wrapEl.style.height = '';
            wrapEl.style.minHeight = '';
        }
        requestAnimationFrame(() => editor.refresh());
        if(!disabled) requestAnimationFrame(() => editor.refresh());
        if(disabled && msg) setStatus(msg, 'idle');
    }

    // Main Run Function
    async function run(){
        const code = editor.getValue();
        outputEl.textContent = ''; // Clear previous output
        
        try {
            // 1. Ensure Engine is Loaded
            if(!pyodide) {
                setControlsDisabled(true, 'Downloading Python Engine...');
                await loadPyodideEngine(setStatus);
                setControlsDisabled(false);
            }
            
            setStatus('Running...', 'idle');

            // 2. Setup Output Handling
            // Pyodide allows us to redirect stdout (print) to a function
            pyodide.setStdout({
                batched: (text) => {
                    outputEl.textContent += text + "\n";
                }
            });

            // 3. Run the Code
            // We use runPythonAsync to ensure the UI doesn't freeze
            await pyodide.runPythonAsync(code);
            
            setStatus('Execution successful', 'ok');

        } catch(err) {
            // 4. Handle Errors (The Magic Part)
            // Pyodide throws JS errors that contain the Python traceback.
            // We clean it up slightly to remove internal Pyodide references if needed.
            
            setStatus('Error', 'err');
            
            // Format the error to look like a terminal
            const errorText = err.toString();
            
            // Create a span with your 'stderr' class for red styling
            const errSpan = document.createElement('span');
            errSpan.className = 'stderr';
            errSpan.textContent = "\n" + errorText;
            
            outputEl.appendChild(errSpan);
        }
    }

    // Bind Buttons
    if(btnRun) btnRun.addEventListener('click', run);
    
    if(btnClear) btnClear.addEventListener('click', () => { 
        outputEl.textContent = ''; 
        setStatus('Cleared'); 
    });
    
    if(btnReset) btnReset.addEventListener('click', () => { 
        editor.setValue(defaultPlaygroundCode); 
        setStatus('Reset'); 
    });
    
    // Pre-load Pyodide when page opens; disable controls until ready
    setControlsDisabled(true, 'Downloading Python Engine...');
    loadPyodideEngine(setStatus)
      .then(() => { setControlsDisabled(false); setStatus('Python Ready', 'ok'); })
      .catch(() => setStatus('Error loading Python', 'err'));
}
