const Actions = (function(){

  let observers = {
  	"items"              : "items", // "items"  : [func, func, func]
  	"items.addItem"      : "items.addItem",
  	"items.removeItem"   : "items.removeItem",
    "items.initialState" : "items.initialState"
  };

  return {
    on: function (actionType, listener) {
      	observers[actionType] = (observers[actionType] && Array.isArray(observers[actionType])) ?
      	observers[actionType] : [];

        //Add listener
        observers[actionType] = [...observers[actionType], listener];
    },

    trigger: function (actionType, payload) {
      if (!observers[actionType]) return;

      observers[actionType].forEach( item => item (typeof payload !== 'undefined' ? payload : {}));
    },

    remove: function (actionType, observer) {
    	if (!this.observers[actionType]) return;
      let observerIndex = this.observers[actionType].indexOf(observer);

    	if (observerIndex !== -1) {
        observers[actionType] = [
          ...observers[actionType].slice(0, observerIndex),
          ...observers[actionType].slice(observerIndex + 1)
        ];        
      }
    }
  };

})();


export default Actions;
