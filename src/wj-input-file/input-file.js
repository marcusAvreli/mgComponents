import { default as WJElement, event } from "../wj-element/wj-element.js";
import { elementPrefix } from '../shared/index.js';
/**
 * @injectHTML
 */
export class InputFile extends WJElement {
    constructor(options = {}) {
        super();
    }

    static get is() {
		return `${elementPrefix}-input-file`;
	}
	static get className(){
		return "InputFile";
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

    draw(context, store, params) {
        let fragment = document.createDocumentFragment();

        // Wrapper
        let native = document.createElement("div");
        native.setAttribute("part", "native");
        native.classList.add("native-input-file", this.variant || "default");

        // File Input
        let fileInput = document.createElement("input");
        fileInput.setAttribute("type", "file");
        fileInput.setAttribute("multiple", "");
        fileInput.setAttribute("hidden", "");

        // Input
        let input = document.createElement("wj-input");
        input.setAttribute("variant", "standard");
        input.setAttribute("type", "text");
        input.setAttribute("placeholder", "Click to upload");
        input.setAttribute("readonly", "");

        let span = document.createElement("span");
        span.setAttribute("slot", "start");

        let icon = document.createElement("wj-icon");
        icon.setAttribute("slot", "icon-only");
        icon.setAttribute("name", "cloud-upload");

        span.appendChild(icon);
        input.appendChild(span);

        native.appendChild(input);
        native.appendChild(fileInput);
        fragment.appendChild(native);

        this.native = native;
        this.input = input;
        this.fileInput = fileInput;

        return fragment;
    }

    afterDraw() {
        this.input.addEventListener('click', () => {
            this.fileInput.click();
        });

        this.fileInput.addEventListener('change', (e) => {
            var files = e.target.files;
            var fileNames = [];

            for (var i = 0; i < files.length; i++) {
                fileNames.push(files[i].name);
            }

            this.input.value = fileNames.join(', ');
        });
    }
	unregister(){}
}

customElements.get(InputFile.is) || window.customElements.define(InputFile.is, InputFile);