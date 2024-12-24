import { TabulatorFull } from 'tabulator-tables';
import { Service } from './service/service.js';
import { default as Popup} from "./components/wj-table-modules/wj-table-modules.js";
import { elementPrefix } from '../shared/index.js';
import {Checkbox}  from '../wj-checkbox/checkbox.js';
import {Input}  from '../wj-input/input.js';
//import { DateTime } from 'luxon';
import {myEditor,dateRangeFilter} from "../utils/wj-utils.js";
//import { luxon} from 'luxon';
//window.DateTime = DateTime;
//window.DateTime = DateTime;
//import * as luxon from 'https://moment.github.io/luxon/es6/luxon.min.js?v=@@version@@';
 //import './components/wj-options/options.js';
 //import './components/wj-search/search.js';
 //const { TableSearchElement } = require('./components/wj-search/search.js')
 //const TableSearchElement =  import('./components/wj-search/search.js');
 //import {TableSearchElement} from  './components/wj-search/search.js';
 //import * as TableSearchElement   from  './components/wj-search/search.js'
 //import './components/wj-filter-simple/filter-simple.js';
 //import './components/wj-filter-advanced/filter-advanced.js';
 //import * as luxon from 'luxon';
///window.luxon = require('luxon');
//
//import 'https://oss.sheetjs.com/sheetjs/xlsx.full.min.js?v=@@version@@';
//import 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.4.0/jspdf.umd.min.js?v=@@version@@';
//import 'https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.20/jspdf.plugin.autotable.min.js?v=@@version@@';
// import tabulatorFull from "tabulator-tables/src/js/core/TabulatorFull.js";
//
// import '/templates/net/assets/js/components/wj-nav/nav.js?v=@@version@@';
// import '/templates/net/assets/js/components/wj-dropdown/wj-dropdown.js?v=@@version@@';
/**
 * @injectHTML
 */

//import styles from "./scss/styles.scss?inline";
//https://github.com/David-Mawer/tabulator-angular-sample/blob/1217985717375e26511d5600afcfc214478a5e38/src/app/tabulator-grid/tabulator-grid.component.ts#L29
export class Table extends Service {
 static instances = new Map();

	constructor() {
		super();

       //window.luxon = luxon;

        this.addEventListener('wj-nav-change',this.eventClickTab)
		this.counter = 0;
        // RHR - zaregistrovanie nášho popup modulu
         TabulatorFull.registerModule(Popup);
		

		 
		//this.store.subscribe("deleteRow", this.testDelete.bind(this));
		//crud_actions
		this.store.subscribe("deleteRow", (key, state, oldState) => {		
            this.testDelete(key, state, oldState);
			//this.refresh();
        });
		
		//this.store.subscribe("dataContent-" + "testTable2/UPDATE", (key, state, oldState) => {	this.refresh(); this.edit(key, state, oldState);})
		console.log("tableId_constructor",this.tableId);
		
		
		
		
    }
	static get is() {
		
		return `${elementPrefix}-table`;
	}
	
	testDelete(key, state, oldState){
		
		console.log("test_delete","start");
		console.log("test_delete","key",JSON.stringify(key));
		console.log("test_delete","state",JSON.stringify(state));
		console.log("test_delete","oldState",JSON.stringify(oldState));
		
		var rowTobeDeleted = key.deleteRow;
		
		  this.dispatchEvent(
            new CustomEvent("wj:delete-row", {
                bubbles: true,
                detail: {
                    value: rowTobeDeleted,
                    
                },
            })
        );
		
		//console.log("test_delete","finish");
	}
 static get className() {
        return "Table";
    }
   	static set cssStyleSheet(inStyle) {		
		this.styles = inStyle;
	}

    static get cssStyleSheet() {
        return this.styles;
    }

    get infinity() {
        return this.hasAttribute("infinity");
    }

    set infinity(value) {
        return this.setAttribute("infinity", value);
    }

    get filterable() {
        return this.getAttribute("filterable").toUpperCase();
    }

    set filterable(value) {
        return this.setAttribute("filterable", value.toUpperCase());
    }

    get export() {
        if(this.hasAttribute("export"))
            return this.getAttribute("export").split(",");

        return [];
    }

    set export(value) {
        return this.setAttribute("filterable", value);
    }

    get pageSize() {
        return this.getAttribute("pagesize") || 10;
    }

    set pageSize(value) {
        return this.setAttribute("pagesize", value);
    }

    static getInstance(instanceId) {
        return Table.instances.get(instanceId)
    }

    static addInstance(instanceId, instance) {
        Table.instances.set(instanceId, instance);
    }

    static deleteInstance(instanceId) {
        Table.instances.delete(instanceId);
    }

    static get observedAttributes() {
        return ['refresh'];
    }

    get bulkCell() {
        return {
            field: "bulk",
            width: 30,
            formatter: "wj-row-selection",
            titleFormatter: "wj-row-selection",
            hozAlign: "center",
            headerSort: false,
            cellClick: this.cellClick,
            resizable: false,
            rowRange : "active"
        };
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.table.replaceData();
	
    }



    disconnectedCallback() {
        Table.deleteInstance(this.tableId);
    }

    beforeDraw() {
        // this.store.define('objTabs-' + this.tableId, [], null);
        Table.addInstance(this.tableId, this);
        
        

        // Vytvorime taby ak nejake su
        //  this.service.get(`/private/rest/hub/tabulator/filter/${btoa(this.getAttribute("dataurl"))}`, null, false)
        //     .then((res) => {
        //         if(res.length < 1)
        //             return;
        //
        //         let home = {
        //             "id": 0,
        //             "filter": "W10=",
        //             "sort": "",
        //             "tab": '<i class="fa-light fa-house"></i>',
        //             "url": "/private/rest/dsk/project/1/tasks/list_tab",
        //             "hideMenu": true,
        //             "active": true,
        //         }
        //
        //         res.unshift(home);
        //
        //         let json = [{
        //                 icon: '',
        //                 title: 'Edit',
        //                 wjClick: this.eventClickTabEdit,
        //             },
        //             {
        //                 icon: '',
        //                 title: 'Resetovať',
        //                 wjClick: this.eventClickTabReset,
        //             },
        //             {
        //                 icon: '',
        //                 title: 'Delete',
        //                 wjClick: this.eventClickTabDelete,
        //             }];
        //
        //         let nav = document.createElement("wj-nav");
        //         nav.jsonActions = json;
        //
        //         this.shadowRoot.insertBefore(nav, this.shadowRoot.querySelector(".controls"));
        //         this.store.pause();
        //         this.store.dispatch(this.defaultStoreActions.loadAction('nav')(res));
        //         this.store.play();
        //     });

        this.store.define("columnOptions-" + this.tableId, {}, null);
        this.store.define("filterObj-" + this.tableId, {}, null);
		console.log("before_draw",this.tableId);
		this.store.define("dataContent-" + this.tableId, [], null,"name");
		this.store.define("edited_dataContent-" + this.tableId, {}, null);
		
		
		this.store.define("deleteRow-" + this.tableId, {}, null);
		//this.store.define("editRow", {}, null);
		
	
		
		 //
        // this.context.appendChild(template.content.cloneNode(true));

        // this.tableElement = this.shadowRoot.querySelector(".table");
        // this.tableElement.id = this.tableId;

        // this.draw();
    }

    draw() {
        let fragment = new DocumentFragment();

        let controls = document.createElement("div");
        controls.innerHTML = `<slot class="d-flex align-items-center" name="filter"></slot>
            <slot class="d-flex align-items-center ml-3"></slot>`;

        let card = document.createElement("div");
        card.classList.add("card", "card-default", "mb-0", "routerlinks");

        let table = document.createElement("div");
        table.classList.add("table", "position-relative");
        table.setAttribute("id", this.tableId);

        card.appendChild(table);

        fragment.appendChild(controls);
        fragment.appendChild(card);

        this.tableElement = table;

        return fragment;
    }
	setData(tableData){
		//console.log("set_data","start");
		this.columns = tableData.columns;		
		this.columns.forEach(column => {
			const field = column.field;
			if(field.endsWith("_date")){	
				console.log("setting_editor");			
				column['headerFilter']= myEditor;	
				column['headerFilterFunc']= dateRangeFilter;				
			}
		});	
console.log("table_columns:"+JSON.stringify(this.columns));
		this.columns = this.columns.map((c) => {
		c = { ...c, accessorDownload: this.myPrintFormatter };
			// if (c.filterable && this.filterable.toUpperCase() == 'ADVANCED')
			//     return { ...c, headerPopup: this.headerPopupFormatter };

			return c;
		});
		this.table.setColumns(this.columns);
		this.table.setData(tableData.data);
		//console.log("This_is_array:"+Array.isArray(tableData.data));
		this.table.redraw();
		//this.table.hideColumn("id");
		this.store.dispatch(
		this.defaultStoreActions.addAction('dataContent-' + this.tableId)(tableData.data)
		);
		 
		//console.log("set_data","finish");
	}
	onDelete(e,cell){
		console.log(Table.is,"delete_start");
		if (e.stopPropagation) {
			e.stopPropagation()		
		}
		else {
			e.cancelBubble = true
		}
		this.counter = this.counter+1;
		var testVar =  this.store.getState()["dataContent-" + this.tableId]
		
		let row = cell.getRow();
		let pos = row.getPosition();
		
		this.table.deleteRow(row);
		console.log(Table.is,"delete_start_1:"+"deleteRow-" + this.tableId);

		
		this.store.subscribe("deleteRow-" + this.tableId, (key,state, oldState) => {	console.log("table_subscription");this.myDeleteRow(key,state, oldState);});
		
		this.store.dispatch(this.defaultStoreActions.deleteAction("deleteRow-" + this.tableId)({dateTime:Date.now(),editedRowData: row.getData()}));
		
	}
	onEdit(e,cell){		
		if (e.stopPropagation) {
			
			e.stopPropagation();
			
			//e.preventDefault();
			
		}
		else {
			e.cancelBubble = true
		}

		this.counter = this.counter+1;

		var testVar =  this.store.getState()["dataContent-" + this.tableId]

		let row = cell.getRow();
		let pos = row.getPosition();
		//editRow
		console.log("row.getData():"+JSON.stringify(row.getData()));
		this.store.subscribe("edited_dataContent-" + this.tableId, (key,state, oldState) => {	console.log("table_subscription");this.edit(key, state, oldState);});
		// this.store.subscribe("edited_dataContent-" + this.tableId,this.edit);
		this.store.dispatch(this.defaultStoreActions.updateAction("edited_dataContent-" + this.tableId)({dateTime:Date.now(),editedRowData: row.getData()}));
		
	}

	myDeleteRow(key,state, oldState){
		console.log(Table.is,"delete_start_4_4");
		var rowTobeDeleted = key["deleteRow-" + this.tableId].editedRowData;
		console.log("rowTobeDeleted:"+JSON.stringify(rowTobeDeleted));
		this.dispatchEvent(
            new CustomEvent("wj:tableDeleteRow", {
                bubbles: true
				 ,                 detail: { data : rowTobeDeleted}
                
            })
        );
	}
	stringToFragment(string) {
	  const temp = document.createElement('template');
	  temp.innerHTML = string;
	  return temp.content;
	}
	edit(key, state, oldState){
		console.log("edit:"+JSON.stringify(key));
		var rowTobeEdited = key["edited_dataContent-" + this.tableId].editedRowData;
		console.log("rowTobeEdited:"+JSON.stringify(rowTobeEdited));
		console.log("rowTobeEdited:"+JSON.stringify(this.columns));
		var modal = document.getElementById("editRow");
		modal.close();
		var vis = document.getElementById("rprtDetails");
		if(vis){
			vis.parentElement.removeChild(vis);
		}
		var saveButton = document.getElementById("saveButton");
		if(saveButton){
			saveButton.parentElement.removeChild(saveButton);
		}
		const content = document.createElement("wj-button");
		content.setAttribute("slot","footer");
		content.textContent="Test1";
		const frag = `<div id="vis" class="content"><wj-grid>${content}</wj-grid></div>`;
		let isHtml = frag instanceof HTMLElement || frag instanceof DocumentFragment;
		console.log("isHtml:"+isHtml);
		let template = document.createElement('template');
		template.innerHTML = frag;
		let element = template.content.cloneNode(true);
		//modal.insertAdjacentHTML('beforebegin', `<div class='front-element'>Front of Element</div>`)
 const button = document.createElement('wj-button');
  button.setAttribute("id","saveButton");
  button.setAttribute("testButton","");
  button.setAttribute("slot","footer");
  //button.setAttribute("click","testSave($event)");
  button.addEventListener("wj:button-click", this.onSaveDialog);
  button.textContent="Save";
  console.log("dialog","before_set_title");
  modal.setTitle(rowTobeEdited.rprt_name);
  console.log("rowTobeEdited","rowTobeEdited:"+rowTobeEdited.id);
  console.log("dialog","after_set_title");
  //modal.setAttribute(rowTobeEdited.rprt_name);
  const div = document.createElement('div');
  div.setAttribute("id","rprtDetails");
    div.setAttribute("slot","");
	div.classList.add("content");
  var strTemplate= ` <wj-grid id="rprtDetailsGrid">`
  
  this.columns.forEach(column => {
  
  if(column.title != "Edit" && column.title != "rprt_name"){
	  if(column.title != "name"){
	strTemplate = strTemplate.concat(
			`
			<wj-row class="gx-1">
				<wj-col size="6">
					<wj-label class="fieldName" id="${column.field}">${column.title}</wj-label>
				</wj-col>
				
			`
			)
			
			if(!column.formatter){
			//no formatter
			strTemplate = strTemplate.concat(
			`
			<wj-col size="6">
				
					<wj-input class="fieldValue" value="${rowTobeEdited[column.field]|| ''} "></wj-input>
				
				</wj-col>
			</wj-row>
			`);
			}else{
				if(column.formatter == "wj-cell-checkbox"){
					if(rowTobeEdited[column.field] == 1){
					strTemplate = strTemplate.concat(
					`
					<wj-col size="6">
						
							<wj-checkbox id="${column.field}" emptyCheck1 class="fieldValue" checked ></wj-checkbox>
						
						</wj-col>
					</wj-row>
					`)
					}else{
							strTemplate = strTemplate.concat(
					`
					<wj-col size="6">
						
							<wj-checkbox id="${column.field}" emptyCheck class="fieldValue"  ></wj-checkbox>
						
						</wj-col>
					</wj-row>
					`)
					}
				}			
			}
	  }
			
			else{
				strTemplate = strTemplate.concat(
           ` 
		   <wj-row class="gx-1">
				<wj-col size="6">
					<wj-label class="fieldName" id="${column.field}" >${column.title}</wj-label>
				</wj-col>
				
		   
		   <wj-col size="6">
			
             <wj-input readonly class="fieldValue" value="${rowTobeEdited[column.field] || '' }  "></wj-input>
            </wj-col>
          </wj-row>
		  `
		   )
  }
  }
  })
		   
		strTemplate =   strTemplate.concat(`</wj-grid>`)
   div.innerHTML = strTemplate;
		modal.appendChild(button);
		modal.appendChild(div);
		
		 document.dispatchEvent(
            new CustomEvent("open-modal", {
                bubbles: true
            }
        ));
		
		//this.store.unsubscribe("edited_dataContent-" + "testTable2");
		
	}
	
	onSaveDialog(e){
		console.log("table_on_save_start");
		console.log("table_on_save_target:"+e.target);
		//console.log("on_save_detail:"+e.target.detail);
		
		var modal = document.getElementById("editRow");
		console.log("table_on_save_report_name:"+modal.title);
		var rprtDetailsGridItems = document.getElementById("rprtDetailsGrid").children;
		
const listArray = Array.from(rprtDetailsGridItems);
 var data = [];
 var obj = {};
listArray.forEach((item) => {
	
	console.log(item.tagName);
	const listColumns = Array.from(item.children);
	var fieldNameF = item.querySelectorAll(".fieldName");
	var fieldValueF = item.querySelectorAll(".fieldValue");
	console.log("table_on_save","FieldName_value:"+fieldNameF[0].value);
	console.log("table_on_save","FieldName_id:"+fieldNameF[0].id);
	console.log("table_on_save","FieldName_Tag:"+fieldNameF[0].tagName);
	console.log("table_on_save","Field Value:"+fieldValueF[0].shadowRoot.querySelector("input").value);
	console.log("table_on_save","Field Value:"+fieldValueF[0].tagName);
	
	var fieldName = fieldNameF[0].id;
	var tagName = fieldValueF[0].tagName
	var isCheckBox = fieldValueF[0] instanceof Checkbox;
	var isInput = fieldValueF[0] instanceof Input;
	console.log("table_on_save","FieldName_var:"+fieldName);
	
	if(isCheckBox){
		console.log("table_on_save","isCheckBox:"+isCheckBox + " fieldValueF[0].checked:"+fieldValueF[0].checked);
		console.log("table_on_save","isCheckBox:"+isCheckBox + " fieldValueF[0].checked:"+fieldValueF[0].hasAttribute("checked"));
		var fieldValue = -1;
		if(fieldValueF[0].hasAttribute("checked")){
			fieldValue = 1;
		}else{
			fieldValue =0;
		}
		
		
			obj[fieldName] = fieldValue;
		console.log("table_on_save","isCheckBox_fieldValue:"+fieldValue);
		console.log("table_on_save","FieldName_var_3:"+fieldName);
		//data.push(obj);
		
	}
	if(isInput){
		var fieldValue = fieldValueF[0].shadowRoot.querySelector("input").value;
		const isEmpty = (str) => (!str?.length);
		console.log("FieldName_var_1:"+fieldName);
		if(!isEmpty(fieldValue)){
			console.log("FieldName_var_1_1:"+fieldName);
			const myVar = {fieldName : fieldValue.trim()}
			
			obj[fieldName] = fieldValue.trim();
			console.log("table_on_save","FieldName_var_1_1_myVar:"+myVar);
			console.log("table_on_save","FieldName_var_1_1_myVar:"+JSON.stringify(myVar));
			console.log("table_on_save","FieldName_var_1_1_obj:"+JSON.stringify(obj));
			//data.push(obj);
		}
	
		else{
			
			obj[fieldName] = null;
			console.log("table_on_save","FieldName_var_2:"+fieldName);
			//data.push(obj);
		}
	}
	/*switch(expression) {
	  case Checkbox.is:
		// code block
		break;
	  case y:
		// code block
		break;
	  default:
		// code block
	}
	*/
	
	
	

	
});
console.log("table_on_save","result_data2:"+JSON.stringify(data));
		this.dispatchEvent(
            new CustomEvent("wj:modalSave", {
                bubbles: true
				 ,                 detail: { data : obj, reportName:modal.title}
                
            })
        );
		
		console.log("table_on_save","after_dispatch");
		modal.close();
		console.log("table_on_save_finish");
		
	}
	 isBlank(str) {
    return (!str || /^\s*$/.test(str));
	}
    afterDraw() {
		//console.log("table","after_draw","start");
		 /*
		 this.store.subscribe("deleteRow", (key, state, oldState) => {
		
            this.testDelete();
        });
		*/
			
			
		
		// this.store.subscribe("deleteRow", this.testDelete.bind(this));
        this.bulk = this.hasAttribute("bulk");
        this.initialized = false;
        this.resizable = this.getAttribute("resizable");
        this.sortable = this.filterable == 'ADVANCED' || this.hasAttribute("sortable");

        // ADVANCED filter
		//console.log("table","after_draw","advanced","before");
        this.filterAdvanced();
		//console.log("table","after_draw","advanced","after");
        // SIMPLE filter
		//console.log("table","after_draw","simple","before");
        this.filterSimple();
		//console.log("table","after_draw","simple","after");
        // CUSTOM filter
		//console.log("table","after_draw","custom","before");
        this.customFilter();
		//console.log("table","after_draw","custom","after");
        if(this.sortable && this.filterable != "ADVANCED")
            this.tableElement.setAttribute("sortable", "");

        this.tableElement.classList.add(this.filterable.toLowerCase())


 


        this.table = new TabulatorFull(this.tableElement, {
            /*ajaxURL: this.getAttribute("dataUrl"),
            ajaxURLGenerator: this.ajaxURLGenerator,
            ajaxResponse: this.ajaxResponse,
            dataReceiveParams: {
                last_page: "lastPage",
                total_items: "totalItems",
                data: "content",
            },
			*/
			reactiveData: true, //enable reactive data
			//data: this.tableData.data,
			//columns: columns,
			//selectableRows:1, 
			selectable:1,
            layout: this.layout || "fitDataFill",
            tooltips: true,
            history: true,
            clipboard: false,
            clipboardPasteAction: "replace",
            //paginationMode: "remote",
            //filterMode: "remote",
            //sortMode: this.sortable ? "remote" : false,
            locale: "en-US",
            movableColumns: true,
            selectableRows: "highlight",
            progressiveLoad: this.infinity ? "scroll" : false,
            pagination: this.infinity ? false : true,
            progressiveLoadScrollMargin: 30,
            paginationSize: this.pageSize,
            paginationSizeSelector: [6, 10, 25, 50, 100, 500],
            paginationCounter: (pageSize, currentRow, currentPage, totalRows, totalPages) => {
                return 'Záznamov ' + totalRows;
            },
            resizableColumnFit: false,
            placeholder: "Nie sú k dispozícii žiadne dáta",
            maxHeight: this.getAttribute("max-height") || false,
			 cellClick: (e, cell) => {
                      //  cell.getRow().toggleSelect();
					//  console.log("hello");
                    },
				dataChanged:  (data) => {
					//console.log("ngOnChanges","data changed");
				},
				dataLoaded: (data) =>{
					//console.log("ngOnChanges","data loaded");	
				},
				hideColumn : (data) =>{
					console.log("hide column","data loaded");	
				}
        });
		/*
this.table.on("cellClick", function(e, cell){
        //e - the click event object
        //cell - cell component
		
		
});
*/
 if(this.filterable == "SIMPLE" || this.filterable == "ADVANCED") {
			 //console.log("wj_table_options_data_length:"+this.shadowRoot.getElementById("this_is"));
			 // console.log("wj_table_options_data_length:"+document.getElementById("this_is"));
			    //console.log("wj_table_options_data_length:"+this.table.getElementById("this_is"));
				//console.log("wj_table_options_data_length:"+this.table.shadowRoot.getElementById("this_is"));
                this.append(this.getOptionsElement());
            }
this.table.on('tableBuilt', () => {
	console.log("table_built");
	
           // this.table.setLocale("zh-cn");
	/*
		this.dispatchEvent(
            new CustomEvent("wj:table-built", {
                bubbles: true,
            })
        );
		*/
})
this.table.on("cellClick",this.cellClicked.bind(this))
//this.table.on("hideColumn", this.hideColumn.bind(this));
this.table.on("dataSorted", function(sorters, rows){
    //sorters - array of the sorters currently applied
    //rows - array of row components in their new order
	
});
if(this.hasAttribute("rowSelectable")){

this.table.on("rowSelectionChanged", (data, rows) => {
	this.dispatchEvent(
            new CustomEvent("wj:rowSelectionChanged", {
                bubbles: true
				,detail: {
                    data: data,
                    rows: rows
                }
            })
        );
});

}
//this.store.subscribe("editRow", (key, state, oldState) => {	this.edit(key, state, oldState);});
          	  //this.edit(key, state, oldState);
			//this.refresh();
			//this.store.dispatch(this.defaultStoreActions.updateAction("editRow")(row.getData()));
        //});
		//this.store.dispatch(this.defaultStoreActions.updateAction("editRow")(""));
        this.table.filterable = this.filterable;
		//console.log("table","after_draw","finish");
    }

    eventClickTab = (e) => {
        let filterArray = JSON.parse(Table.atob_utf8(e.detail.data.filter));
        this.store.dispatch(this.defaultStoreActions.addAction("filterObj-" + this.tableId)({
            "filter": filterArray,
            "table": this.tableId
        }));
    }

    eventClickTabEdit = ( e, item, anchor ) => {
        anchor.setAttribute("contenteditable", true)
        anchor.focus();
        anchor.onblur = (e) => {
            anchor.removeAttribute("contenteditable");
            anchor.blur();
            let data = item.data;
            data.tab = anchor.innerText;
            Table.saveTab("PUT", "/private/rest/hub/tabulator/filter/" + data.id, data).then((res) => {
                intranet.notification(res);
                item?.refresh();
            });

            anchor.onblur = () => {};
        }
    }

    eventClickTabReset = ( e, item, anchor ) => {
        let nav = Table.setNavActive(item.data.id);

        this.store.dispatch(this.defaultStoreActions.loadAction("nav")(nav));

        let filterArray = JSON.parse(Table.atob_utf8(item.data.filter));
        this.store.dispatch(this.defaultStoreActions.addAction("filterObj-" + this.tableId)({
            "filter": filterArray,
            "table": this.tableId,
        }));
    }
	cellClicked( event,cell) {	   
	   //damast
	   
	   const field = cell.getColumn().getField();	   
	   switch (field) {
			case 'delete':
				console.log(Table.is,"cell_clicked_delete");
				return this.onDelete(event, cell);
			case 'edit':
				console.log(Table.is,"cell_clicked","edit");
				return this.onEdit(event, cell);
			default:
				console.log(Table.is,"cell_clicked_default");
			return;
	   } 
	}
/*
    eventClickTabDelete = ( e, item, anchor ) => {
        Table.deleteTab("/private/rest/hub/tabulator/filter/" + item.data.id).then((res) => {
            this.store.dispatch(this.defaultStoreActions.deleteAction("nav")(item.data));
            let nav = Table.setNavActive(0, res.data);

            this.store.dispatch(this.defaultStoreActions.loadAction("nav")(nav));

            let filterArray = JSON.parse(Table.atob_utf8(this.store.getState().nav[0].filter));
            this.store.dispatch(this.defaultStoreActions.addAction("filterObj-" + this.tableId)({
                "filter": filterArray,
                "table": this.tableId
            }));

            intranet.notification(res);
        });
    }
	*/
	 hideColumn (e, column) {
		 console.log("hide_column");
	 }

    ajaxURLGenerator = (url, config, params) => {
        let filter = '';
        let sort = '';

        if (params.filter.length == 0 && params?.sort?.length == 0) {
            return `${url}?page=${params.page - 1}&size=${params.size}&initialized=${this.initialized}&filterable=${
                this.filterable
            }&sortable=${this.sortable}&resizable=${this.resizable}`;
        }

        // kontrola existencie SORT param
        if (params?.sort?.length > 0) {
            let sortParams = this.columns.filter((f) => f.field == params?.sort[0].field)[0];

            sort = `&sort=${sortParams.sortField},${params?.sort[0].dir}`;
        }

        // kontrola existencie FILTER param
        if (params?.filter?.length > 0) {
            filter = `&tabfilter=${btoa(JSON.stringify(params.filter))}`;

            if (this.filterable.toUpperCase() == 'SIMPLE') {
                filter = '&tabfilter=' + params.filter[0].value;
            }

            if (this.filterable.toUpperCase() == 'CUSTOM') {
                filter = '&' + params.filter[0].value;
            }
        }

        return `${url}?page=${params.page - 1}&size=${params.size}&initialized=${this.initialized}&filterable=${this.filterable}&sortable=${this.sortable}&resizable=${this.resizable}${sort}${filter}`;
    }

    ajaxResponse = (url, params, response) => {
        if (!this.initialized) {
            let columns = response.columns;

            // if (this.filterable.toUpperCase() == 'ADVANCED') {
            //     columns = response.columns.map((c) => {
            //         return { ...c, ...{headerFilterFunc: () => {}}};
            //     });
            // }
            // vlozime zatial takto bulk-y
            if (this.bulk) columns.splice(1, 0, this.bulkCell);

            this.store.dispatch(
                this.defaultStoreActions.updateAction('columnOptions-' + this.tableId)(response.columnOptions)
            );

            columns = columns.map((c) => {
               // c = { ...c, accessorDownload: this.myPrintFormatter };
                // if (c.filterable && this.filterable.toUpperCase() == 'ADVANCED')
                //     return { ...c, headerPopup: this.headerPopupFormatter };

                return c;
            });

          

            this.table.setColumns(columns);
            this.initialized = true;

            // ulozime si columns ktory prisiel zo servera
            this.columns = response.columns;
        }

        return response;
    }
 headerPopupFormatter = (cell, onRendered, success, cancel, editorParams)=>{
   // headerPopupFormatter = (e, column, onRendered, a) => {
        //e.stopPropagation();
		console.log("table","headerPopupFormatter","finish");

        let container = document.createElement('div');

        // SEARCH
        container.appendChild(this.filter(cell));

        // SORT
        //container.appendChild(this.sort(column));

        return container;
    }

    getOptionsElement() {
		//console.log("table","getOptionsElement","start");
        /*let options = document.createElement("wj-table-options");
        options.setAttribute("shadow", "open");
        options.table = this.table;
        options.data = this.export.map(e => this.exportType().filter(ex => {
		//console.log("table",e);	
		if(ex.type == e){
			//console.log("table","return true");	
			return true;
		}
		//console.log("table","return false");	
		return false;
		})[0]);
		//console.log("table","getOptionsElement","finish");
        return options;
		*/
		let options = document.createElement("wj-table-options");
        options.setAttribute("shadow", "open");
        options.table = this.table;
        options.data = this.export.map(e => this.exportType().filter(ex => ex.type == e)[0]);
 return options;
		
    }

    filter(column) {
		console.log("table","filter","start");
        //let params = this.columns.filter((f) => f.field == column.getField())[0];
		let params = column.getField()

        let search = document.createElement('wj-table-search-element');
        search.setAttribute('type', params?.headerFilterFuncParams?.type);
        search.setAttribute('title', params?.title);
        search.setAttribute('field', params?.filterField);
        search.column = column;

        let wrapperSearch = document.createElement('div');
        wrapperSearch.classList.add('wrapper-filter');
        wrapperSearch.appendChild(search);
		//console.log("table","filter","finish");
        return wrapperSearch;
    }

    sort(column) {
		//console.log("table","sort","start");
        let fragment = new DocumentFragment();
        let params = this.columns.filter((f) => f.field == column.getField())[0];

        // let sort = document.createElement('div');
        // sort.classList.add('wrapper-sort');

        let title = document.createElement('div');
        title.classList.add('dropdown-title');
        title.innerText = 'Zoradiť položky';

        let asc = document.createElement('div');
        asc.classList.add('wj-dropdown-item');
        asc.innerHTML = '<i class="fa-solid fa-arrow-down-short-wide menu-icon"></i> Zostupne';
        asc.addEventListener('click', (e) => {
            this.table.setSort([{ column: params?.sortField, dir: 'asc' }]);
        });

        let desc = document.createElement('div');
        desc.classList.add('wj-dropdown-item');
        desc.innerHTML = '<i class="fa-solid fa-arrow-up-wide-short menu-icon"></i> Vzostupne';
        desc.addEventListener('click', (e) => {
			console.log("table","sort","start");
            this.table.setSort([{ column: params?.sortField, dir: 'desc' }]);
        });
        fragment.appendChild(title);
        fragment.appendChild(asc);
        fragment.appendChild(desc);
		//console.log("table","sort","finish");
        return fragment;
    }

    // ADVANCED filter
    filterAdvanced() {
		console.log("table","filter_advanced","start");
        if (this.filterable.toUpperCase() == 'ADVANCED') {
			console.log("table","filter_advanced","1");
            let filter = document.createElement('wj-table-filter-advanced');
            filter.setAttribute("slot", "filter");
            filter.setAttribute('hidden', '');
			console.log("table","filter_advanced","2");
            // filter.classList.add("mb-3");
            filter.id = this.tableId;
			console.log("table","filter_advanced","3");
            this.appendChild(filter);
        }
		console.log("table","filter_advanced","finish");
    }

    // Simple filter
    filterSimple() {
		//console.log("table","filter_simple","start");
		//console.log("table","filter_simple","start",this.filterable);
        if (this.filterable.toUpperCase() == 'SIMPLE') {
            let filter = document.createElement("wj-table-filter-simple");
            filter.setAttribute("slot", "filter");
            filter.setAttribute("shadow", "open");
            filter.classList.add("mb-3");
            filter.tableId = this.tableId;

            this.append(filter);
        }
		//console.log("table","filter_simple","finish");
    }

    customFilter() {
		//console.log("table","getOptionsElement","finish");
        if (this.filterable.toUpperCase() == 'CUSTOM') {
            this.shadowRoot.querySelector('slot[name="filter"]')?.assignedElements?.().forEach((el) => {
                el.id = this.tableId;
            });
        }
    }

    getInstanceTabulator = () => {
		//console.log("table","getOptionsElement","finish");
        return this.table;
    }

    cellClick = (e, cell) => {
		//console.log("table","getOptionsElement","finish");
        cell.getRow().toggleSelect();
    }

    myPrintFormatter = (value, data, type, params, column) => {
		console.log("table","myPrintFormatter","start");
		console.log("table","myPrintFormatter",value);
        let definition = column.getDefinition();
        let printField = definition.formatterParams?.printField;
		console.log("table","myPrintFormatter",printField);
        if(definition.field == "_actions_" || definition.field == "bulk" || !value){
			console.log("table","myPrintFormatter","1");
            return "";
		}

        if(definition.formatter == "wj-date"){
			console.log("table","myPrintFormatter","2");
			console.log("table","myPrintFormatter","definition:"+definition);
			console.log("table","myPrintFormatter","definition:"+JSON.stringify(definition));
            return this.datetime(value);
		}

        if(definition.formatter == "wj-datetime"){
			console.log("table","myPrintFormatter","3");
            return this.datetime(value);
		}

        if(printField){
			console.log("table","myPrintFormatter","4");
            return value[printField];
		}
		console.log("table","myPrintFormatter","value:"+value);
		console.log("table","myPrintFormatter","5");
		
        return value;
    }

    exportType = () => {
        return [{
            "title": "Stiahnuť Excel",
            "type": "xlsx",
            "filename": "data.xlsx",
            "icon": "<style> @import \"assets/all.css\" </style><i slot=\"end\" class=\"fa fa-file-excel\"></i>"
        }, {
            "title": "Stiahnuť PDF",
            "type": "pdf",
            "filename": "data.pdf",
            "icon": "<i class=\"fa-light fa-file-pdf\"></i>"
        }, {
            "title": "Stiahnuť CSV",
            "type": "csv",
            "filename": "data.csv",
            "icon": "<i class=\"fa-light fa-file-csv\"></i>"
        }]
    }
	unregister(){
		
		//console.log("unregister","table");
		
	}
	afterDisconnect(){
		//console.log("unregister","after","table");
		
	}
}

// let __esModule = 'true';
// export {__esModule};

customElements.get(Table.is) || customElements.define(Table.is, Table);