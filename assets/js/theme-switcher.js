document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = document.querySelector('.theme-icon');
    
    // Get stored theme or default to dark
    const storedTheme = localStorage.getItem('theme') || 'dark';
    
    // Apply stored theme
    applyTheme(storedTheme);
    
    // Theme toggle click handler
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });
    
    function applyTheme(theme) {
        if (theme === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
            themeIcon.textContent = '🌙';
        } else {
            document.documentElement.removeAttribute('data-theme');
            themeIcon.textContent = '☀️';
        }
    }
});