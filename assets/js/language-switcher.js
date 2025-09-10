// Language switcher with embedded translations
let currentLang = 'en';

const translations = {
    en: {
        "meta": {
            "title": "Bitcoin Treasury Strategy"
        },
        "nav": {
            "home": "Home",
            "services": "Services",
            "about": "About",
            "contact": "Contact"
        },
        "hero": {
            "title": "Bitcoin Treasury Strategy",
            "subtitle": "Inflation protection for companies.",
            "description": "No speculation. No complexity. Only clear strategies for liquidity reserves."
        },
        "highlights": {
            "adoption": "Treasury Analysis",
            "mining": "Bitcoin Integration",
            "preparation": "Risk Management"
        },
        "services": {
            "title": "Services",
            "strategy": {
                "title": "Treasury Analysis",
                "description": "Assessment of your current liquidity position and inflation exposure"
            },
            "mining": {
                "title": "Bitcoin Integration",
                "description": "Regulatory-compliant implementation for companies"
            },
            "technical": {
                "title": "Risk Management",
                "description": "Conservative allocation strategies and hedging concepts"
            }
        },
        "about": {
            "title": "Corporate Bitcoin Guide",
            "description": "[Download Corporate Bitcoin Guide]"
        },
        "contact": {
            "title": "Contact",
            "description": "",
            "email": "Email"
        },
        "footer": {
            "text": "jakob@jamann.io"
        }
    },
    de: {
        "meta": {
            "title": "Bitcoin Treasury Strategie"
        },
        "nav": {
            "home": "Start",
            "services": "Leistungen",
            "about": "Über mich",
            "contact": "Kontakt"
        },
        "hero": {
            "title": "Bitcoin Treasury Strategie",
            "subtitle": "Inflationsschutz für Unternehmen.",
            "description": "Keine Spekulationen. Keine Komplexität. Nur klare Strategien für Liquiditätsreserven."
        },
        "highlights": {
            "adoption": "Treasury-Analyse",
            "mining": "Bitcoin-Integration",
            "preparation": "Risikomanagement"
        },
        "services": {
            "title": "Leistungen",
            "strategy": {
                "title": "Treasury-Analyse",
                "description": "Bewertung Ihrer aktuellen Liquiditätsposition und Inflationsexposition"
            },
            "mining": {
                "title": "Bitcoin-Integration",
                "description": "BaFin-konforme Implementierung für deutsche Unternehmen"
            },
            "technical": {
                "title": "Risikomanagement",
                "description": "Konservative Allokationsstrategien und Absicherungskonzepte"
            }
        },
        "about": {
            "title": "Corporate Bitcoin Guide",
            "description": "[Corporate Bitcoin Guide herunterladen]"
        },
        "contact": {
            "title": "Kontakt",
            "description": "",
            "email": "E-Mail"
        },
        "footer": {
            "text": "jakob@jamann.io"
        }
    }
};

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
    
    // Update flag display
    updateFlagDisplay();
    
    // Update document language
    document.documentElement.setAttribute('lang', currentLang);
    
    // Store preference
    localStorage.setItem('preferred-language', currentLang);
}

// Update flag display
function updateFlagDisplay() {
    const currentFlag = document.querySelector('.current-flag');
    const nextFlag = document.querySelector('.next-flag');
    
    if (currentLang === 'en') {
        currentFlag.textContent = '🇬🇧';
        nextFlag.textContent = '🇩🇪';
    } else {
        currentFlag.textContent = '🇩🇪';
        nextFlag.textContent = '🇬🇧';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Get preferred language
    const savedLang = localStorage.getItem('preferred-language');
    currentLang = savedLang || document.documentElement.getAttribute('lang') || 'en';
    
    // Apply initial translations
    applyTranslations(currentLang);
    updateFlagDisplay();
    
    // Add click listener to language toggle
    const languageToggle = document.querySelector('.language-toggle');
    if (languageToggle) {
        languageToggle.addEventListener('click', switchLanguage);
    }
});