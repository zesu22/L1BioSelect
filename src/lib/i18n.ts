import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./assets/locales/en/en.json";
import ar from "./assets/locales/ar/ar.json";

const resources = {
  en: { translation: en },
  ar: { translation: ar },
};

i18n.use(initReactI18next).init({
  debug: true,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
  // language resources
  resources: resources,
});

export default i18n;
