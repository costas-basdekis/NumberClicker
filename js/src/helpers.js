var buyableHelpers = {
	buildingWithUpgrades: function buildingWithUpgrades(game, data) {
		var buyablesList = game.buyablesList;

		var prequisite = data.building.prequisite,
			enabledFunction = data.building.enabledFunction;

		if (data.prequisiteResearch) {
			var research = new ResearchModel({
				id: data.prequisiteResearch.id,
				name: data.prequisiteResearch.name,
				caption: data.prequisiteResearch.caption,
				description: data.prequisiteResearch.description,
				cost: data.prequisiteResearch.cost.copy(),
				enabledFunction: data.prequisiteResearch.enabledFunction || function () {
					return true;
				},
			}, game);
			buyablesList.push(research);
			prequisite = data.prequisiteResearch.id;
		}

		var building = new BuildingModel({
			id: data.building.id,
			name: data.building.name,
			cost: data.building.cost.copy(),
			rate: data.building.baseRate.copy(),
			enabledFunction: enabledFunction || function() {
				var instance = this.game.instance();
				if (!instance) {
					return false;
				}

				if (prequisite) {
					return instance.buyables[prequisite].bought();
				} else {
					return true;
				}
			},
		}, game);
		buyablesList.push(building);

		var researchBaseCost = data.researches.baseCost,
			researchCostMultiplier = data.researches.costMultiplier;
		var researchCost = researchBaseCost.copy();
		for (var i = 0, researchData ; researchData = data.researches.items[i] ; i++) {
			var research = new ImproveResearchModel({
				id: researchData.id,
				name: researchData.name,
				caption: researchData.caption,
				description: researchData.description,
				cost: researchCost.copy(),
				target: data.building.id,
				renameTo: researchData.renameTo,
				rateAdd: data.building.baseRate,
				enabledFunction: (function (buildingsCountEnabled, prevResearch) {
					return function () {
						return (!prevResearch || prevResearch.bought()) &&
								(building.count() >= buildingsCountEnabled);
					};
				})(researchData.buildingsCountEnabled, prevResearch),
			}, game), prevResearch = research;
			buyablesList.push(research);

			researchCost.i_scale(researchCostMultiplier);
		}
	},
};
