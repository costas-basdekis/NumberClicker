inherit(ResourceModel, Model);
function ResourceModel() {
	this.init.apply(this, arguments);
}

extend(ResourceModel, [
	function init(args, game) {
		init._super(this)(args, game);

		this.makeSaveables({
			amount: args.initialAmount || 0,
		});

		this.name = args.name;
		this.sign = args.sign || this.name;
		this.rateSign = args.rateSign || this.sign + '/s';
		this.rate = ko.computed(this.rateFunction.bind(this));
		this.visible = koEx.oneWayToggle(this.visibleFunction.bind(this), true);
	},
	function rateFunction() {
		var instance = this.game.instance();
		if (!instance) {
			return 0;
		}

		var resourcesRates = instance.resourcesRates();

		if (!(this.id in resourcesRates.data)) {
			return 0;
		}

		return resourcesRates.data[this.id];
	},
	function visibleFunction() {
		return !!this.amount() || !!this.rate();
	},
]);
