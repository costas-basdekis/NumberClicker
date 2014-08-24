var resourcesList = [
	new ResourceModel({
		id: 'numbers', name: 'Numbers',
		sign: '#', rateSign: 'Hz',
		visible: true, initialAmount: 13.5,
	}),
	new ResourceModel({
		id: 'functions', name: 'Functions',
		sign: '&fnof;', rateSign: '&part;',
		visible: true, initialAmount: 13.5,
	}),
];

var resources = resourcesFromList(resourcesList);
