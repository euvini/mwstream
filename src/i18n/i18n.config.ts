import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { en } from "./translations";

const resources = {
    en: {
        translation: en
    }
}

i18next.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    lng: 'en',
    debug: true,
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false,
    },
    resources,
})

export default i18next;