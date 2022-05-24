import { useEffect } from 'react';
import { useLocation } from 'react-router';
import i18n from 'i18next';

function getForcedLanguage(pathname: string) {
  const langMatch = pathname.match(/\/(en|ko|jp)\/?/);

  return langMatch ? langMatch[1] : '';
}
function updateLanguage(lang: string) {
    console.log("Updating with " + lang);
    i18n.changeLanguage(lang);
  }

  
function useLanguage() {
  const location = useLocation();
  const forcedLang = getForcedLanguage(location.pathname);
  useEffect(() => {
    // debugger;
    let langBaseName = "";
    if (forcedLang) {
      langBaseName = `/${forcedLang}/`;
      if (i18n.language !== forcedLang) {
        updateLanguage(forcedLang);
      }
    } else {
      const navigatorLang = navigator.language.split("-")[0];
      if (i18n.languages.indexOf(navigatorLang) > -1) {
        if (i18n.language !== navigatorLang) {
          updateLanguage(navigatorLang);
        }
      }
    }
  }, [forcedLang]);
}

export default useLanguage;
