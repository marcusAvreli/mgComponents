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
	    <div class="wrapper">
  <div class="item1"><slot name="rightUp"></slot></div>
  <div class="item2">
  <slot name="left" style="display:flex;flex:auto;"></slot>
  </div>
  <div class="item3">
  <slot name="rightDown"></slot>
  </div>
  <div class="item4">
  <slot name="rightButtons"></slot>
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