export const translations = new Map();

export class LocalizerDefault {
  constructor(element) {
    this.element = element;
	//console.log("localizer default");
    this.languages = translations;

    this.lang = this.element.lang || document.documentElement.lang || 'en';
    this.dir = this.element.dir || document.documentElement.dir || 'ltr';
	//console.log("language:"+this.lang);
    this.setLanguage();
  }

  // Nastavenie aktuálneho jazyka
  setLanguage() {
    if (this.languages.has(this.lang)) {
      this.currentLang = this.lang;
    } else {
      console.error(`Language "${this.lang}" not loaded.`);
    }
	
  }

  // Vyhľadávanie prekladu podľa kľúča
  translate(key) {
    const langMap = this.languages.get(this.currentLang);
    return langMap ? langMap[key] || key : key;
	
  }

  // Formátovanie čísla podľa aktuálneho jazyka
  formatNumber(number, options) {
    //return new Intl.NumberFormat(this.currentLang, options).format(number);
  }

  // Formátovanie dátumu podľa aktuálneho jazyka
  formatDate(date) {
   // return new Intl.DateTimeFormat(this.currentLang).format(new Date(date));
  }

  relativeTime(value = 0, unit, options = { numeric: "auto" }) {
    //return new Intl.RelativeTimeFormat(this.currentLang, options).format(value, unit);
  }
}

export function registerTranslation(...translation) {
  //console.log("registerTranslation from localize");
  translation.map(t => {
    const code = t.code.toLowerCase();
	//console.log("translation:"+code+ JSON.stringify(translations));
	//console.log("translation:"+code+ JSON.stringify("t:"+JSON.stringify(t)));
   //if (translations.has(code)) {
	//   console.log("translation has code");
   // translations.set(code, { ...translations.get(code), ...t });
    //} else {
     translations.set(code, t);
    //}
  });
  
}