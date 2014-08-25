/*
	Custom JS extensions, to reduce boilerplate, polyfil, etc.
*/

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

/*
	Same as Python's {}.keys()
*/
function keys(obj) {
	var keys = [];
	for (var key in obj) {
		if (obj.hasOwnProperty(key)) {
			keys.push(key);
		}
	}

	return keys;
}
