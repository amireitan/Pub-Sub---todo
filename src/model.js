import Actions from "./actions.js";

const Model = (function(){

	let state = {
		items: [
			{id: 1, title:"item1"},
			{id: 2, title:"item2"},
			{id: 3, title:"item3"},
		]
	};

	function init(){
		//Add Events
		Actions.on("items.removeItem", onRemoveItem);
		Actions.on("items.addItem", onAddItem);
		Actions.on("items.initialState", publish);
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

	init();
})();

export default Model;

