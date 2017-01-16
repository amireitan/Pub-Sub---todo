import Actions from "./actions.js";
import Model from "./model.js";

const View = (function(){

	const Methods = {

		state: null,
		events: {},

		init: function (selector) {
 			document.querySelector(selector).innerHTML = this.createSearchBar() + this.createItemsContainer();
			document.querySelector("#inputItem").focus();
			this.addEventListeners();

 			Actions.on("items", this.onChange.bind(this));
 			Actions.trigger("items.initialState");

			this.setState();
		},

		addEventListeners: function(){
			this.eventsListeners("#btnAdd", "click", this.onAddItem);
			this.eventsListeners("#items", "click", this.onRemoveItem);
		},

		setState: function (data){
			if (!data) return;
			this.state = data;
			this.renderItems();
		},

		eventsListeners: function(selector, actionType, eventHandler) {
			if (!this.events.selector) {
				document.querySelector(selector).addEventListener(actionType, eventHandler);
				this.events[selector] = actionType;
			}
		},

		removeListeners: function() {
			for (let prop in this.events) {
				document.querySelector(prop).removeEventListener(this.events[prop], prop);
			}
		},

		onChange: function (data) {
			this.state = null;
			this.setState(data);
		},

		onAddItem: function (e, item) {
			if (e) e.preventDefault();

			let inputTextVal = document.querySelector("#inputItem") && document.querySelector("#inputItem").value;

			let itemValue = item || inputTextVal;
			Actions.trigger("items.addItem", {title: itemValue});
		},

		onRemoveItem: function (e) {
			if (e.target && e.target.nodeName == "LI") {
				Actions.trigger("items.removeItem", {id: e.target.dataset.itemid});
			}
		},

		createItemsContainer: function(){
			return `<section id="items"></section>`;
		},

		createSearchBar: function(){
			let button = `<input type='submit' id='btnAdd' value='Add'>`;
			let search = `<input type='text' id='inputItem'/>`;

			return `<form> ${search} ${button} </form>`;
		},

		createItems:function(state) {
			let Items = state.reduce((prev, next, index, array) => {
				return prev += `<li data-itemId=${next.id}> ${next.title}</li>`;
			}, `<ul id='itemsList'>`);
			return Items += `</ul>`;
		},

		renderItems: function () {
			if (this.state === null) return;
			let items = this.createItems(this.state);
			document.querySelector("#items").innerHTML = items;
		}
	}

	return {
		init: Methods.init.bind(Methods),
	}

})();

export default View;
