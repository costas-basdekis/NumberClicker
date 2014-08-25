function SaveManager() {
	this.init.apply(this, arguments);
}

extend(SaveManager, [
	function init() {
		this.slots = {};
	},
	function get(name, initial) {
		if (!(name in this.slots)) {
			this.slots[name] = ko.observable(initial);
		}

		return this.slots[name];
	},
	function itemType(item) {
		var type;
		if (item &&
			item.constructor &&
			item.constructor.name) {
			type = item.constructor.name;
		}

		if (!type || !(type in this.customIO)) {
			type = '<raw>';
		}

		return type;
	},
	function itemSaver(item) {
		var itemType = this.itemType(item);
		var io = this.customIO[itemType];
		var saver = io.saver;

		return saver;
	},
	function itemToSaveState(item) {
		var itemType = this.itemType(item);
		var saver = this.itemSaver(item);
		var saved = saver(item);

		return {
			type: itemType || '<raw>',
			value: saved,
		};
	},
	function itemLoader(state) {
		var itemType = state.type;
		var io = this.customIO[itemType];
		var loader = io.loader;

		return loader;
	},
	function itemFromSaveState(state) {
		var loader = this.itemLoader(state);
		var item = loader(state.value);

		return item;
	},
	function toSaveState() {
		var state = {}
		for (var name in this.slots) {
			var slot = this.get(name),
				slotValue = slot(),
				savedValue = this.itemToSaveState(slotValue);
			state[name] = savedValue;
		}

		return state;
	},
	function fromSaveState(state) {
		for (var name in state) {
			var savedValue = state[name];
			var slotValue = this.itemFromSaveState(savedValue);
			var slot = this.get(name, slotValue);
			slot(slotValue);
		}
	},
], {
	customIO: {
		'<raw>': {
			saver: function saver(item) {
				return item;
			},
			loader: function loader(saved) {
				return saved;
			},
		},
	},
});
extendStatic(SaveManager, [], {
	customIO: SaveManager.prototype.customIO,
})