import { LocalizerDefault, registerTranslation } from "../localize/localize.js";

export class Localizer extends LocalizerDefault {
  constructor(element) {
    super(element);
	//console.log("localize from utils");
  }
  static registerTranslation(...translation) {
	  //console.log("localize from utils register trans");
    registerTranslation(...translation);
  }
}

