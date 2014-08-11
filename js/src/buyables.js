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
			return !this.buyables.integers.bought() &&
				   this.buyables.naturals.count() >= 2;
		},}),
	isomorphisms: new ImproveResearchModel({
		name: 'Isomorphisms',
		caption: 'There are many ways to slice the kibosh',
		description: '+0.5Hz for Integers',
		cost: 3,
		target: 'naturals',
		rateMultiply: 1.5,
		enabled: function(){
			return !this.buyables.isomorphisms.bought() &&
				   this.buyables.naturals.count() >= 5 &&
				   this.buyables.integers.bought();
		},}),
};
