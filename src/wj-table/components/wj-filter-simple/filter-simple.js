import { default as WJElement } from "../../../wj-element/wj-element.js";
import {  Table } from "../../table.js";
import { elementPrefix } from '../../../utils/wj-utils.js';
const template = document.createElement("template");
template.innerHTML = `<style>
    /*@import "assets/css/pages.css";
    @import "/templates/net/pages/css/themes/net-basic.css";
    @import "assets/css/font-awesome.css";
    @import "assets/css/font-awesome.min.css";
	*/
    @import "assets/all.css";
	@import "assets/font-awesome-rtl.css";
    :host {
        display: flex;
        align-items: center;
        margin: 1rem 0 1rem auto;
		direction: rtl !important;
    }
    
   .search{
	display: flex;
   /* position: absolute; */
    direction: ltr !important;
    /* display: flex; */
    justify-content: flex-end;
    flex-direction: row-reverse;
}
       
    input {
        /*border: 0 none !important;*/
        min-height: 28px !important;
        padding: 2px 5px;
        max-height: 24px !important;
		direction: ltr !important;
    }
    
   .btn-search{
    display: flex;
    /* position: absolute; */
    right: 0;
    top: 0;
    /* min-height: 28px !important; */
    /* display: flex ; */
    flex-direction: row-reverse;
    justify-content: flex-end;
}
</style>

<div class="search">
    <input type="text" placeholder="Vyhľadávanie" class="form-control input-xs" />
    <button class="btn btn-link btn-search"><i class="fa  fa-search"></i></button>
</div>`;

export default class FilterSimple extends WJElement {
    constructor() {
        super(template);
    }
 static get className() {
        return "FilterSimple";
    }
   	static set cssStyleSheet(inStyle) {		
		this.styles = inStyle;
	}

    static get cssStyleSheet() {
        return this.styles;
    }
	static get is() {
		return `${elementPrefix}-table-filter-simple`;
	}
    draw(context, store, params) {	
		//this.context.querySelector("button").addEventListener("click", this.executionFilter);
		this.context.querySelector("input").addEventListener("keyup", this.executionFilter);
        // stalecnei klavesy enter
        /*this.context.querySelector("input").addEventListener("keyup", (e) => {
            if(e.key.toUpperCase() == "ENTER"){
                this.executionFilter();
            }
        });
		*/

    }

    executionFilter = () => {
		//filterable="simple" 
		
        let table = Table.getInstance(this.tableId).table;
		

		var searchValue = this.context.querySelector("input").value;
		console.log("filter_simple","find:"+searchValue);		
		var cols = table.getColumns(true) 
		/*const ignoreColumns = ["_actions_","displayName","description"];
  const searchFields = cols.filter(
    (field) => !ignoreColumns.includes(field),
  );

var filterArray = searchFields.map((field) => {
        // You can customize the properties here
		console.log("hello");
		  //filters.push({ field: field, type: 'like', value: `%${searchValue}%`  })
        return { field: field, type: 'like', value: searchValue  };
    });
	*/
	// table.setFilter( [{field: 'name', type: 'like', value: '%name1%'  }]);
	//	table.setFilter('name', 'like', searchValue)
	//table.setFilter([filterArray])
	//set filter to custom function
	//table.setFilter(matchAny, {value:5});
		const filterOptions = [
            [
                { field: "name", type: "like", value: `%${searchValue}%` }
			//,	{ field: "description", type: "=", value: searchValue }                
            ]
        ];
		//table.redraw(true)
		//table.setFilter(filterOptions)
		console.log("filter_simple","find:"+searchValue);
		var filters = [];
		/* cols.forEach(function(column){
        filters.push({
            field:column.getField(),
            type:"like",
            value:searchValue,
        });
    });
	*/
		cols.forEach(function(col){
			if(col.getField()){
				console.log("filter_simple","iterating");
				filters.push({field: col.getField(), type:"like", value:searchValue});
			}
		});

		table.setFilter([filters]);
		const filteredRows = table.searchData(filters);
		console.log("filteredRows: "+filteredRows);
    }
	unregister(){}
	afterDisconnect(){}
}

//let __esModule = "true";
//export {__esModule};

customElements.get(FilterSimple.is) || customElements.define(FilterSimple.is, FilterSimple);
