// Language switcher functionality
let translations = {};

// Load translation file
async function loadTranslations(lang) {
    try {
        const response = await fetch(`assets/lang/${lang}.json`);
        return await response.json();
    } catch (error) {
        console.error('Error loading translations:', error);
        return null;
    }
}

// Apply translations to page
function applyTranslations(translations) {
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        const translation = getNestedTranslation(translations, key);
        
        if (translation) {
            if (element.tagName === 'TITLE') {
                element.textContent = translation;
                document.title = translation;
            } else {
                element.textContent = translation;
            }
        }
    });
}

// Get nested translation value (e.g., "hero.title")
function getNestedTranslation(obj, path) {
    return path.split('.').reduce((current, key) => current && current[key], obj);
}

// Switch language
async function switchLanguage(lang) {
    const newTranslations = await loadTranslations(lang);
    if (newTranslations) {
        translations = newTranslations;
        applyTranslations(translations);
        
        // Update document language
        document.documentElement.setAttribute('lang', lang);
        
        // Store preference
        localStorage.setItem('preferred-language', lang);
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    const languageToggles = document.querySelectorAll('.language-toggle');
    
    // Get preferred language
    const savedLang = localStorage.getItem('preferred-language');
    const currentLang = savedLang || document.documentElement.getAttribute('lang') || 'en';
    
    // Load initial translations
    translations = await loadTranslations(currentLang);
    if (translations) {
        applyTranslations(translations);
    }
    
    // Set initial active state
    document.querySelector(`[data-lang="${currentLang}"]`)?.classList.add('active');
    
    // Add click listeners
    languageToggles.forEach(toggle => {
        toggle.addEventListener('click', async () => {
            const selectedLang = toggle.getAttribute('data-lang');
            
            // Update active state
            languageToggles.forEach(t => t.classList.remove('active'));
            toggle.classList.add('active');
            
            // Switch language
            await switchLanguage(selectedLang);
        });
    });
});