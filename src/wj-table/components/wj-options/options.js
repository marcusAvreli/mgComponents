import { default as WJElement } from "../../../wj-element/wj-element.js";
import { Service } from '../../service/service.js';
import "../wj-filter-save/filter-save.js";

const template = document.createElement("template");
template.innerHTML = `<style>
     @import "assets/css/pages.css";
   // @import "/templates/net/pages/css/themes/net-basic/form_elements.css";
    //@import "/templates/net/pages/css/themes/net-basic/checkbox.css";
    @import "assets/css/font-awesome.css";
    @import "assets/css/font-awesome.min.css";
    
    :host {
        margin: 1rem 0 1rem auto;
        min-height: 28px;
        display: flex;
        align-items: center;
    }
    
    :host wj-dropdown {
        margin-left: 1rem;
    }

  
}
</style>`;


export default class Options extends WJElement {
    constructor() {
        super(template);

        this.store.subscribe("nav", (key, state, oldState) => {
            this.refresh();
        });
    }
 static get className() {
        return "Options";
    }
   	static set cssStyleSheet(inStyle) {		
		this.styles = inStyle;
	}

    static get cssStyleSheet() {
        return this.styles;
    }
    beforeDraw() {
        this.tableId = this.table.element.id;
    }

    draw(context, store, params) {
		console.log("wj_table_options","draw","start");
        let fragment = new DocumentFragment();

        let slot = document.createElement("slot");
        fragment.appendChild(slot)
        fragment.appendChild(this.btnVisibility());
		  
        if(this.data.length){
			
            fragment.appendChild(this.btnExport());
        }else{
			console.log("wj_table_options","draw","data_empty");
		}
		console.log("wj_table_options","draw","finish");
        return fragment;
    }

    afterDraw() {
        this.innerHTML = "";
        if (this.table.filterable == "ADVANCED") {
            let navActive = this.store.getState().nav?.find(i => i.active);
            if (navActive?.id == 0 || !navActive) {
                this.appendChild(this.filterNew());
            } else {
                this.appendChild(this.filterEdit(navActive));
            }
        }

        document.addEventListener('wj-nav-change', (e) => {
            this.innerHTML = "";
            if(e.detail.data.id == 0) {
                this.appendChild(this.filterNew());
            } else {
                this.appendChild(this.filterEdit(e.detail.data));
            }
        });
    }

    filterNew() {
        let element = document.createElement("wj-filter-save");
        element.setAttribute("shadow", "open");
        element.setAttribute("endpoint", "/private/rest/hub/tabulator/filter");
        element.setAttribute("title", "Uložiť filter");
        element.table = this.table;

        return element;
    }

    filterEdit(item) {
        let fragment = new DocumentFragment();

        // Ulozennie filtra do existujucej navigacie
        let saveBtn = document.createElement("wj-button");
        saveBtn.classList.add("btn", "btn-success", "btn-sm", "mr-2");
        saveBtn.innerHTML = "Uložiť";
        saveBtn.addEventListener("click", () => {
            let newData = item;
            newData.filter = Service.btoa_utf8(JSON.stringify(this.store.getState()["filterObj-" + this.tableId].filter));

            Service.saveTab("PUT", "/private/rest/hub/tabulator/filter/" + newData.id, newData).then((res) => {
                let nav = Service.setNavActive(item.id, res.data);

                this.store.dispatch(this.defaultStoreActions.loadAction("nav")(nav));

                intranet.notification(res);
            });
        });

        // Zmazanie existujuceho filtra
        let deleteBtn = document.createElement("button");
        deleteBtn.classList.add("btn", "btn-default", "btn-sm");
        deleteBtn.innerHTML = "Zmazať";
        deleteBtn.addEventListener("click", () => {
            Service.deleteTab("/private/rest/hub/tabulator/filter/" + item.id).then((res) => {
                this.store.dispatch(this.defaultStoreActions.deleteAction("nav")(item));
                let nav = Service.setNavActive(0, res.data);
                this.store.dispatch(this.defaultStoreActions.loadAction("nav")(nav));

                let filterArray = JSON.parse(Service.atob_utf8(this.store.getState().nav[0].filter));
                this.store.dispatch(this.defaultStoreActions.addAction("filterObj-" + this.tableId)({
                    "filter": filterArray,
                    "table": this.tableId
                }));

                intranet.notification(res);
            });
        });

        fragment.appendChild(saveBtn);
        fragment.appendChild(deleteBtn);

        return fragment;
    }
stringToFragment(string) {
	  const temp = document.createElement('template');
	  temp.innerHTML = string;
	  return temp.content;
	}
    btnVisibility() {
			console.log("wj_table_options","btnVisibility","start");
        /*
		let slot = document.createElement("span");
        slot.setAttribute("slot", "button");
        slot.innerHTML = '<i class="fa-light fa-gear"></i>';

        let visibility = document.createElement("wj-dropdown");
        visibility.setAttribute("slot-button", "true");
        visibility.setAttribute("position", "bottom-left");
        visibility.appendChild(slot);
        visibility.classList.add("mr-3", 'd-inline-block');
		*/
        // visibility.style.display = 'inline-block';
        //visibility.appendChild(this.visibility(this.table.getColumns()));
		const frag = this.stringToFragment('<div>Visibility</div>');
console.log("wj_table_options","btnVisibility","finish");
        return frag;
    }

    visibility(columns) {
		console.log("wj_table_options","visibility","start");
        let visibility = document.createElement('div');
        visibility.classList.add('wrapper-visibility');
/*
        for (let column of columns) {
			console.log("wj_table_options","visibility","1");
            if (column.getDefinition().title != undefined) {
				console.log("wj_table_options","visibility","2");
                let input = document.createElement('input');
                input.setAttribute('type', 'checkbox');
                input.id = 'checkbox-' + column.getDefinition().field;
					
                input.checked = column.isVisible();
				console.log("wj_table_options","input checked after", input.checked);
                input.addEventListener('click', (e) => {
                    column.toggle();
                    if (column.isVisible()) {
                        this.checked = true;
                    } else {
                        this.checked = false;
                    }
                });
                let wrapper = document.createElement("div");
                wrapper.classList.add("form-check");

                let label = document.createElement('label');
                label.classList.add('m-0');
                label.textContent = column.getDefinition().title;
                label.setAttribute('for', 'checkbox-' + column.getDefinition().field);

                wrapper.appendChild(input);
                wrapper.appendChild(label);

                visibility.appendChild(wrapper);
            }
        }
		*/
		const frag = this.stringToFragment('<div><h1>VISIBILITY</h1></div>');
console.log("wj_table_options","visibility","finish");
        return frag;
    }
	
	

    btnExport() {
		console.log("wj_table_options","btn_export","start");
		/*
        let slot = document.createElement("span");
        slot.setAttribute("slot", "button");
        slot.innerHTML = '<i class="fa-light fa-arrow-down-to-line"></i>';
		let button = document.createElement("wj-button");
		button.setAttribute("slot","trigger");
		button.id = "test_button";
		button.setDisplayLabel("Test");
        let visibility = document.createElement("wj-dropdown");
        visibility.setAttribute("slot-button", "true");
        visibility.setAttribute("position", "bottom-left");
        visibility.classList.add('d-inline-block');
		visibility.appendChild(button);
       // visibility.appendChild(slot);

        this.data.forEach(button => {
			
            visibility.appendChild(this.export(button));
        });
		*/
		const frag = this.stringToFragment(` <wj-dropdown label="Start" slot-button= "true" placement="bottom-left" offset="5">
    <wj-button size="large" slot="trigger" stop-propagation="true" caret>Large</wj-button>
    <wj-menu variant="context">
    
    
    </wj-menu>

  </wj-dropdown>
`);

 this.data.forEach(button => {
			
            frag.appendChild(this.export(button));
        });

		console.log("wj_table_options","btn_export","finish");
        return frag;
    }

    export(button) {
		console.log("wj_table_options","export","start");
        let item = document.createElement("wj-menu-item");
        //item.classList.add("wj-menu-item");
        item.innerHTML = button.icon + button.title;
		//item.innerHTML = "TEST";
        item.addEventListener("click", (e) => {
           // this.table.download("xlsx", "data.xlsx", {sheetName:"MyData"});
		     this.table.download(button.type, button.filename,{sheetName:"MyData"})
        });
		console.log("wj_table_options","export","finish");
        return item;
    }
	unregister(){}
	afterDisconnect(){}
}

let __esModule = "true";
export {__esModule};

customElements.get("wj-table-options") || customElements.define("wj-table-options", Options);
