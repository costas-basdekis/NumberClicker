function Model() {
	this.init.apply(this, arguments);
}

extend(Model, [
	function init(args, game) {
		this.game = game;
		this.id = args.id;
	},
	function itemStateNamespace() {
		return this.constructor.name + '.' + this.id
	},
	function stateName(name) {
		return this.itemStateNamespace() + ':' + name;
	},
	function saveable(name, initial) {
		var stateName = this.stateName(name);
		return this.game.saveManager.get(stateName, initial);
	},
	function makeSaveable(name, initial) {
		this[name] = this.saveable(name, initial);
	},
	function makeSaveables(data) {
		for (var name in data) {
			var initial = data[name];
			this.makeSaveable(name, initial);
		}
	},
]);
