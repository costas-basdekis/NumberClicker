function GameModel() {
	this.init.apply(this, arguments);
}

extend(GameModel, [
	function init(game) {
		this.buyables = game.buyables;
		this.buyablesList = game.buyablesList;
		this.buyablesBought = ko.computed(this.buyablesBoughtFunction.bind(this));
		this.buyablesAvailable = ko.computed(this.buyablesAvailableFunction.bind(this));

		this.resources = game.resources;
		this.resourcesList = game.resourcesList;
		this.resourcesVisible = ko.computed(this.resourcesVisibleFunction.bind(this));
		this.resourcesAsDict = ko.computed(this.resourcesAsDictFunction.bind(this));
		this.resourcesRates = ko.computed(this.resourcesRatesFunction.bind(this));

		game.instance(this);
	},
	function buyablesBoughtFunction() {
		return this.buyablesList.filter(function(buyable) {
			return buyable.bought();
		});
	},
	function buyablesAvailableFunction() {
		return this.buyablesList.filter(function(buyable) {
			return buyable.available();
		});
	},
	function resourcesVisibleFunction() {
		return this.resourcesList.filter(function(resource) {
			return resource.visible();
		});
	},
	function resourcesAsDictFunction() {
		var resourcesList = this.resourcesVisible();
		return Resources.fromResourcesList(resourcesList);
	},
	function resourcesRatesFunction() {
		var resourcesAmounts = this.resourcesAsDictFunction(),
			newResourcesAmounts = resourcesAmounts.copy();

		var buyablesAvailable = this.buyablesAvailable();
		for (var i = 0, buyable ; buyable = buyablesAvailable[i] ; i++) {
			if (buyable.productionCycle) {
				buyable.productionCycle(newResourcesAmounts);
			}
		}

		var resourcesRates = newResourcesAmounts.subtract(resourcesAmounts);

		return resourcesRates
	},
	function tick() {
		var resourcesRates = this.resourcesRates();
		var resources = this.resourcesAsDict();
		resources.i_add(resourcesRates);
		resources.toResources(this.resources);
	},
	function tick_start(interval) {
		this.tick_stop();
		this.tick.interval = setInterval(this.tick.bind(this), interval || 1000);
	},
	function tick_stop() { 
		this.tick.interval = clearInterval(this.tick.interval);
	},
	function canBuy(cost) {
		var resourcesDict = this.resourcesAsDict();
		return cost.lte(resourcesDict);
	},
	function buy(cost) {
		var resources = this.resourcesAsDictFunction();
		resources.i_subtract(cost);
		resources.toResources(this.resources);
	},
	function sell(cost) {
		var resources = this.resourcesAsDictFunction();
		resources.i_add(cost);
		resources.toResources(this.resources);
	},
]);
