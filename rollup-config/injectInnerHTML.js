
var path = require('path');
import sass from 'sass';
import CleanCSS from 'clean-css';
import { run_postcss,buildFileExtension} from './fileUtils';
export default function injectInnerHTML() {
	return {
		name: 'injectInnerHTML',

		async transform(code, id) {		
			const fileName = path.parse(id).base;

			const fileExtension = buildFileExtension(id);			
			if(fileName === 'pages.scss'){
				//required part, even though returns empty string			
				
				const result =  await run_postcss(id)    
				const cssText = result.css.toString().trim();			
				const minifiedCss = new CleanCSS({ level: { 2: { all: true } } }).minify(cssText);
				code = minifiedCss.styles;		
				

				return {
					code: '',
					map: null
				}
				
			}
			
			if (code.indexOf('@injectHTML') > -1) {				
				const htmlFile = id.replace('.js', '.html');				
				const scssFile = id.replace('.js', '.scss');	
				const result =  await run_postcss(scssFile)    				
				
		
				const cssText = result.css.toString().trim();
				const minifiedCss = new CleanCSS({ level: { 2: { all: true } } }).minify(cssText);
				code = code.replace('super();', `super();this.constructor.cssStyleSheet=\`${minifiedCss.styles}\`;`);
				
			}
			
			if(fileExtension ==="scss"){
				return {
					code: null,
					map: null
				}
			}
			return {
				code: code,
				map: null
			};
		}
	};
}