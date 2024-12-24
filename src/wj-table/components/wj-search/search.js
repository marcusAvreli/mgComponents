import { UniversalService } from "../../../wj-element/service/universal-service.js";
import { defaultStoreActions, store } from "../../../wj-store/store.js";
import { default as WJElement } from "../../../wj-element/wj-element.js";
import flatpickr from "flatpickr";
//import * as _flatpickr from 'flatpickr';
//import * as _monthSelectPlugin from 'flatpickr/dist/plugins/monthSelect';
//import * as Slovak   from 'flatpickr/dist/l10n/sk.js'
//import {monthSelectPlugin} from "flatpickr/dist/plugins/monthSelect/index";
//https://github.com/flatpickr/flatpickr/issues/1848
const template = document.createElement("template");
template.innerHTML = `<style>
    @import "assets/css/pages.css";
   
    @import "assets/css/font-awesome.css";
    @import "assets/css/font-awesome.min.css";
  
   

    :host {
        border-bottom: 1px solid var(--color-border-a);
        border-radius: 5px 5px 0 0;
        /*width: 240px;*/
        /*display: block;*/
    }
        
    .form-range {
        display: flex;
    }
    
    .form-range input {
        flex: 0 0 50%;
        max-width: 50%;
        border-radius: 2px;
    }
    .form-range input:not(:only-child):not(:last-child) {
        border-right-color: transparent;
        border-top-right-radius: 0px;
        border-bottom-right-radius: 0px;
    }
    
    .form-range input:last-child {
        border-top-left-radius: 0px;
        border-bottom-left-radius: 0px;
    }
    
    .form-range input:not(:only-child):not(:last-child):focus {
        border-right-color: var(--color-primary);
        border-top-right-radius: 0px;
        border-bottom-right-radius: 0px;
    }
    
    .form-range input:last-child:focus {
        border-right-color: var(--color-primary);
        border-top-left-radius: 0px;
        border-bottom-left-radius: 0px;
    }
</style>`;

export default class TableSearchElement extends WJElement {
    constructor() {
        //super();
 super(template);
/*
        this.service = new UniversalService({
            store: store,
        });

        this.attachShadow({mode:'open'});
		*/
    }
 static get className() {
        return "TableSearchElement";
    }
   	static set cssStyleSheet(inStyle) {		
		this.styles = inStyle;
	}

    static get cssStyleSheet() {
        return this.styles;
    }
    set type(value) {
        return this.setAttribute("type", value.toUpperCase());
    }

    get type() {
        return this.getAttribute("type").toUpperCase();
    }

    set field(value) {
        return this.setAttribute("field", value);
    }

    get field() {
        return this.getAttribute("field");
    }

    connectedCallback() {
		console.log("search","table","connectedCallback","start");
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.tableId = this.column.getTable().element.id;
        this.columnOptions = store.getState()["columnOptions-" + this.tableId][this.field.split(".")[0]];
        this.filter = [];

        if(store.getState()["filterObj-" + this.tableId].hasOwnProperty("filter")) {
            this.filter = store.getState()["filterObj-" + this.tableId]?.filter;
        }

        this.draw();
		console.log("search","table","connectedCallback","finish");
    }

    draw() {
        let tablePopup;
		console.log("search","draw","start11111111111");
        this.column.getTable().on("popupOpened", function([component, popup]){
            tablePopup = popup;
        });
		console.log("search","start");
        this.divToggle = document.createElement("div");
		console.log("search","draw","1");
        if(this.filter.length > 0) {
			console.log("search","draw","2");
            this.divToggle.classList.add("btn-group", "btn-group-toggle");
            this.divToggle.setAttribute("data-toggle", "buttons");
console.log("search","draw","2");
            this.labelAnd = document.createElement("label");
            this.labelAnd.classList.add("btn", "btn-default", "btn-xs", "active");
            this.labelAnd.innerText = "AND";

            this.inputAnd = document.createElement("input");
            this.inputAnd.value = "AND";
            this.inputAnd.setAttribute("name", "options");
            this.inputAnd.setAttribute("type", "radio");
            this.inputAnd.setAttribute("checked", "");

            this.labelAnd.append(this.inputAnd);
            this.divToggle.appendChild(this.labelAnd);

            this.labelOr = document.createElement("label");
            this.labelOr.classList.add("btn", "btn-default", "btn-xs");
            this.labelOr.innerText = "OR";

            this.inputOr = document.createElement("input");
            this.inputOr.value = "OR";
            this.inputOr.setAttribute("name", "options");
            this.inputOr.setAttribute("type", "radio");

            this.labelOr.append(this.inputOr);
            this.divToggle.appendChild(this.labelOr);

            let myFce = (e) => {
                this.divToggle.querySelectorAll("label").forEach(el => {
                   el.classList.remove("active");
                });
                e.target.closest("label").classList.add("active");
            }

            this.inputAnd.addEventListener('change', myFce)
            this.inputOr.addEventListener('change', myFce)
        } else {
            this.divToggle.innerHTML = "Pridať podmienku";
        }

        this.whereAndOr = document.createElement("div");
        this.whereAndOr.classList.add("mb-2");
        this.whereAndOr.append(this.divToggle);

        this.elTitle = document.createElement("div");
        this.elTitle.classList.add("mb-2", "font-weight-bold");
        this.elTitle.innerText = this.title;

        this.search = document.createElement("button");
        this.search.classList.add("btn", "btn-primary", "btn-xs");
        this.search.setAttribute("id", "search");
        this.search.innerText = "Použiť filter";
console.log("search","draw","3");
        // OPERATOR - select nebude zobrazeny len pri tychto typoch
        if (this.type != "DATE-RANGE" && this.type != "NUMBER-RANGE") {
            this.operator = document.createElement("select");
            this.operator.innerHTML = this.getFilterByType(this.type).map((i) => `<option value="${i.operator}" ${i.default ? "selected" : ""}>${i.text}</option>`).join(" ");
            this.operator.classList.add("form-control", "input-sm");

            this.divOperator = document.createElement("div");
            this.divOperator.classList.add("form-group");
            this.divOperator.appendChild(this.operator);
        }

        if (this.type == "DATE" || this.type == "DATETIME" || this.type == "TIME" || this.type == "DATE-RANGE" || this.type == "NUMBER" || this.type == "STRING" || this.type == "NUMBER-RANGE") {
            this.input = document.createElement("input");
            this.input.setAttribute("type", (this.type == "NUMBER" || this.type == "NUMBER-RANGE") ? "number" : "text");
            this.input.setAttribute("placeholder", "Filtrovať podľa " + this.title);
            this.input.classList.add("form-control", "input-sm");

            this.divInput = document.createElement("div");
            this.divInput.classList.add("form-group");
            this.divInput.appendChild(this.input);

            if (this.type == "NUMBER-RANGE") {
                this.input.setAttribute("placeholder", "Od");
                this.divInput.classList.add("form-range");
            }
        }

        if (this.type == "DATE-RANGE" || this.type == "NUMBER-RANGE") {
            this.range = document.createElement("input");
            this.range.classList.add("form-control", "input-sm");
            this.range.setAttribute("type", "number");
            this.range.setAttribute("placeholder", "Do");
            if (this.type == "DATE-RANGE")
                this.range.setAttribute("type", "hidden");

            this.divInput.appendChild(this.range);
        }

        if (this.type == "BOOLEAN" || this.type == "OPTION" || this.type == "MULTISELECT") {
            this.input = document.createElement("select");
            this.input.innerHTML = this.columnOptions.map((i) => `<option value="${i.id}">${i.name}</option>`).join(" ");
            this.input.classList.add("form-control", "input-sm");

            this.divInput = document.createElement("div");
            this.divInput.classList.add("form-group");
            this.divInput.appendChild(this.input);
        }

        if(!!this.whereAndOr)
            this.shadowRoot.append(this.whereAndOr);

        if(!!this.elTitle)
            this.shadowRoot.append(this.elTitle);

        if(!!this.divOperator)
            this.shadowRoot.append(this.divOperator);

        if(!!this.divInput)
            this.shadowRoot.append(this.divInput);

        // if(!!this.divRange)
        //     this.shadowRoot.append(this.divRange);

        if(!!this.search)
            this.shadowRoot.append(this.search);

        if (this.type == "DATE" || this.type == "DATETIME" || this.type == "DATE-RANGE") {
            flatpickr(this.input, {
                "mode": (this.type == "DATE-RANGE") ? "range" : "single",
                "dateFormat": "d.m.Y",
                "positionElement": document.querySelector("wj-table-search-element"),
                "onChange": (selectedDate) => {
                    if(this.type == "DATE-RANGE" && selectedDate.length == 2) {
                        let date = selectedDate.map(d => moment(d).format("x"))
                        this.input.value = date[0];
                        this.range.value = date[1];
                        this.executionFilter();
                        tablePopup.hideable = true;
                    }

                    if (this.type == "DATE") {
                        let date = selectedDate.map(d => moment(d).format("x"))
                        this.input.value = date[0];
                        this.executionFilter();
                        tablePopup.hideable = true;
                    }
                },

                "onOpen": (selectedDates, dateStr, instance) => {
                    tablePopup.hideable = false;
                },
                "onClose": (selectedDates, dateStr, instance) => {
                    tablePopup.hideable = true;
                }
            });
        }

        if(!!this.search) {
            this.search.addEventListener("click", this.executionFilter);
        }
		console.log("search","draw","4");
		this.addEventListener("keyup", (e) => {
			if(e.key.toUpperCase() == "ENTER"){
				tablePopup.hideable = true;
				this.executionFilter();
			}
		});
		console.log("search","draw","finish");
    }

    executionFilter = () => {
        // nastavime this.filter
        this.addFilter();
		console.log("i_here_22222222222222");
        store.dispatch(defaultStoreActions.addAction("filterObj-" + this.tableId)({
            "filter": this.filter,
            "table": this.column.getTable().element.id
        }));

        this.column.getTable().setFilter(this.filter.map(a => {
            if(Array.isArray(a))
                return a;
            return [a];
        }));

        this.column.getElement().classList.add("filtered");
    }

    addFilter() {
        let option = (this.filter.length > 0) ? this.shadowRoot.querySelector('[name="options"]:checked')?.value : "WHERE";

        let title = this.title;
        let field = this.field;
        let type = (this.type != "DATE-RANGE" && this.type != "NUMBER-RANGE") ? this.operator.selectedOptions[0].value : "btwn";
        let inputType = this.type;
        let value = (this.type != "DATE-RANGE" && this.type != "NUMBER-RANGE") ? [this.input.value] : [this.input.value, this.range.value];
        let text = (this.type != "DATE-RANGE" && this.type != "NUMBER-RANGE") ? this.input.value : moment(+this.input.value).format("L") + " - " + moment(+this.input.value).format("L");

        if (this.input.tagName == "SELECT") {
            text = this.input.selectedOptions[0].text;
        }

        let result = {
            "title": title,
            "field": field,
            "type": type,
            "value": value,
            "inputType": inputType,
            "option": option,
            "text": text
        };

        if(option == "OR") {
            if(Array.isArray(this.filter[this.filter.length - 1])) {
                this.filter[this.filter.length - 1].push(result);
            } else {
                this.filter = Array.from(this.filter, (x, i) => {
                    if(i == this.filter.length - 1)
                        return [x, result];

                    return x;
                });
            }
            return;
        }

        this.filter?.push(result);
    }

    getFilterByType(type = "STRING") {
        return this.filterType().reduce((acc, next) => {
            if(next.type.includes(type)) {
                if(next.default?.includes(type))
                    next.default = true

                acc.push(next);
            }
            return acc;
        }, []);
    }

    filterType() {
        return [{
            text: "Je",
            operator: "eq",
            type: ["DATE", "STRING", "NUMBER", "BOOLEAN", "OPTION"],
            default: ["NUMBER", "BOOLEAN", "OPTION"]
        },{
            text: "Nie je",
            operator: "neq",
            type: ["DATE", "STRING", "NUMBER", "BOOLEAN", "OPTION"]
        },{
            text: "Menší",
            operator: "lt",
            type: ["DATE", "NUMBER"],
        },{
            text: "Väčší",
            operator: "gt",
            type: ["DATE", "NUMBER"]
        },{
            text: "Menší alebo sa rovná",
            operator: "lte",
            type: ["DATE", "NUMBER"]
        },{
            text: "Väčší alebo sa rovná",
            operator: "gte",
            type: ["DATE", "NUMBER"],
        },{
            text: "Obsahuje",
            operator: "like",
            type: ["STRING"],
            default: ["STRING"]
        },{
            text: "Neobsahuje",
            operator: "nlike",
            type: ["STRING"],
        },{
            text: "Začína",
            operator: "swith",
            type: ["STRING"],
        },{
            text: "Končí",
            operator: "ewith",
            type: ["STRING"]
        },{
            text: "Nachádza sa",
            operator: "in",
            type: ["MULTISELECT"]
        },{
            text: "Nenachádza sa",
            operator: "nin",
            type: ["MULTISELECT"]
        }];
    }
}

let __esModule = "true";
export {__esModule};

//customElements.get("wj-table-search-element") || customElements.define("wj-table-search-element", TableSearchElement);
customElements.get("wj-table-search-element") || customElements.define("wj-table-search-element", TableSearchElement);
