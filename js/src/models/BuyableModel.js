function BuyableModel() {
	this.init.apply(this, arguments);
}

extend(BuyableModel, [
	function init(args, game) {
		args = args || {};
		this.originalName = args.name || "";
		this.name = ko.observable(this.originalName);
		this.cost = args.cost;
		this.enabled = args.enabled;
		this.game = game;
	},
	function canBuy() {
		return this.game.canBuy(this.cost);
	},
	function buy() {
		if (!this.canBuy()) {
			return false;
		}
		this.game.buy(this.cost);
		this.game.addBuyed(this);

		return true;
	},
]);
