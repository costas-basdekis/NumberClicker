inherit(BuyableModel, Model);
function BuyableModel() {
	this.init.apply(this, arguments);
}

extend(BuyableModel, [
	function init(args, game) {
		init._super(this)(args, game);

		this.originalName = args.name || "";
		this.makeSaveables({
			name: this.originalName,
			count: 0,
		});

		this.cost = args.cost;
		this.enabled = args.enabled;
		this.bought = ko.computed(this.boughtFunction.bind(this));
		if (args.enabledFunction) {
			this.enabledFunction = args.enabledFunction;
		}
		this.enabled = koEx.oneWayToggle(this.enabledFunction.bind(this), true);
		this.available = ko.computed(this.availableFunction.bind(this));
	},
	function canBuy() {
		var instance = this.game.instance()
		if (!instance) {
			return false;
		}
		
		return this.game.instance().canBuy(this.cost);
	},
	function buy() {
		if (!this.canBuy()) {
			return false;
		}
		this.game.instance().buy(this.cost);
		this.count(this.count() + 1);

		return true;
	},
	function canSell() {
		return this.count() > 0;
	},
	function sell() {
		if (!this.canSell()) {
			return;
		}
		this.game.instance().sell(this.cost);
		this.count(this.count() - 1);
	},
	function boughtFunction() {
		return this.count() > 0;
	},
	function enabledFunction() {
		return false;
	},
	function availableFunction() {
		return false;
	},
]);
