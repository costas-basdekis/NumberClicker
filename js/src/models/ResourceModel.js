function ResourceModel() {
	this.init.apply(this, arguments);
}

extend(ResourceModel, [
	function init(args, instanceObs) {
		this.instanceObs = instanceObs;

		this.id = args.id;
		this.name = args.name;
		this.amount = ko.observable(args.initialAmount || 0);
		this.sign = args.sign || this.name;
		this.rateSign = args.rateSign || this.sign + '/s';
		this.rate = ko.computed(this.rateFunction.bind(this));
		this.visible = koEx.oneWayToggle(this.visibleFunction.bind(this), true);
	},
	function rateFunction() {
		var instance = this.instanceObs();
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
