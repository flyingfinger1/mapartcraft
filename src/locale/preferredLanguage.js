import CookieManager from "../cookieManager";
import Locale from "./locale";

// remembers a language picked from the flags, so that it wins over the browser language (also when it is English)
const COOKIE_NAME = "mapartcraft_language";

export function rememberLanguage(language) {
  CookieManager.setCookie(COOKIE_NAME, language);
}

// maps a browser language tag (eg "de-AT", "pt-BR", "zh-TW") to one of our locale codes, or null
function localeForLanguageTag(languageTag) {
  const [language, ...subtags] = languageTag.toLowerCase().split("-");
  switch (language) {
    case "zh":
      // Traditional Chinese is written in Taiwan, Hong Kong and Macao unless a script says otherwise
      if (subtags.includes("hant") || (!subtags.includes("hans") && ["tw", "hk", "mo"].some((region) => subtags.includes(region)))) {
        return "zh-Hant";
      }
      return "zh-Hans";
    case "pt":
      return subtags.includes("br") ? "pt-Br" : "pt";
    case "uk":
      return "ua";
    default:
      return Object.keys(Locale).find((localeCode) => localeCode.toLowerCase() === language) || null;
  }
}

export function getPreferredLanguage() {
  const rememberedLanguage = CookieManager.getCookie(COOKIE_NAME);
  if (rememberedLanguage !== null && rememberedLanguage in Locale) {
    return rememberedLanguage;
  }
  const browserLanguages = navigator.languages && navigator.languages.length !== 0 ? navigator.languages : [navigator.language];
  for (const browserLanguage of browserLanguages) {
    const localeCode = browserLanguage && localeForLanguageTag(browserLanguage);
    if (localeCode !== null && localeCode !== undefined) {
      return localeCode;
    }
  }
  return "en";
}

// on pages without a language in the URL (the English default), switch to the preferred language before the app renders
export function redirectToPreferredLanguage(basename) {
  const { pathname, search, hash } = window.location;
  if (!pathname.startsWith(basename)) {
    return;
  }
  const path = pathname.slice(basename.length).replace(/^\/+/, "");
  if (!(path === "" || path === "faq" || path === "faq/")) {
    // the URL names a language (or something else); leave it alone
    return;
  }
  const preferredLanguage = getPreferredLanguage();
  if (preferredLanguage === "en") {
    return;
  }
  window.history.replaceState(null, "", `${basename}/${preferredLanguage}${path === "" ? "" : "/faq"}${search}${hash}`);
}
