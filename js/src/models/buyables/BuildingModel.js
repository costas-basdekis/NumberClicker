inherit(BuildingModel, BuyableModel);
function BuildingModel() {
	this.init.apply(this, arguments);
}

extend(BuildingModel, [
	function init(args, game) {
		init._super(this)(args, game);
		
		this.makeSaveables({
			rate: args.rate,
		});
		this.totalRate = ko.computed(this.totalRateFunction.bind(this));
	},
	function availableFunction() {
		return this.enabled();
	},
	function totalRateFunction() {
		return this.rate().scale(this.count());
	},
	function productionCycle(resources) {
		var rate = this.rate(), totalRate = this.totalRate();
		// No buildings
		if (this.count() == 0) {
			return;
		}
		// Get resources that need to be consumed
		var consumables = items(rate.data).filter(function(e) {
			return e.value < 0;
		});
		// Get the max amount that can be consumed
		var counts = consumables.map(function (e) {
			return Math.floor((resources.data[e.key] || 0) / (-e.value));
		});
		if (counts.length) {
			// Consume as many as we can
			var count = [this.count(), counts.min()].min();
			if (count <= 0) {
				return;
			}
			totalRate = rate.scale(count);
		}
		resources.i_add(totalRate);
	},
], {
	availableTemplate: 'availableBuildingTemplate',
	buyedTemplate: 'buyedBuildingTemplate',
});
