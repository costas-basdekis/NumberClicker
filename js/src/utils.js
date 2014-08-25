function elById(id) {
	return document.getElementById(id);
}
function inherit(type, superType) {
	for (var name in superType.prototype) {
		var attribute = superType.prototype[name];
		type.prototype[name] = attribute;
	}

	return type;
}
function extend(type, attributes, namedAttributes) {
	function setAttribute(name, attribute) {
		if (name in type.prototype) {
			attribute._super = (function(superAttribute) {
				function _super(self) {
					return superAttribute.bind(self);
				};
				return _super;
			})(type.prototype[name]);
		}
		type.prototype[name] = attribute;
	}

	for (var i in attributes) {
		var attribute = attributes[i];
		setAttribute(attribute.name, attribute);
	}
	for (var name in namedAttributes) {
		var attribute = namedAttributes[name];
		setAttribute(name, attribute);
	}
	return type;
}
function extendStatic(type, attributes, namedAttributes) {
	function setAttribute(name, attribute) {
		if (type.hasOwnProperty(name)) {
			attribute._super = (function(superAttribute) {
				function _super() {
					return superAttribute.bind(type);
				};
				return _super;
			})(type[name]);
		}
		type[name] = attribute;
	}

	for (var i in attributes) {
		var attribute = attributes[i];
		setAttribute(attribute.name, attribute);
	}
	for (var name in namedAttributes) {
		var attribute = namedAttributes[name];
		setAttribute(name, attribute);
	}
	return type;
}

function compactNumber(number, maxAfterComma) {
	if (maxAfterComma == undefined) {
		maxAfterComma = 2;
	}
	var suffix = '';
	var suffixes = 'KMGTPEHOND';
	for (var i = 0, suf ; suf = suffixes[i] ; i++) {
		if (number < 1000) {
			break;
		}
		number = number / 1000;
		suffix = suf;
	}
	var integral = parseInt(number), integralLength = integral.toString().length;
	var afterComma = integralLength > maxAfterComma + 1 ? 0 : maxAfterComma + 1 - integralLength;
	var pow = Math.pow(10, afterComma);
	number = parseInt(number * pow) / pow;
	return number + suffix;
}

function compactRate(number, maxAfterComma) {
	var compact = compactNumber(number, maxAfterComma);

	if (number > 0) {
		return '+' + compact;
	} else {
		return compact;
	}
}

// Polyfill
function keys(obj) {
	var keys = [];
	for (var key in obj) {
		if (obj.hasOwnProperty(key)) {
			keys.push(key);
		}
	}

	return keys;
}

function dictFromList(list, keyName) {
	keyName = keyName || 'id';

	var dict = {};
	for (var i = 0, item ; item = list[i] ; i++) {
		var key = item[keyName];
		dict[key] = item;
	}

	return dict;
}

/* KO computed that updates until it equals a sentinel value */
ko.oneWayToggle = function oneWayToggle(func, sentinel) {
	if (arguments.length < 2) {
		throw new Error('You must specify a sentinel for oneWayToggle');
	}

	var toggled = false;
	var toggle = ko.computed(function() {
		if (toggled) {
			return sentinel;
		}

		var newValue = func();
		toggled = (newValue === sentinel);

		return newValue;
	});

	return toggle;
};
