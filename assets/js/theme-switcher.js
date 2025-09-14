document.addEventListener('DOMContentLoaded', () => {
    // Set initial color from localStorage or default to purple
    const storedColor = localStorage.getItem('accentColor') || '#9D00FF';
    const rgb = hexToRgb(storedColor);
    
    document.documentElement.style.setProperty('--accent-color', storedColor);
    if (rgb) {
        document.documentElement.style.setProperty('--accent-color-rgb', `${rgb.r}, ${rgb.g}, ${rgb.b}`);
    }
    updateActiveColor(storedColor);
});

// Helper function to convert hex to RGB
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

// Add click handlers to color options
document.querySelectorAll('.color-option').forEach(option => {
    option.addEventListener('click', (e) => {
        const color = e.target.dataset.color;
        const rgb = hexToRgb(color);
        
        document.documentElement.style.setProperty('--accent-color', color);
        if (rgb) {
            document.documentElement.style.setProperty('--accent-color-rgb', `${rgb.r}, ${rgb.g}, ${rgb.b}`);
        }
        
        localStorage.setItem('accentColor', color);
        updateActiveColor(color);
    });
});

// Update active state of color options
function updateActiveColor(activeColor) {
    document.querySelectorAll('.color-option').forEach(option => {
        option.classList.toggle('active', option.dataset.color === activeColor);
    });
}