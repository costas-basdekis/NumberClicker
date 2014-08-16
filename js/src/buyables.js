var helpers = {
	buildingWithUpgrades: function buildingWithUpgrades(buyables, data) {
		var prequisite = data.building.prequisite,
			enabled = data.building.enabled;

		if (data.prequisiteResearch) {
			var research = new ResearchModel({
				name: data.prequisiteResearch.name,
				caption: data.prequisiteResearch.caption,
				description: data.prequisiteResearch.description,
				cost: data.prequisiteResearch.cost,
				enabled: data.prequisiteResearch.enabled || function () {
					return true;
				},
			});
			buyables[data.prequisiteResearch.id] = research;
			prequisite = data.prequisiteResearch.id;
		}

		var building = new BuildingModel({
			name: data.building.name,
			cost: data.building.cost,
			rate: data.building.baseRate,
			enabled: enabled || function() {
				if (prequisite) {
					return this.buyables[prequisite].bought();
				} else {
					return true;
				}
			},
		});
		buyables[data.building.id] = building;

		var researchBaseCost = data.researches.baseCost,
			researchCostMultiplier = data.researches.costMultiplier;
		var researchCost = researchBaseCost;
		for (var i = 0, researchData ; researchData = data.researches.items[i] ; i++) {
			var research = new ImproveResearchModel({
				name: researchData.name,
				caption: researchData.caption,
				description: researchData.description,
				cost: researchCost,
				target: data.building.id,
				renameTo: researchData.renameTo,
				rateAdd: data.building.baseRate,
				enabled: (function (buildingsCountEnabled, prevResearch) {
					return function () {
						return (!prevResearch || prevResearch.bought()) &&
								(building.count() >= buildingsCountEnabled);
					};
				})(researchData.buildingsCountEnabled, prevResearch),
			}), prevResearch = research;
			buyables[researchData.id] = research;
		}
	},
};

var buyables = {};

// Naturals
helpers.buildingWithUpgrades(buyables, {
	prequisiteResearch: {
		id: 'count',
		name: 'Count',
		caption: 'Ah, ah, ah!',
		description: 'Buy numbers',
		cost: 2,
	},
	building: {
		id: 'naturals',
		name: 'Naturals',
		cost: 1.5,
		baseRate: 0.25,
	},
	researches: {
		baseCost: 3,
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
helpers.buildingWithUpgrades(buyables, {
	prequisiteResearch: {
		id: 'division',
		name: 'Division',
		caption: 'You can\'t eat a pie by yourself',
		description: 'Buy decimals',
		cost: 4,
		enabled: function() {
			return this.buyables.naturals.count() >= 10;
		},
	},
	building: {
		id: 'decimals',
		name: 'Decimals',
		cost: 4,
		baseRate: 1,
	},
	researches: {
		baseCost: 10,
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
				buildingsCountEnabled: 5,
			},
		],
	},
});

// Algebraics
helpers.buildingWithUpgrades(buyables, {
	prequisiteResearch: {
		id: 'polyonyms',
		name: 'Polyonyms',
		caption: 'Solve for x',
		description: 'Buy algebraics',
		cost: 8,
		enabled: function() {
			return this.buyables.decimals.count() >= 10;
		},
	},
	building: {
		id: 'algebraics',
		name: 'Algebraics',
		cost: 10,
		baseRate: 3.5,
	},
	researches: {
		baseCost: 25,
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
helpers.buildingWithUpgrades(buyables, {
	prequisiteResearch: {
		id: 'settheory',
		name: 'Set theory',
		caption: 'Like buying a number in a poke',
		description: 'Buy sets',
		cost: 16,
		enabled: function() {
			return this.buyables.algebraics.count() >= 10;
		},
	},
	building: {
		id: 'sets',
		name: 'Sets',
		cost: 25,
		baseRate: 10,
	},
	researches: {
		baseCost: 65,
		costMultiplier: 1.5,
		items: [
			{
				id: 'powersets',
				name: 'Powersets',
				caption: 'You can have sets of sets',
				description: '+10Hz for sets',
				renameTo: 'Powersets',
				buildingsCountEnabled: 2,
			},
			{
				id: 'frege',
				name: 'Frege',
				caption: 'Surely a set can and/or can\'t contain itself',
				description: '+10Hz for Powersets',
				buildingsCountEnabled: 5,
			},
			{
				id: 'russell',
				name: 'Bertrand Russell',
				caption: 'We don\'t need barbers where we\'re going',
				description: '+10Hz for Powersets',
				buildingsCountEnabled: 10,
			},
		],
	},
});
