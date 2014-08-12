var buyables = {
	naturals: new BuildingModel({
		name: 'Naturals',
		cost: 1.5,
		rate: 0.25,
		enabled: function() {
			return true;
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
	decimals: new BuildingModel({
		name: 'Decimals',
		cost: 4,
		rate: 1,
		enabled: function() {
			return this.buyables.naturals.count() >= 10;
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
	algebraics: new BuildingModel({
		name: 'Algebraics',
		cost: 10,
		rate: 3.5,
		enabled: function() {
			return this.buyables.decimals.count() >= 10;
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
};