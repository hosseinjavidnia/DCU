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
    
    // Set initial code
    const htmlCode = codeTA.value.trim();
    const editor = CodeMirror.fromTextArea(codeTA, {
        mode: 'python', theme: 'eclipse',
        lineNumbers: true, matchBrackets: true, indentUnit: 4
    });
    editor.setValue(htmlCode.length > 0 ? htmlCode : defaultPlaygroundCode);

    // Helper: UI Updates
    function setStatus(msg, type='idle'){
        if(statusEl) statusEl.textContent = msg;
        if(dotEl) dotEl.className = 'dot ' + (type === 'idle' ? '' : type);
    }

    // Main Run Function
    async function run(){
        const code = editor.getValue();
        outputEl.textContent = ''; // Clear previous output
        
        try {
            // 1. Ensure Engine is Loaded
            if(!pyodide) await loadPyodideEngine(setStatus);
            
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
    if(section.querySelector('.run')) section.querySelector('.run').addEventListener('click', run);
    
    if(section.querySelector('.clear')) section.querySelector('.clear').addEventListener('click', () => { 
        outputEl.textContent = ''; 
        setStatus('Cleared'); 
    });
    
    if(section.querySelector('.reset')) section.querySelector('.reset').addEventListener('click', () => { 
        editor.setValue(defaultPlaygroundCode); 
        setStatus('Reset'); 
    });
    
    // Pre-load Pyodide when page opens (optional, makes first run faster)
    setTimeout(() => loadPyodideEngine(setStatus), 1000);
}
