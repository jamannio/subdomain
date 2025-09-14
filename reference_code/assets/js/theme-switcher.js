document.addEventListener('DOMContentLoaded', () => {
    // Set initial color from localStorage or default to purple
    const storedColor = localStorage.getItem('accentColor') || '#9D00FF';
    document.documentElement.style.setProperty('--accent-color', storedColor);
    updateActiveColor(storedColor);
});

// Add click handlers to color options
document.querySelectorAll('.color-option').forEach(option => {
    option.addEventListener('click', (e) => {
        const color = e.target.dataset.color;
        document.documentElement.style.setProperty('--accent-color', color);
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