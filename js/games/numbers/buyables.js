(function numbersBuyablesInit(game) {
	game.buyablesList = [];

	// Naturals
	buyableHelpers.buildingWithUpgrades(game, {
		prequisiteResearch: {
			id: 'count',
			name: 'Count',
			caption: 'Ah, ah, ah!',
			description: 'Buy numbers',
			cost: new Resources({numbers: 2}),
		},
		building: {
			id: 'naturals',
			name: 'Naturals',
			cost: new Resources({numbers: 1.5}),
			baseRate: new Resources({numbers: 0.25}, true),
		},
		researches: {
			baseCost: new Resources({numbers: 3}),
			costMultiplier: 1.5,
			items: [
				{
					id: 'integers',
					name: 'Integers',
					caption: 'There are also negative numbers',
					description: '+0.5Hz for Naturals',
					renameTo: 'Integers',
					buildingsCountEnabled: 2,
				},
				{
					id: 'isomorphisms',
					name: 'Isomorphisms',
					caption: 'There are many ways to slice the kibosh',
					description: '+0.5Hz for Integers',
					buildingsCountEnabled: 5,
				},
			],
		},
	});

	// Decimals
	buyableHelpers.buildingWithUpgrades(game, {
		prequisiteResearch: {
			id: 'division',
			name: 'Division',
			caption: 'You can\'t eat a pie by yourself',
			description: 'Buy decimals',
			cost: new Resources({numbers: 4}),
			enabledFunction: function() {
				var instance = this.game.instance();
				if (!instance) {
					return false;
				}

				return instance.buyables.naturals.count() >= 10;
			},
		},
		building: {
			id: 'decimals',
			name: 'Decimals',
			cost: new Resources({numbers: 4}),
			baseRate: new Resources({numbers: 1}, true),
		},
		researches: {
			baseCost: new Resources({numbers: 10}),
			costMultiplier: 1.5,
			items: [
				{
					id: 'repeating',
					name: 'Repeating decimals',
					caption: 'They don\'t end, but repeat, but repeat, but repeat...',
					description: '+1Hz for Decimals',
					renameTo: 'Repeating decimals',
					buildingsCountEnabled: 2,
				},
				{
					id: 'rationals',
					name: 'Rationals',
					caption: 'Come to your senses, the denominator can be any integer',
					description: '+1Hz for Repeating decimals',
					renameTo: 'Rationals',
					buildingsCountEnabled: 5,
				},
			],
		},
	});

	// Algebraics
	buyableHelpers.buildingWithUpgrades(game, {
		prequisiteResearch: {
			id: 'polyonyms',
			name: 'Polyonyms',
			caption: 'Solve for x',
			description: 'Buy algebraics',
			cost: new Resources({numbers: 8}),
			enabledFunction: function() {
				var instance = this.game.instance();
				if (!instance) {
					return false;
				}

				return instance.buyables.decimals.count() >= 10;
			},
		},
		building: {
			id: 'algebraics',
			name: 'Algebraics',
			cost: new Resources({numbers: 10}),
			baseRate: new Resources({numbers: 3.5}, true),
		},
		researches: {
			baseCost: new Resources({numbers: 25}),
			costMultiplier: 1.5,
			items: [
				{
					id: 'reals',
					name: 'Reals',
					caption: 'Is this just fantasy?',
					description: '+3.5Hz for algebraics',
					renameTo: 'Reals',
					buildingsCountEnabled: 2,
				},
				{
					id: 'imaginaries',
					name: 'Imaginaries',
					caption: 'Root of a negative? What a country...',
					description: '+3.5Hz for Reals',
					renameTo: 'Imaginaries',
					buildingsCountEnabled: 5,
				},
			],
		},
	});

	// Sets
	buyableHelpers.buildingWithUpgrades(game, {
		prequisiteResearch: {
			id: 'settheory',
			name: 'Set theory',
			caption: 'Like buying a number in a poke',
			description: 'Buy sets',
			cost: new Resources({numbers: 1000}),
			enabledFunction: function() {
				var instance = this.game.instance();
				if (!instance) {
					return false;
				}

				return instance.resources.numbers.amount() >= 500;
			},
		},
		building: {
			id: 'sets',
			name: 'Sets',
			cost: new Resources({numbers: 1500}),
			baseRate: new Resources({sets: 1}, true),
		},
		researches: {
			baseCost: new Resources({numbers: 3000}),
			costMultiplier: 1.5,
			items: [
				{
					id: 'powersets',
					name: 'Powersets',
					caption: 'You can have sets of sets',
					description: '+10&cup; for sets',
					renameTo: 'Powersets',
					buildingsCountEnabled: 2,
				},
				{
					id: 'frege',
					name: 'Frege',
					caption: 'Surely a set can and/or can\'t contain itself',
					description: '+10&cup; for Powersets',
					buildingsCountEnabled: 5,
				},
				{
					id: 'russell',
					name: 'Bertrand Russell',
					caption: 'We don\'t need barbers where we\'re going',
					description: '+10&cup; for Powersets',
					buildingsCountEnabled: 10,
				},
			],
		},
	});

	// Functions
	buyableHelpers.buildingWithUpgrades(game, {
		prequisiteResearch: {
			id: 'map',
			name: 'Map',
			caption: 'What goes where',
			description: 'Buy functions',
			cost: new Resources({numbers: 10000}),
			enabledFunction: function() {
				var instance = this.game.instance();
				if (!instance) {
					return false;
				}

				return instance.resources.numbers.amount() >= 5000;
			},
		},
		building: {
			id: 'functions',
			name: 'Functions',
			cost: new Resources({numbers: 15000}),
			baseRate: new Resources({functions: 1}, true),
		},
		researches: {
			baseCost: new Resources({numbers: 30000}),
			costMultiplier: 1.5,
			items: [
				{
					id: 'continuous',
					name: 'Continuous Functions',
					caption: 'Bridge that gap',
					description: '+1&part; for Functions',
					renameTo: 'Continuous Functions',
					buildingsCountEnabled: 2,
				},
				{
					id: 'differentiable',
					name: 'Differentiable Functions',
					caption: 'Smooth operator',
					description: '+1&part; for Continuous Functions',
					renameTo: 'Differentiable Functions',
					buildingsCountEnabled: 5,
				},
			],
		},
	});

	// Integrals
	buyableHelpers.buildingWithUpgrades(game, {
		prequisiteResearch: {
			id: 'integration',
			name: 'Integration',
			caption: 'A lot of tiny additions, give huge sums',
			description: 'Buy integrals',
			cost: new Resources({sets: 200, functions: 200}),
			enabledFunction: function() {
				var instance = this.game.instance();
				if (!instance) {
					return false;
				}

				return (instance.resources.sets.amount() >= 100) &&
					   (instance.resources.functions.amount() >= 100);
			},
		},
		building: {
			id: 'integrals',
			name: 'Integrals',
			cost: new Resources({sets: 400, functions: 400}),
			baseRate: new Resources({sets: -10, functions: -10, integrals: 10}, true),
		},
		researches: {
			baseCost: new Resources({sets: 750, functions: 750}),
			costMultiplier: 1.5,
			items: [
				{
					id: 'doubleIntegrals',
					name: 'Double Integrals',
					caption: 'Buy one dimension, get one free',
					description: '-10&cup;, -10&part, +10&nabla; for Integrals',
					renameTo: 'Double Integrals',
					buildingsCountEnabled: 2,
				},
				{
					id: 'tripleIntegrals',
					name: 'Triple Integrals',
					caption: '3D is the future',
					description: '-10&cup;, -10&part, +10&nabla; for Double Integrals',
					renameTo: 'Triple Integrals',
					buildingsCountEnabled: 5,
				},
			],
		},
	});
	game.buyables = dictFromList(game.buyablesList);

	game.buyablesList.push(new ImproveResearchModel({
		id: 'reimann',
		name: 'Reimann',
		caption: 'The integrals middle name is Bernhard',
		description: '+30&nabla;',
		cost: new Resources({sets: 1750, functions: 1750}),
		target: 'integrals',
		rateAdd: new Resources({integrals: 30}, true),
		enabledFunction: function () {
			return game.buyables.tripleIntegrals.bought() &&
				   (game.buyables.integrals.count() >= 20);
		},
	}, game));

	game.buyables = dictFromList(game.buyablesList);
})(games.numbers);
