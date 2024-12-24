import moment from "moment";

export const bool = (v) => { return v==="false" || v==="null" || v==="NaN" || v==="undefined" || v==="0" ? false : !!v; }

export const elementPrefix = 'wj';

export const upperCasePerfix = elementPrefix.toUpperCase();


export const formatDateTime = (value,mask) => {  
  return moment(value).format(mask);
}

export const myEditor = (cell, onRendered, success, cancel, editorParams)  => {
	const myflatpickr = document.createElement("wj-myflatpickr");
	  myflatpickr.addEventListener("selectedDates", (event) => {
      console.log("Got dateTimes:", event.detail);
	   console.log("Got start:", event.detail[0]);
	   const fromDate =  event.detail[0];
	   const toDate =  event.detail[1];
	   
	   console.log("Got end:", event.detail[1]);
	   success({
          start: fromDate,
          end: toDate,
        });
    });
	 
	return myflatpickr;
}

export const dateRangeFilter = (headerValue, rowValue, rowData, filterParams) =>{
	console.log("dateRangeFilter_dateRangeFilter_dateRangeFilter");
	console.log("rowValue:"+rowValue);
	console.log("start:"+headerValue.start);
	console.log("end:"+headerValue.end);
	//return true;
    try {
		const start = (headerValue.start);
        const end = (headerValue.end);
       // const start = DateTime.fromISO(headerValue.start);
       // const end = DateTime.fromISO(headerValue.end);
        const endDate = (rowValue);

        const hasChildInRange = rowData.children?.some(child => {
           // const childEndDate = DateTime.fromISO(child.endDate);
            return child.endDate >= start && child.endDate <= end;
        });

        return hasChildInRange || (endDate >= start && endDate <= end);
    } catch (error) {
        console.error("Invalid date format:", error);
        return false;
    }
	
}