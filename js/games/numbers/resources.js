(function numbersBuyablesInit(game) {
	game.resourcesList = [
		new ResourceModel({
			id: 'numbers', name: 'Numbers',
			sign: '#', rateSign: 'Hz',
			initialAmount: 13.5,
		}, game),
		new ResourceModel({
			id: 'functions', name: 'Functions',
			sign: '&fnof;', rateSign: '&part;',
		}, game),
	];

	game.resources = dictFromList(game.resourcesList);
})(games.numbers);
