const Actions = require("./actions.js");

const Model = (function(){

	init();

	let state = {
		items: [
			{id: 1, category:"business"},
			{id: 2, category:"colture"},
			{id: 3, category:"men"},
		]
	};

	function init(){
		//Add Events
		Actions.on("items.removeItem", onRemoveItem);
		Actions.on("items.addItem", onAddItem);
	}

	function publish(){
		Actions.trigger("items", state.items);
	}

	//////////////// Actions
	function onRemoveItem (obj) {
		state.items = state.items.filter(item => item.id !== Number(obj.id))

		publish();
	}

	function onAddItem (obj) {
		obj.id = (state.items.length > 0) ? state.items[state.items.length - 1].id + 1 : 1;
		state.items = [...state.items, obj];
		publish();
	}

})();

module.exports = Model;

