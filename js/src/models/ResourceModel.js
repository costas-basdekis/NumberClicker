function ResourceModel() {
	this.init.apply(this, arguments);
}

extend(ResourceModel, [
	function init(args) {
		args = args || {};
		this.id = args.id;
		this.name = args.name;
		this.amount = ko.observable(args.initialAmount || 0);
		this.visible = ko.observable(args.visible ? true : false);
		this.sign = args.sign || '';
		this.rateSign = args.rateSign || this.sign + '/s';
	},
	function setGame(game) {
		this.game = game;
		this.rate = ko.computed(this.rateFunction.bind(this));
	},
	function rateFunction() {
		return this.game.resourcesRates().data[this.id];
	},
]);
