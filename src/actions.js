var Actions = (function(){

  var observers = {
  	"items"            : "items", // "items"  : [func, func, func]
  	"items.addItem"    : "items.addItem",
  	"items.removeItem" : "items.removeItem",
  };

  return {
    on: function (topic, listener) {
    	  // console.log("%c Actions.on - Adding a callback for an action - ", "background:pink", topic);
      	observers[topic] = (observers[topic] && Array.isArray(observers[topic])) ?
      	observers[topic] : [];

        //Add listener
        observers[topic] = [...observers[topic], listener];

      	console.log("ON FUNCTION OBSERVERS: ", observers);
    },

    trigger: function (topic, payload) {
      // console.log("%c Actions.trigger - Triggering an action - ","background:green", topic);
      if (!observers[topic]) return;

      observers[topic].forEach( item => item (typeof payload !== 'undefined' ? payload : {}));
    },

    remove: function (topic, observer){
    	if (!this.observers[topic]) return;

    	if (this.observers[topic].indexOf(observer) !== -1) observers.splice(index, 1);
    }
  };

})();


module.exports = Actions;
