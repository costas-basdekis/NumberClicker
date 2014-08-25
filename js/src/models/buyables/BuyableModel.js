function BuyableModel() {
	this.init.apply(this, arguments);
}

extend(BuyableModel, [
	function init(args, instanceObs) {
		this.instanceObs = instanceObs;

		this.originalName = args.name || "";
		this.id = args.id;
		this.name = ko.observable(this.originalName);
		this.cost = args.cost;
		this.enabled = args.enabled;
		this.count = ko.observable(0);
		this.bought = ko.computed(this.boughtFunction.bind(this));
		if (args.enabledFunction) {
			this.enabledFunction = args.enabledFunction;
		}
		this.enabled = koEx.oneWayToggle(this.enabledFunction.bind(this), true);
		this.available = ko.computed(this.availableFunction.bind(this));
	},
	function canBuy() {
		var instance = this.instanceObs()
		if (!instance) {
			return false;
		}
		
		return this.instanceObs().canBuy(this.cost);
	},
	function buy() {
		if (!this.canBuy()) {
			return false;
		}
		this.instanceObs().buy(this.cost);
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
		this.instanceObs().sell(this.cost);
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
