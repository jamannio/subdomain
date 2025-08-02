function createDecryptEffect(element) {
    const originalText = element.textContent;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()₿⚡';
    
    let interval;
    let currentIndex = 0;
    
    const mouseEnterHandler = () => {
        // Only run in dark mode
        const isDarkMode = !document.documentElement.hasAttribute('data-theme') || 
                          document.documentElement.getAttribute('data-theme') !== 'light';
        if (!isDarkMode) return;
        
        currentIndex = 0;
        interval = setInterval(() => {
            element.textContent = originalText
                .split('')
                .map((char, index) => {
                    if (index < currentIndex) {
                        return originalText[index];
                    }
                    return characters[Math.floor(Math.random() * characters.length)];
                })
                .join('');
            
            currentIndex += 1/3; // Speed of decryption
            
            if (currentIndex >= originalText.length) {
                clearInterval(interval);
                element.textContent = originalText;
            }
        }, 30);
    };
    
    const mouseLeaveHandler = () => {
        clearInterval(interval);
        element.textContent = originalText;
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