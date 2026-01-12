// API configuration
const API_BASE_URL = 'http://localhost:8000';

// DOM elements
const llmSelect = document.getElementById('llm-select');
const optimizeBtn = document.getElementById('optimize-btn');
const userPromptInput = document.getElementById('user-prompt');
const resultSection = document.getElementById('result-section');
const optimizedOutput = document.getElementById('optimized-output');
const copyBtn = document.getElementById('copy-btn');
const loadingDiv = document.getElementById('loading');

// Optimize button click
optimizeBtn.addEventListener('click', async () => {
    const userPrompt = userPromptInput.value.trim();
    const selectedLLM = llmSelect.value;
    
    if (!userPrompt) {
        alert('Please enter a prompt to optimize');
        return;
    }
    
    try {
        // Show loading
        loadingDiv.style.display = 'block';
        resultSection.style.display = 'none';
        optimizeBtn.disabled = true;
        
        // Make API call
        const response = await fetch(`${API_BASE_URL}/optimize?user_prompt=${encodeURIComponent(userPrompt)}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                target_llm: selectedLLM,
                user_preferences: {}
            })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Display result
        optimizedOutput.textContent = data.optimized_prompt;
        resultSection.style.display = 'block';
        loadingDiv.style.display = 'none';
        
        // Scroll to result
        resultSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to optimize prompt. Please make sure the backend is running.');
        loadingDiv.style.display = 'none';
    } finally {
        optimizeBtn.disabled = false;
    }
});

// Copy to clipboard
copyBtn.addEventListener('click', async () => {
    const text = optimizedOutput.textContent;
    
    try {
        await navigator.clipboard.writeText(text);
        
        // Visual feedback
        const originalText = copyBtn.textContent;
        copyBtn.textContent = '✓ Copied!';
        
        setTimeout(() => {
            copyBtn.textContent = originalText;
        }, 2000);
    } catch (error) {
        console.error('Failed to copy:', error);
        alert('Failed to copy to clipboard');
    }
});

// Allow Enter key to submit (with Shift+Enter for new line)
userPromptInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        optimizeBtn.click();
    }
});
