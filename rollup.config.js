//TypeError: Cannot read properties of undefined (reading 'include')
//if removed following import
import resolve from '@rollup/plugin-node-resolve';
import packageJson from './package.json' assert { type: "json" };
import { plugins } from './rollup-config/plugins.js';


const config = [
	{		 
		input: 'src/scss/pages.scss'
		,output: [{
			file:'dist/css/pages.css',
			name:'mgComponents',
			format: 'es',
			//exports: 'named',
			//sourcemap: true,
			//inlineDynamicImports: true,
		}]
		,plugins 
	}
	,{
		input: './src/index.js'
		,output: {
			format: 'umd',
			file: packageJson.main,
			name : 'mgComponents'
		}
		,plugins
	}
]
 
export default config



//async function sassToCss(sassFile) {
//https://github.com/Finastra/finastra-design-system/tree/main
//https://github.com/zambezi/ez-build/blob/d7f110b3cf136a3a6905d1c3723104a74ca1e5b8/src/builder/css.js#L17
//https://github.com/niksy/css-loader/blob/0c8a23b48521656d8f2ea4c14108b44882ecb0f2/src/plugins/postcss-url-parser.js#L107
//https://github.com/shipshapecode/tether/blob/7d1037fe100b661f4a1767e2981e5fc2305b7b51/rollup.config.js#L43
//explanations
//https://github.com/starzje/rollup_example/blob/62d146e10c941cbfeaec558f2f18efbd7ce958d5/rollup.config.mjs#L24
//https://github.com/niklasgrewe/apple-svelte-demo/blob/9513ccda19e881010cbde46c6877445f387fdb48/rollup.config.js#L23
