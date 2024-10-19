import { default as WJElement } from "../../../wj-element/wj-element.js";
import {  Table } from "../../table.js";

const template = document.createElement("template");
template.innerHTML = `<style>
    @import "assets/css/pages.css";
   // @import "/templates/net/pages/css/themes/net-basic.css";
    //@import "assets/css/font-awesome.css";
   // @import "assets/css/font-awesome.min.css";
    
    :host {
        display: flex;
        align-items: center;
        margin: 1rem 0 1rem auto;
    }
    
    .search {
        position: relative;
    }
       
    input {
        /*border: 0 none !important;*/
        min-height: 28px !important;
        padding: 2px 5px;
        max-height: 24px !important;
    }
    
    .btn-search {
        position: absolute;
        right: 0;
        top: 0;
        min-height: 28px !important;
    }
</style>

<div class="search">
    <input type="text" placeholder="Vyhľadávanie" class="form-control input-xs" />
    <button class="btn btn-link btn-search"><i class="fa-light fa-search"></i></button>
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
    draw(context, store, params) {
        // click na button
		console.log("FilterSimple","draw","start");
      //  this.context.querySelector("button").addEventListener("click", this.executionFilter);
	this.context.querySelector("input").addEventListener("keyup", this.executionFilter);
        // stalecnei klavesy enter
        /*this.context.querySelector("input").addEventListener("keyup", (e) => {
            if(e.key.toUpperCase() == "ENTER"){
                this.executionFilter();
            }
        });
		*/
		console.log("FilterSimple","draw","finish");
    }

    executionFilter = () => {
        let table = Table.getInstance(this.tableId).table;
		//const filters = table.getFilters()

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
                { field: "name", type: "like", value: `%${searchValue}%` },
			//	 { field: "description", type: "=", value: searchValue },
				
                
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
		if(col.getField())
		{
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

customElements.get("wj-table-filter-simple") || customElements.define("wj-table-filter-simple", FilterSimple);
