inherit(Resources, NamedScalar);
function Resources() {
	this.init.apply(this, arguments);
}

extend(Resources, [
	function fromResourcesList(resourcesList) {
		return this._copy().i_fromResourcesList(resourcesList);
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
