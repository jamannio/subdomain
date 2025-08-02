// Language switcher with embedded translations
let currentLang = 'en';

const translations = {
    en: {
        "meta": {
            "title": "Bitcoin Consulting Services"
        },
        "nav": {
            "home": "Home",
            "services": "Services",
            "about": "About",
            "contact": "Contact"
        },
        "hero": {
            "title": "Independent. Immutable. Inevitable.",
            "subtitle": "Bitcoin Consulting",
            "description": "Straightforward Bitcoin consulting. No LinkedIn BS, just knowledge and the help you need. I help individuals and businesses prepare for monetary reality through Bitcoin adoption."
        },
        "highlights": {
            "adoption": "Bitcoin adoption strategy",
            "mining": "Mining operations setup & optimization",
            "preparation": "Monetary collapse preparation"
        },
        "services": {
            "title": "Services",
            "strategy": {
                "title": "Bitcoin Strategy",
                "description": "Direct guidance on Bitcoin adoption. I help you understand the monetary landscape and implement Bitcoin solutions that actually work."
            },
            "mining": {
                "title": "Mining Operations",
                "description": "Setup and optimize mining operations. From hardware selection to operational efficiency - no theoretical BS, just practical results."
            },
            "technical": {
                "title": "Technical Implementation",
                "description": "Hands-on Bitcoin infrastructure consulting. Security, custody, integration - the technical foundation you need to survive monetary chaos."
            }
        },
        "about": {
            "title": "About",
            "description": "Bitcoin consultant focused on practical implementation. Years of experience in mining operations, technical infrastructure, and helping businesses prepare for monetary reality. No corporate buzzwords - just straightforward expertise when you need it most."
        },
        "contact": {
            "title": "Contact",
            "description": "Ready to discuss your Bitcoin project?",
            "email": "Email"
        },
        "footer": {
            "text": "Professional Bitcoin consulting services"
        }
    },
    de: {
        "meta": {
            "title": "Bitcoin Beratungsdienstleistungen"
        },
        "nav": {
            "home": "Start",
            "services": "Leistungen",
            "about": "Über mich",
            "contact": "Kontakt"
        },
        "hero": {
            "title": "Unabhängig. Unveränderbar. Unaufhaltsam.",
            "subtitle": "Bitcoin Beratung",
            "description": "Direkte Bitcoin-Beratung. Kein LinkedIn-Geschwätz, nur Wissen und die Hilfe, die du brauchst. Ich helfe Privatpersonen und Unternehmen, sich durch Bitcoin-Adoption auf die monetäre Realität vorzubereiten."
        },
        "highlights": {
            "adoption": "Bitcoin-Adoptionsstrategie",
            "mining": "Mining-Betrieb Setup & Optimierung",
            "preparation": "Vorbereitung auf Währungskollaps"
        },
        "services": {
            "title": "Leistungen",
            "strategy": {
                "title": "Bitcoin-Strategie",
                "description": "Direkte Beratung zur Bitcoin-Adoption. Ich helfe dir, die monetäre Landschaft zu verstehen und Bitcoin-Lösungen umzusetzen, die wirklich funktionieren."
            },
            "mining": {
                "title": "Mining-Betrieb",
                "description": "Setup und Optimierung von Mining-Operationen. Von Hardware-Auswahl bis zu operativer Effizienz - kein theoretisches Geschwätz, nur praktische Ergebnisse."
            },
            "technical": {
                "title": "Technische Umsetzung",
                "description": "Praxisnahe Bitcoin-Infrastruktur-Beratung. Sicherheit, Verwahrung, Integration - das technische Fundament, das du brauchst, um das monetäre Chaos zu überleben."
            }
        },
        "about": {
            "title": "Über mich",
            "description": "Bitcoin-Berater mit Fokus auf praktische Umsetzung. Jahrelange Erfahrung in Mining-Operationen, technischer Infrastruktur und dabei zu helfen, Unternehmen auf die monetäre Realität vorzubereiten. Keine Unternehmens-Buzzwords - nur direkte Expertise, wenn du sie am meisten brauchst."
        },
        "contact": {
            "title": "Kontakt",
            "description": "Bereit, dein Bitcoin-Projekt zu besprechen?",
            "email": "E-Mail"
        },
        "footer": {
            "text": "Professionelle Bitcoin-Beratungsdienstleistungen"
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