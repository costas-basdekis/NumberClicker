function GameModel() {
	this.init.apply(this, arguments);
}

extend(GameModel, [
	function init() {
		this.buyed = ko.observableArray([]);
		this.availables = ko.observableArray([]);

		this.buyables = buyables;
		this.initBuyables();

		this.resourcesList = resourcesList;
		this.resources = resources;
		this.resourcesVisible = ko.computed(this.resourcesVisibleFunction.bind(this));
		this.resourcesAsDict = ko.computed(this.resourcesAsDictFunction.bind(this));
		this.resourcesRates = ko.computed(this.resourcesRatesFunction.bind(this));
		this.initResources();
	},
	function initBuyables() {
		var game = this;

		var gameStarted = ko.observable(false);

		function getEnabledComputed(buyableEnabled) {
			return ko.computed(function enabledComputed() {
				return gameStarted() && buyableEnabled();
			});
		}
		function addBuyableOnEnabled(buyable) {
			var added = false;
			buyable.enabled.subscribe(function onEnabledChange(newValue) {
				if (!added) {
					game.availables.push(buyable);
					added = true;
				}
			}, 'change');
		}

		for (var name in buyables) {
			var buyable = buyables[name];
			buyable.enabled = getEnabledComputed(buyable.enabled);
			addBuyableOnEnabled(buyable);
			buyable.game = this;
			this.buyables[name] = buyable;
		}

		gameStarted(true);
	},
	function initResources() {
		var resourcesList = this.resourcesList;
		for (var i = 0, resource ; resource = resourcesList[i] ; i++) {
			resources[resource.id] = resource;
			resource.setGame(this);
		}
	},
	function resourcesVisibleFunction() {
		var resourcesList = this.resourcesList;
		var resourcesVisible = [];
		for (var i = 0, resource ; resource = resourcesList[i] ; i++) {
			if (resource.visible()) {
				resourcesVisible.push(resource);
			}
		}

		return resourcesVisible;
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
	function resourcesAsDictFunction() {
		var resourcesList = this.resourcesVisible();
		return new Resources().i_fromResourcesList(resourcesList);
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
	function addBuyed(item) {
		if (this.buyed.indexOf(item) == -1) {
			this.buyed.push(item);
		}
	},
	function resourcesRatesFunction() {
		var resourcesAmounts = this.resourcesAsDictFunction(),
			newResourcesAmounts = resourcesAmounts.copy();

		var availables = this.availables();
		for (var i = 0, buyable ; buyable = availables[i] ; i++) {
			if (buyable.productionCycle) {
				buyable.productionCycle(newResourcesAmounts);
			}
		}

		var resourcesRates = newResourcesAmounts.subtract(resourcesAmounts);

		return resourcesRates
	},
]);
