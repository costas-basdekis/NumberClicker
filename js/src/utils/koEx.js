/*
	Custom KO extensions
*/

var koEx = (function initKOEx(ko) {
	var koEx = {};

	/* KO computed that updates until it equals a sentinel value */
	koEx.oneWayToggle = function oneWayToggle(func, sentinel) {
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

	return koEx;
})(ko);
