/**
 * Any property will work with attributes instead
 * 
 * @param {HTMLElement} obj
 * @param {Array} props
 */
export default (obj, props) => {
  for (const key of props) {
    Object.defineProperty(obj, key, {
      get() {
		 // console.log("number_formatter","get reflcted properties:"+key);
		 // console.log("number_formatter","get reflcted properties:"+obj.getAttribute(key));
        return obj.getAttribute(key);
      },
      set(value) {
		  //console.log("number_formatter","set reflcted properties:"+value);
        obj.setAttribute(key, value);
      },
    });
  }
};