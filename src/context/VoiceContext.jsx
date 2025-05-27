// // src/context/VoiceContext.jsx
// import React, { createContext, useState, useEffect } from 'react';

// export const VoiceContext = createContext();

// export const VoiceProvider = ({ children }) => {
//   const [language, setLanguage] = useState('en-US'); // Default to English

//   const speak = (text) => {
//     if (!window.speechSynthesis) return;
//     window.speechSynthesis.cancel();
//     const utter = new SpeechSynthesisUtterance(text);
//     utter.lang = language;
//     const voices = window.speechSynthesis.getVoices();
//     utter.voice = voices.find(v => v.lang === language && v.name.toLowerCase().includes('female')) || voices[0];
//     window.speechSynthesis.speak(utter);
//   };

//   const promptLanguage = () => {
//     const prompt = language === 'en-US'
//       ? 'Press Left Alt + T to switch to Telugu. English is the default.'
//       : 'స్వాగతం. తెలుగుకు మార్చాలంటే ఎడమ ఆల్ట్ + T నొక్కండి. డిఫాల్ట్ ఇంగ్లీష్.';
//     speak(prompt);
//   };

//   useEffect(() => {
//     const handler = (e) => {
//       if (!e.altKey) return;
//       switch (e.key.toLowerCase()) {
//         case 't':
//           setLanguage(prev => (prev === 'en-US' ? 'te-IN' : 'en-US'));
//           break;
//         case 'j':
//           promptLanguage();
//           break;
//         case 'h':
//           window.location.pathname = '/';
//           break;
//         case 'l':
//           window.location.pathname = '/login';
//           break;
//         case 'r':
//           window.location.pathname = '/register';
//           break;
//         default:
//           return;
//       }
//     };
//     window.addEventListener('keydown', handler);
//     return () => window.removeEventListener('keydown', handler);
//   }, [language]);


//   return (
//     <VoiceContext.Provider value={{ language, speak }}>
//       {children}
//     </VoiceContext.Provider>
//   );
// };
// export const VoiceProvider = ({ children }) => {
//     const [language, setLanguage] = useState('en-US');
//     const [voices, setVoices] = useState([]);
  
//     // Load voices once
//     useEffect(() => {
//       const load = () => setVoices(window.speechSynthesis.getVoices());
//       window.speechSynthesis.addEventListener('voiceschanged', load);
//       load();
//       return () => window.speechSynthesis.removeEventListener('voiceschanged', load);
//     }, []);
  
//     const speak = (text) => {
//       if (!window.speechSynthesis) return;
//       window.speechSynthesis.cancel();
//       const utter = new SpeechSynthesisUtterance(text);
//       utter.lang = language;
//       utter.voice = voices.find(v =>
//         v.lang.startsWith(language.split('-')[0]) &&
//         v.name.toLowerCase().includes('female')
//       ) || voices[0];
//       window.speechSynthesis.speak(utter);
//     };
  
//     const promptLanguage = () => {
//       const prompt = language === 'en-US'
//         ? 'Welcome. Press Left Alt + T to switch to Telugu. English is the default.'
//         : 'స్వాగతం. తెలుగుకు మార్చాలంటే ఎడమ ఆల్ట్ + T నొక్కండి. డిఫాల్ట్ ఇంగ్లీష్.';
//       speak(prompt);
//     };
  
//     // ————————————————————————————————
//     // 1) Initial prompt: only once on mount
//     useEffect(() => {
//       const timeout = setTimeout(promptLanguage, 5000);
//       return () => clearTimeout(timeout);
//     }, []);  // <-- EMPTY dependency array!
  
//     // 2) Keyboard shortcuts
//     useEffect(() => {
//       const handler = (e) => {
//         if (!e.altKey) return;
//         switch (e.key.toLowerCase()) {
//           case 't':
//             setLanguage(prev => prev === 'en-US' ? 'te-IN' : 'en-US');
//             // immediately speak the language prompt in new language
//             setTimeout(promptLanguage, 0);
//             break;
//           case 'j':
//             promptLanguage();   // Alt+J always replays the prompt
//             break;
//           case 'h':
//             window.location.pathname = '/';
//             break;
//           case 'l':
//             window.location.pathname = '/login';
//             break;
//           case 'r':
//             window.location.pathname = '/register';
//             break;
//           default:
//             return;
//         }
//       };
//       window.addEventListener('keydown', handler);
//       return () => window.removeEventListener('keydown', handler);
//     }, [language, voices]);
  
//     return (
//       <VoiceContext.Provider value={{ language, speak }}>
//         {children}
//       </VoiceContext.Provider>
//     );
//   };
// import React, { createContext, useState, useEffect } from 'react';

// export const VoiceContext = createContext();

// export const VoiceProvider = ({ children }) => {
//   const [language, setLanguage] = useState('en-US'); // Default to English

//   const speak = (text) => {
//     if (!window.speechSynthesis) return;

//     const speakNow = () => {
//       window.speechSynthesis.cancel();
//       const utter = new SpeechSynthesisUtterance(text);
//       utter.lang = language;

//       const voices = window.speechSynthesis.getVoices();
//       utter.voice =
//         voices.find(
//           (v) =>
//             v.lang === language &&
//             v.name.toLowerCase().includes('female')
//         ) || voices[0];

//       window.speechSynthesis.speak(utter);
//     };

//     const voices = window.speechSynthesis.getVoices();
//     if (!voices.length) {
//       window.speechSynthesis.onvoiceschanged = speakNow;
//     } else {
//       speakNow();
//     }
//   };

//   const promptLanguage = () => {
//     const prompt =
//       language === 'en-US'
//         ? 'Press Left Alt + T to switch to Telugu. English is the default.'
//         : 'స్వాగతం. తెలుగుకు మార్చాలంటే ఎడమ ఆల్ట్ + T నొక్కండి. డిఫాల్ట్ ఇంగ్లీష్.';
//     speak(prompt);
//   };

//   useEffect(() => {
//     const handler = (e) => {
//       if (!e.altKey) return;

//       switch (e.key.toLowerCase()) {
//         case 't':
//           setLanguage((prev) => {
//             const newLang = prev === 'en-US' ? 'te-IN' : 'en-US';
//             const message =
//               newLang === 'te-IN'
//                 ? 'తెలుగు ఎంచుకుంది'
//                 : 'English selected';
//             speak(message);
//             return newLang;
//           });
//           break;

//         case 'j':
//           promptLanguage();
//           break;

//         case 'h':
//           window.location.pathname = '/';
//           break;

//         case 'l':
//           window.location.pathname = '/login';
//           break;

//         case 'r':
//           window.location.pathname = '/register';
//           break;

//         default:
//           return;
//       }
//     };

//     window.addEventListener('keydown', handler);
//     return () => window.removeEventListener('keydown', handler);
//   }, [language]);

//   return (
//     <VoiceContext.Provider value={{ language, speak }}>
//       {children}
//     </VoiceContext.Provider>
//   );
// };
import React, { createContext, useState, useEffect } from 'react';

export const VoiceContext = createContext();

export const VoiceProvider = ({ children }) => {
  const [language, setLanguage] = useState('en-US'); // Default to English
  const [voices, setVoices] = useState([]);

  useEffect(() => {
    const loadVoices = () => {
      const allVoices = window.speechSynthesis.getVoices();
      setVoices(allVoices);
    };

    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    loadVoices();
  }, []);

  const speak = (text) => {
    if (!window.speechSynthesis) return;

    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = language;

    let selectedVoice = voices.find(
      v => v.lang === language && v.name.toLowerCase().includes('female')
    );

    // Fallback for Telugu
    if (!selectedVoice && language === 'te-IN') {
      selectedVoice = voices.find(v => v.lang === 'en-IN' && v.name.toLowerCase().includes('heera'));
    }

    // Final fallback
    utter.voice = selectedVoice || voices[0];

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  };

  const promptLanguage = () => {
    const prompt = language === 'en-US'
      ? 'Press Left Alt + T to switch to Telugu. English is the default.'
      : 'స్వాగతం. తెలుగుకు మార్చాలంటే ఎడమ ఆల్ట్ + T నొక్కండి. డిఫాల్ట్ ఇంగ్లీష్.';
    speak(prompt);
  };

  useEffect(() => {
    const handler = (e) => {
      if (!e.altKey) return;
      switch (e.key.toLowerCase()) {
        case 't':
          setLanguage(prev => (prev === 'en-US' ? 'te-IN' : 'en-US'));
          break;
        case 'j':
          promptLanguage();
          break;
        case 'h':
          window.location.pathname = '/';
          break;
        case 'l':
          window.location.pathname = '/login';
          break;
        case 'r':
          window.location.pathname = '/register';
          break;
        default:
          return;
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [language, voices]);

  return (
    <VoiceContext.Provider value={{ language, speak }}>
      {children}
    </VoiceContext.Provider>
  );
};
