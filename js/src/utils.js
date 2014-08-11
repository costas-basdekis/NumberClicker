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
