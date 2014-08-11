var buyables = {
	naturals: new BuildingModel({
		name: 'Naturals', cost: 1.5, rate: 0.25,
		enabled: function() {
			return true;
		},}),
	integers: new ImproveResearchModel({
		name: 'Integers', cost: 3, target: 'naturals',
		description: 'There are also negative numbers',
		renameTo: 'Integers', rateMultiply: 2,
		enabled: function(){
			return !this.buyables.integers.bought() &&
				   this.buyables.naturals.count() >= 2;
		},}),
	isomorphisms: new ImproveResearchModel({
		name: 'Isomorphisms', cost: 3, target: 'naturals',
		description: 'There are many ways to slice the kibosh',
		rateMultiply: 1.5,
		enabled: function(){
			return !this.buyables.isomorphisms.bought() &&
				   this.buyables.naturals.count() >= 5 &&
				   this.buyables.integers.bought();
		},}),
};
