inherit(ResearchModel, BuyableModel);
function ResearchModel() {
	this.init.apply(this, arguments);
}

extend(ResearchModel, [
	function init(args, game) {
		args = args || {};
		init._super(this)(args, game);
		this.caption = args.caption;
		this.description = args.description;
		this.bought = ko.observable(false);
	},
	function canBuy() {
		if (!canBuy._super(this)()) {
			return false;
		}
		return !this.bought();
	},
	function buy() {
		if (!buy._super(this)()) {
			return;
		}
		this.research();
		this.bought(true);
	},
	function research() {
		this.game.availables.remove(this);
	},
], {
	availableTemplate: 'availableResearchTemplate',
	buyedTemplate: 'buyedResearchTemplate',
});
