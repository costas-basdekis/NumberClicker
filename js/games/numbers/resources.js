(function numbersBuyablesInit(game) {
	game.resourcesList = [
		new ResourceModel({
			id: 'numbers', name: 'Numbers',
			sign: '#', rateSign: 'Hz',
			initialAmount: 13.5,
		}, game.instance),
		new ResourceModel({
			id: 'functions', name: 'Functions',
			sign: '&fnof;', rateSign: '&part;',
		}, game.instance),
	];

	game.resources = dictFromList(game.resourcesList);
})(games.numbers);
