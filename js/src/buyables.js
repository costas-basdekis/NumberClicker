var buyables = {
	count: new ResearchModel({
		name: 'Count',
		caption: 'Ah, ah, ah!',
		description: 'Buy numbers',
		cost: 2,
		enabled: function() {
			return true;
		},
	}),
	naturals: new BuildingModel({
		name: 'Naturals',
		cost: 1.5,
		rate: 0.25,
		enabled: function() {
			return this.buyables.count.bought();
		},}),
	integers: new ImproveResearchModel({
		name: 'Integers',
		caption: 'There are also negative numbers',
		description: '+0.5Hz for Naturals',
		cost: 3,
		target: 'naturals',
		renameTo: 'Integers',
		rateMultiply: 2,
		enabled: function(){
			return this.buyables.naturals.count() >= 2;
		},}),
	isomorphisms: new ImproveResearchModel({
		name: 'Isomorphisms',
		caption: 'There are many ways to slice the kibosh',
		description: '+0.5Hz for Integers',
		cost: 3,
		target: 'naturals',
		rateMultiply: 1.5,
		enabled: function(){
			return this.buyables.naturals.count() >= 5 &&
				   this.buyables.integers.bought();
		},}),
	division: new ResearchModel({
		name: 'Division',
		caption: 'You can\'t eat a pie by yourself',
		description: 'Buy decimals',
		cost: 4,
		enabled: function() {
			return this.buyables.naturals.count() >= 10;
		},
	}),
	decimals: new BuildingModel({
		name: 'Decimals',
		cost: 4,
		rate: 1,
		enabled: function() {
			return this.buyables.division.bought();
		},}),
	repeating: new ImproveResearchModel({
		name: 'Repeating decimals',
		caption: 'They don\'t end, but repeat, but repeat, but repeat...',
		description: '+1Hz for Decimals',
		cost: 10,
		target: 'decimals',
		renameTo: 'Repeating decimals',
		rateMultiply: 2,
		enabled: function(){
			return this.buyables.decimals.count() >= 2;
		},}),
	rationals: new ImproveResearchModel({
		name: 'Rationals',
		caption: 'Come to your senses, the denominator can be any integer',
		description: '+1Hz for Repeating decimals',
		cost: 15,
		target: 'decimals',
		renameTo: 'Rationals',
		rateMultiply: 1.5,
		enabled: function(){
			return this.buyables.decimals.count() >= 5 &&
				   this.buyables.repeating.bought();
		},}),
	polyonyms: new ResearchModel({
		name: 'Polyonyms',
		caption: 'Solve for x',
		description: 'Buy algebraics',
		cost: 8,
		enabled: function() {
			return this.buyables.decimals.count() >= 10;
		},
	}),
	algebraics: new BuildingModel({
		name: 'Algebraics',
		cost: 10,
		rate: 3.5,
		enabled: function() {
			return this.buyables.polyonyms.bought();
		},}),
	reals: new ImproveResearchModel({
		name: 'Reals',
		caption: 'Is this just fantasy?',
		description: '+3.5Hz for algebraics',
		cost: 25,
		target: 'algebraics',
		renameTo: 'Reals',
		rateMultiply: 2,
		enabled: function(){
			return this.buyables.algebraics.count() >= 2;
		},}),
	imaginaries: new ImproveResearchModel({
		name: 'Imaginaries',
		caption: 'Root of a negative? What a country...',
		description: '+3.5Hz for Reals',
		cost: 35,
		target: 'algebraics',
		renameTo: 'Imaginaries',
		rateMultiply: 1.5,
		enabled: function(){
			return this.buyables.algebraics.count() >= 5 &&
				   this.buyables.reals.bought();
		},}),
	settheory: new ResearchModel({
		name: 'Set theory',
		caption: 'Like buying a number in a poke',
		description: 'Buy sets',
		cost: 16,
		enabled: function() {
			return this.buyables.algebraics.count() >= 10;
		},
	}),
	sets: new BuildingModel({
		name: 'Sets',
		cost: 25,
		rate: 10,
		enabled: function() {
			return this.buyables.settheory.bought();
		},}),
	powersets: new ImproveResearchModel({
		name: 'Powersets',
		caption: 'You can have sets of sets',
		description: '+10Hz for sets',
		cost: 65,
		target: 'sets',
		renameTo: 'Powersets',
		rateMultiply: 2,
		enabled: function(){
			return this.buyables.sets.count() >= 2;
		},}),
	frege: new ImproveResearchModel({
		name: 'Frege',
		caption: 'Surely a set can and/or can\'t contain itself',
		description: '+10Hz for Powersets',
		cost: 85,
		target: 'sets',
		rateMultiply: 1.5,
		enabled: function(){
			return this.buyables.sets.count() >= 5 &&
				   this.buyables.powersets.bought();
		},}),
	russell: new ImproveResearchModel({
		name: 'Bertrand Russell',
		caption: 'We don\'t need barbers where we\'re going',
		description: '+10Hz for Powersets',
		cost: 110,
		target: 'sets',
		rateMultiply: 4/3,
		enabled: function(){
			return this.buyables.sets.count() >= 10 &&
				   this.buyables.frege.bought();
		},}),
};
