// engine/engine.js

// 1. Configuration
const defaultPlaygroundCode = `# Welcome to the CSC1184 Playground
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
    
    // Optional: Load common packages
    await pyodide.loadPackage(["numpy", "pandas"]);
    
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
    
    // Editor Setup
    const htmlCode = codeTA.value.replace(/\r\n?/g, '\n');
    const initialCode = htmlCode.length > 0 ? htmlCode : defaultPlaygroundCode;
    const editor = CodeMirror.fromTextArea(codeTA, {
        mode: 'python', theme: 'eclipse',
        lineNumbers: true, matchBrackets: true, indentUnit: 4
    });
    editor.setValue(initialCode);
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

    // --- SAFETY & STATE CONFIG ---
    const MAX_OUTPUT_CHARS = 10000; 
    let accumulatedOutput = "";
    let isOutputPending = false;
    let rafId = null; // Track the animation frame to prevent race conditions

    // Helper: UI Updates
    function setStatus(msg, type='idle'){
        if(statusEl) statusEl.textContent = msg;
        if(dotEl) dotEl.className = 'dot ' + (type === 'idle' ? '' : type);
    }

    // Helper: Throttle DOM updates to prevent freezing
    function flushOutput() {
        if (!isOutputPending && accumulatedOutput.length === 0 && outputEl.textContent === '') return;
        outputEl.textContent = accumulatedOutput;
        outputEl.scrollTop = outputEl.scrollHeight; 
        isOutputPending = false;
    }

    function setControlsDisabled(disabled, msg){
        [btnRun, btnClear, btnReset].forEach(btn => {
            if(btn) btn.disabled = disabled;
        });
        editor.setOption('readOnly', disabled ? true : false);
        editorWrapper.classList.toggle('readonly', disabled);
        overlay.style.pointerEvents = disabled ? 'auto' : 'none';
        
        // Mobile height fix
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
        
        // Reset State
        outputEl.textContent = ''; 
        accumulatedOutput = "";
        isOutputPending = false;
        
        // Cancel any pending updates from previous runs or lingering loops
        if (rafId) cancelAnimationFrame(rafId);
        
        try {
            if(!pyodide) {
                setControlsDisabled(true, 'Downloading Python Engine...');
                await loadPyodideEngine(setStatus);
                setControlsDisabled(false);
            }
            
            setStatus('Running...', 'idle');

            // 1. FIX FOR MEMORY LEAK (Variable Persistence)
            // Wipe global variables so Block B doesn't see Block A's data.
            // Note: Users must re-import libraries (import pandas as pd) every time.
            pyodide.runPython(`
                # Clear all global variables except internal python builtins
                for name in list(globals().keys()):
                    if not name.startswith("_"):
                        del globals()[name]
            `);

            // 2. FIX FOR INFINITE LOOPS (Crash Prevention)
            pyodide.setStdout({
                batched: (text) => {
                    // Check if we exceeded the limit
                    if (accumulatedOutput.length > MAX_OUTPUT_CHARS) {
                        // CRITICAL: Throwing an Error here stops the Python engine!
                        throw new Error("STDOUT_LIMIT_EXCEEDED");
                    }

                    accumulatedOutput += text + "\n";
                    
                    // Throttle UI updates
                    if (!isOutputPending) {
                        isOutputPending = true;
                        // Assign ID so we can cancel it if an error occurs
                        rafId = requestAnimationFrame(flushOutput);
                    }
                }
            });

            // 3. Execute
            await pyodide.runPythonAsync(code);
            
            flushOutput();
            setStatus('Execution successful', 'ok');

        } catch(err) {
            // FIX: Cancel pending successful print updates. 
            // Prevents the "success" text from overwriting the error message.
            if (rafId) cancelAnimationFrame(rafId);

            flushOutput(); // Show whatever text we have so far

            // 4. Handle our custom "Kill Switch" Error
            if (err.toString().includes("STDOUT_LIMIT_EXCEEDED")) {
                setStatus('Terminated', 'err');
                const msg = document.createElement('div');
                msg.className = 'stderr';
                msg.style.marginTop = "10px";
                msg.textContent = "--- Execution Stopped: Output limit exceeded (possible infinite loop) ---";
                outputEl.appendChild(msg);
            } else {
                // Handle normal Python errors
                setStatus('Error', 'err');
                const errSpan = document.createElement('span');
                errSpan.className = 'stderr';
                errSpan.textContent = "\n" + err.toString();
                outputEl.appendChild(errSpan);
            }
        }
    }

    // Bind Buttons
    if(btnRun) btnRun.addEventListener('click', run);
    
    if(btnClear) btnClear.addEventListener('click', () => { 
        outputEl.textContent = ''; 
        accumulatedOutput = ""; 
        setStatus('Cleared'); 
    });
    
    if(btnReset) btnReset.addEventListener('click', () => { 
        editor.setValue(initialCode); 
        setStatus('Reset'); 
    });
    
    // Initial Load
    setControlsDisabled(true, 'Downloading Python Engine...');
    loadPyodideEngine(setStatus)
      .then(() => { setControlsDisabled(false); setStatus('Python Ready', 'ok'); })
      .catch(() => setStatus('Error loading Python', 'err'));
}