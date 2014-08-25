inherit(BuildingModel, BuyableModel);
function BuildingModel() {
	this.init.apply(this, arguments);
}

extend(BuildingModel, [
	function init(args, instanceObs) {
		init._super(this)(args, instanceObs);
		
		this.rate = ko.observable(args.rate);
		this.totalRate = ko.computed(this.totalRateFunction.bind(this));
		this.resourceId = args.resourceId;
	},
	function availableFunction() {
		return this.enabled();
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
