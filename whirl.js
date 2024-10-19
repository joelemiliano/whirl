// Function that loads the templates and they get converted to JS global variables
function applyTemplates() {
    // Get template content
    const templatesContent = document.querySelector('templates').innerHTML;
    // Separate template lines
    const templateLines = templatesContent.split(';');
    templateLines.forEach(line => {
        if (line.trim()) {
            const [key, value] = line.split('=');
            const varName = key.trim().replace('$', ''); // Delete the $ to make the variable valid in JS
            const varValue = value.trim().replace(/(^"|"$)/g, ''); // Delete comma of the value
            // Define the global variable in JS
            window[varName] = varValue;
        }
    });
    // Replace the variables in the HTML with their corresponding value
    document.body.innerHTML = document.body.innerHTML.replace(/\$[a-zA-Z0-9_]+/g, function(match) {
        const varName = match.replace('$', ''); // Delete the $ to find the variable in the JS
        return window[varName] !== undefined && window[varName] !== "" ? window[varName] : '<br /><span style="color:red; font-weight:bold;">(!) Empty template value</span><br />';
    });
    // Delete the <templates> tag in the DOM
    const templates = document.querySelector('templates');
    if (templates) {
        templates.remove();
    }
}

// Run the function when the DOM is completely loaded
document.addEventListener('DOMContentLoaded', applyTemplates);
