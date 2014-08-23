inherit(BuildingModel, BuyableModel);
function BuildingModel() {
	this.init.apply(this, arguments);
}

extend(BuildingModel, [
	function init(args, game) {
		args = args || {};
		init._super(this)(args, game);
		this.rate = ko.observable(args.rate);
		this.count = ko.observable(0);
		this.totalRate = ko.computed(this.totalRateFunction.bind(this));
		this.resourceId = args.resourceId;
	},
	function buy() {
		if (!buy._super(this)()) {
			return;
		}
		this.count(this.count() + 1);
	},
	function canSell() {
		return this.count() > 0;
	},
	function sell() {
		if (!this.canSell()) {
			return;
		}
		this.game.sell(this.cost);
		this.count(this.count() - 1);
		if (!this.count()) {
			this.game.buyed.remove(this);
		}
	},
	function totalRateFunction() {
		return this.rate().scale(this.count());
	},
	function productionCycle(resources) {
		var totalRate = this.totalRate();
		resources.i_add(totalRate);
	},
], {
	availableTemplate: 'availableBuildingTemplate',
	buyedTemplate: 'buyedBuildingTemplate',
});
