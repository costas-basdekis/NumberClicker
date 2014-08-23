var resourcesList = [
	new ResourceModel({
		id: 'numbers', name: 'Numbers',
		sign: '#', rateSign: 'Hz',
		visible: true, initialAmount: 13.5,
	}),
];

var resources = {};
(function initResources(resourcesList, resources) {
	for (var i = 0, resource ; resource = resourcesList[i] ; i++) {
		resources[resource.id] = resource;
	}
})(resourcesList, resources);
