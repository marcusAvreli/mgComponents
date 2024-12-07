import { default as WJElement, WjElementUtils,event } from "../wj-element/wj-element.js";

import { elementPrefix } from '../shared/index.js';

/**
 * @injectHTML
 */
export class LayoutTwoColumns  extends WJElement {
    constructor() {
        super();
    }
	static get className(){
		return "LayoutTwoColumns";
	}

	static get is() {
		return `${elementPrefix}-layout-two-columns`;
	}
	static set cssStyleSheet(inStyle) {		
		this.styles = inStyle;
	}
    static get cssStyleSheet() {		
        return this.styles;
    }
    

    

    static get observedAttributes() {
        return [];
    }

    setupAttributes() {
        this.isShadowRoot = "open";
    }
	beforeDraw( context, store, params ) {}
    draw(context, store, params) {
	
       return `
	    <div class="two-column-main">
	  <div class="two-column-main-wrapper" part="native">
			<div class="transfer-wrapper">
			<div class="container1">
			<div class="transfer-grid">
			<div class="transfer-grid-left">
		<slot name="left" style="display:flex;flex:auto;"></slot>
			</div>
			<div class="transfer-grid-right">
			
			<div class="horizontal-wrapper">
			<div class="grid-horizontal">
				<div class="grid-horizontal-upper">
					<slot name="rightUp"></slot>
				</div>
				<div class="grid-horizontal-down">
					<slot name="rightDown"></slot>
				</div>
				<div class="grid-horizontal-buttons">
					<slot name="rightButtons"></slot>
				</div>
			</div>
			</div>
			
			</div>
		
		</div>
		</div>
		</div>
		</div>
		</div>
		`;

       
    }
	
	
	
	
	afterDraw(){
		
	}
	
	
	unregister(){
		console.log(LayoutTwoColumns.is,"unregister");		
	}
	
	afterDisconnect(){
		console.log(LayoutTwoColumns.is,"afterDisconnect");		
	}
	
}

customElements.get(LayoutTwoColumns.is) || window.customElements.define(LayoutTwoColumns.is, LayoutTwoColumns);