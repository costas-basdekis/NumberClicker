function NamedScalar() {
	this.init.apply(this, arguments);
}

extend(NamedScalar, [
	function init(data) {
		this.data = {};
		for (var id in data) {
			this.data[id] = data[id];
		}
	},
	function toString() {
		var data = this.data;
		return keys(this.data).map(function (e) {
			return e + ": " + compactRate(data[e]);
		}).join(', ');
	},
	function copy() {
		return new NamedScalar(this.data);
	},
	function add(rhs) {
		return this.copy().i_add(rhs);
	},
	function i_add(rhs) {
		for (var id in rhs.data) {
			this.data[id] = (this.data[id] || 0) + rhs.data[id];
		}

		return this;
	},
	function subtract(rhs) {
		return this.copy().i_subtract(rhs);
	},
	function i_subtract(rhs) {
		for (var id in rhs.data) {
			this.data[id] = (this.data[id] || 0) - rhs.data[id];
		}

		return this;
	},
	function scale(value) {
		return this.copy().i_scale(value);
	},
	function i_scale(value) {
		for (var id in this.data) {
			this.data[id] *= value;
		}

		return this;
	},
	function lte(rhs) {
		for (var id in this.data) {
			if (!(id in rhs.data)) {
				return false;
			}
			if (!(this.data[id] <= rhs.data[id])) {
				return false;
			}
		}

		return true;
	},
]);
