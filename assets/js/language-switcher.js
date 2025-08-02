// Language switcher functionality
document.addEventListener('DOMContentLoaded', () => {
    const languageToggles = document.querySelectorAll('.language-toggle');
    const currentLang = document.documentElement.getAttribute('lang') || 'en';
    
    // Set initial active state
    document.querySelector(`[data-lang="${currentLang}"]`).classList.add('active');
    
    languageToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const selectedLang = toggle.getAttribute('data-lang');
            
            // Update active state
            languageToggles.forEach(t => t.classList.remove('active'));
            toggle.classList.add('active');
            
            // Update document language
            document.documentElement.setAttribute('lang', selectedLang);
            
            // Here you would typically trigger content translation
            // For now, we'll just store the preference
            localStorage.setItem('preferred-language', selectedLang);
        });
    });
});