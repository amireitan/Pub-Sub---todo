const Actions = require("./actions.js");

const View = (function(){

	const Methods = {

		state: null,
		events: {},

		init: function () {
 			//Add Actions Handlers
 			Actions.on("items", this.onChange.bind(this));
		},

		setState: function (data){
			if (!data) return;

			this.state = data.reduce((prev, next) => {
				return prev.concat([next]);
			}, []);

			this.render();
		},

		eventsListeners: function(selector, actionType, eventHandler) {
			if (!this.events.selector) {
				document.querySelector(selector).addEventListener(actionType, eventHandler);
				this.events[selector] = actionType;
			}
		},

		removeListeners: function() {
			for (let prop in this.events) {
				document.querySelector(prop).removeEventListener(this.events[prop], prop)
			}
		},

		onChange: function (data) {
			console.log("%c View - Onchange function", "background: yellow");
			console.log("Data: ", data);
			this.state = null;
			this.setState(data);
		},

		onAddItem: function (e, item) {
			if (e) e.preventDefault();

			var imputTextVal = document.querySelector("#inputItem") && document.querySelector("#inputItem").value;

			var itemValue = item || imputTextVal;
			Actions.trigger("items.addItem", {category: itemValue});
		},

		onRemoveItem: function (e) {
			if (e.target && e.target.nodeName == "LI") {
				Actions.trigger("items.removeItem", {id: e.target.dataset.itemid});
			}
		},

		render: function () {
			if (this.state === null) return;
			this.removeListeners();

			var button = `<input type='submit' id='btnAdd' value='Add'>`;
			var search = `<input type='text' id='inputItem'/>`;

			var box = `<form> ${search} ${button} </form>`;

			var items = this.state.reduce((prev, next, index, array) => {
				prev += `<li data-itemId=${next.id}>
							Category: ${next.category.toUpperCase()}
						</li>`;
				return prev  += (index === array.length - 1) ? `</ul>` : "";

			}, `<ul id='itemsList'>`);

			document.querySelector("#container").innerHTML = box + items;

			//Adding EventListeners
			this.eventsListeners("#btnAdd", "click", this.onAddItem);
			this.eventsListeners("#itemsList", "click", this.onRemoveItem);
		}
	}

	Methods.init();

	return {
		init         : Methods.init,
		onChange     : Methods.onChange,
		onAddItem    : Methods.onAddItem,
		onRemoveItem : Methods.onRemoveItem,
	}

})();


module.exports = View;
