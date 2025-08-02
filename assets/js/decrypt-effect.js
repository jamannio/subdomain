function createDecryptEffect(element) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()₿⚡';
    
    let interval;
    let currentIndex = 0;
    let currentText = '';
    
    const mouseEnterHandler = () => {
        // Only run in dark mode
        const isDarkMode = !document.documentElement.hasAttribute('data-theme') || 
                          document.documentElement.getAttribute('data-theme') !== 'light';
        if (!isDarkMode) return;
        
        // Always get the current text content at the time of hover
        currentText = element.textContent;
        currentIndex = 0;
        
        interval = setInterval(() => {
            element.textContent = currentText
                .split('')
                .map((char, index) => {
                    if (index < currentIndex) {
                        return currentText[index];
                    }
                    return characters[Math.floor(Math.random() * characters.length)];
                })
                .join('');
            
            currentIndex += 1/3; // Speed of decryption
            
            if (currentIndex >= currentText.length) {
                clearInterval(interval);
                element.textContent = currentText;
            }
        }, 30);
    };
    
    const mouseLeaveHandler = () => {
        clearInterval(interval);
        // Always restore the current text content
        element.textContent = currentText || element.textContent;
    };
    
    element.addEventListener('mouseenter', mouseEnterHandler);
    element.addEventListener('mouseleave', mouseLeaveHandler);
}

// Initialize the effect on all elements with the decrypt-effect class (only in dark mode)
document.addEventListener('DOMContentLoaded', () => {
    const initializeDecryptEffects = () => {
        const isDarkMode = !document.documentElement.hasAttribute('data-theme') || 
                          document.documentElement.getAttribute('data-theme') !== 'light';
        
        if (isDarkMode) {
            document.querySelectorAll('.decrypt-effect').forEach(createDecryptEffect);
        }
    };
    
    initializeDecryptEffects();
    
    // Re-initialize when theme changes
    const observer = new MutationObserver(initializeDecryptEffects);
    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme']
    });
});