// Minimal language switcher for hyper-minimalist design
let currentLang = 'en';
let translations = {};

// Load translations from JSON files
async function loadTranslations() {
    try {
        const enResponse = await fetch('assets/lang/en.json');
        const deResponse = await fetch('assets/lang/de.json');
        
        translations.en = await enResponse.json();
        translations.de = await deResponse.json();
        
        return true;
    } catch (error) {
        console.error('Error loading translations:', error);
        return false;
    }
}

// Apply translations to page
function applyTranslations(lang) {
    const langData = translations[lang];
    if (!langData) return;
    
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        const translation = getNestedTranslation(langData, key);
        
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
function switchLanguage() {
    const newLang = currentLang === 'en' ? 'de' : 'en';
    currentLang = newLang;
    
    // Update translations
    applyTranslations(currentLang);
    
    // Update document language
    document.documentElement.setAttribute('lang', currentLang);
    
    // Store preference
    localStorage.setItem('preferred-language', currentLang);
}

document.addEventListener('DOMContentLoaded', async () => {
    // Load translations first
    const loaded = await loadTranslations();
    if (!loaded) return;
    
    // Get preferred language
    const savedLang = localStorage.getItem('preferred-language');
    currentLang = savedLang || document.documentElement.getAttribute('lang') || 'en';
    
    // Apply initial translations
    applyTranslations(currentLang);
    
    // Add click listener to language toggle
    const languageToggle = document.querySelector('.language-toggle');
    if (languageToggle) {
        languageToggle.addEventListener('click', switchLanguage);
    }
});