function GameModel() {
	this.init.apply(this, arguments);
}

extend(GameModel, [
	function init() {
		this.number = ko.observable(0);
		this.buyed = ko.observableArray([]);
		this.availables = ko.observableArray([]);
		var self = this;
		this.numberRate = ko.computed(function () {
			var rate = 1;

			var availables = self.availables()

			for (var i = 0, buyable ; buyable = availables[i] ; i++) {
				if (buyable.rate && buyable.count) {
					rate += buyable.rate() * buyable.count();
				}
			}

			return rate;
		});
		this.buyables = buyables;
		this.initBuyables();
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
	function tick() {
		this.number(this.number() + this.numberRate());
	},
	function tick_start(interval) {
		this.tick_stop();
		this.tick.interval = setInterval(this.tick.bind(this), interval || 1000);
	},
	function tick_stop() { 
		this.tick.interval = clearInterval(this.tick.interval);
	},
	function canBuy(cost) {
		return this.number() >= cost;
	},
	function buy(cost) {
		this.number(this.number() - cost);
	},
	function sell(cost) {
		this.number(this.number() + cost);
	},
	function addBuyed(item) {
		if (this.buyed.indexOf(item) == -1) {
			this.buyed.push(item);
		}
	},
]);
