inherit(Resources, NamedScalar);
function Resources() {
	this.init.apply(this, arguments);
}

extend(Resources, [
	function init(data, isRate) {
		init._super(this)(data);
		this.isRate = !!isRate;
	},
	function copy() {
		var result = copy._super(this)();
		result.isRate = this.isRate;
		
		return result;
	},
	function resourceToString(resource) {
		var resourceObject = this.resourcesObject && this.resourcesObject[resource];
		if (!resourceObject) {
			return resourceToString._super(this)(resource);
		}

		var value = this.data[resource];
		var compactValue = this.isRate ? compactRate(value) : compactNumber(value);
		var sign = this.isRate ? resourceObject.rateSign : resourceObject.sign;
		return compactValue + sign;
	},
	function i_fromResourcesList(resourcesList) {
		var resourcesDict = this.data = {};

		for (var i = 0, resource ; resource = resourcesList[i] ; i++) {
			resourcesDict[resource.id] = resource.amount();
		}

		return this;
	},
	function toResources(resources) {
		for (id in this.data) {
			var resource = resources[id];
			resource.amount(this.data[id]);
		}

		return this;
	},
]);
extendStatic(Resources, [
	function fromResourcesList(resourcesList) {
		return new this({}).i_fromResourcesList(resourcesList);
	},
	function saver(item) {
		return  item;
	},
	function loader(state) {
		return new this(state.data, state.isRate);
	},
]);

SaveManager.customIO[Resources.name] = {
	saver: Resources.saver.bind(Resources),
	loader: Resources.loader.bind(Resources),
};
