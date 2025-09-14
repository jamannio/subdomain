function createDecryptEffect(element) {
    const originalText = element.textContent;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()₿';
    
    let interval;
    let currentIndex = 0;
    
    element.addEventListener('mouseenter', () => {
        currentIndex = 0;
        const totalFrames = 1000 / 30; // 1s at 30ms intervals = ~33.3 frames
        const speed = originalText.length / totalFrames; // characters per frame
        interval = setInterval(() => {
            element.textContent = originalText
                .split('')
                .map((_, index) => {
                    if (index < currentIndex) {
                        return originalText[index];
                    }
                    return characters[Math.floor(Math.random() * characters.length)];
                })
                .join('');
            
            currentIndex += speed;
            
            if (currentIndex >= originalText.length) {
                clearInterval(interval);
                element.textContent = originalText;
            }
        }, 30);
    });
    
    element.addEventListener('mouseleave', () => {
        clearInterval(interval);
        element.textContent = originalText;
    });
}

// Initialize the effect on all elements with the decrypt-effect class
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.decrypt-effect').forEach(createDecryptEffect);
});