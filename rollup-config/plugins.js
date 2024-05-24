import injectInnerHTML from './injectInnerHTML.js';
import fs from 'fs'
import path from 'path'
import autoprefixer from 'autoprefixer';
//import { terser } from 'rollup-plugin-terser';
import  terser from '@rollup/plugin-terser';
import packageJson from '../package.json' assert { type: "json" };
let dev = process.env.NODE_ENV == 'local';

import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve';
import license  from 'rollup-plugin-license';

import postcssPlugin from "rollup-plugin-postcss";
const banner = ['/*!', packageJson.name, packageJson.version, '*/\n'].join(' ');
//https://stackoverflow.com/questions/67057675/changing-rollup-plugin-postcss-generated-css-class-names-for-only-certain-files
export const plugins = [
	resolve({
		jsnext: true,
		browser: true
	})
	,commonjs()
	,license({
		banner
	})
	,postcssPlugin({
		modules: false,
		extract: true,
		plugins: [autoprefixer()],
		autoModules: true,
	})
	,injectInnerHTML()
	,terser({
		module: true,
		keep_classnames: true
	})	
];