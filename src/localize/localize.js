export const translations = new Map();

export class LocalizerDefault {
  constructor(element) {
    this.element = element;
	//console.log("localizer default");
    this.languages = translations;
/*
	if(this.element.lang){
		this.lang = this.element.lang;
	}else{
		if(document.documentElement.lang){
			this.lang = document.documentElement.lang;
		}else{
			this.lang="en";
		}
	}
	*/
    this.lang = this.element.lang || document.documentElement.lang || 'en';
    this.dir = this.element.dir || document.documentElement.dir || 'ltr';
	console.log("LocalizerDefault language:"+this.lang);
	console.log("LocalizerDefault element:"+this.element.lang);
	console.log("LocalizerDefault element2:"+document.documentElement.lang);
    this.setLanguage();
  }

  // Nastavenie aktuálneho jazyka
  setLanguage() {
	  if(this.element.lang){
		  this.lang = this.element.lang;
	  }
	  	console.log("LocalizerDefault element3:"+this.element.lang);
	console.log("LocalizerDefault element4:"+document.documentElement.lang);
    if (this.languages.has(this.lang)) {
      this.currentLang = this.lang;
    } else {
      console.error(`Language "${this.lang}" not loaded.`);
    }
	
  }

  // Vyhľadávanie prekladu podľa kľúča
  translate(key) {
	  	console.log("LocalizerDefault elemen5:"+this.element.lang);
	console.log("LocalizerDefault element6:"+document.documentElement.lang);
    const langMap = this.languages.get(this.currentLang);
    return langMap ? langMap[key] || key : key;
	
  }
	getDir(){
		console.log("get_dir_called");
		//element lang
		console.log("LocalizerDefault element7:"+this.element.lang);
		if(this.element.lang){
			const langMap = this.languages.get(this.element.lang);
			return langMap["dir"];
		}
		//default lang		
		const langMap = this.languages.get(this.currentLang);
		return langMap["dir"];
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
  console.log("registerTranslation from localize:"+translation);
  translation.map(t => {
    const code = t.code.toLowerCase();
	console.log("translation:"+code+"  " +JSON.stringify(translations));
	console.log("translation:"+code+ JSON.stringify("from t tr:"+JSON.stringify(t)));
   if (translations.has(code)) {
	   console.log("translation has code");
		translations.set(code, { ...translations.get(code), ...t });
   } else {
     translations.set(code, t);
    }
  });
  
}