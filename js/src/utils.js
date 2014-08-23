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
				_super._super = setAttribute._super;
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
