inherit(ResearchModel, BuyableModel);
function ResearchModel() {
	this.init.apply(this, arguments);
}

extend(ResearchModel, [
	function init(args, game) {
		init._super(this)(args, game);
		
		this.caption = args.caption;
		this.description = args.description;
	},
	function canBuy() {
		if (!canBuy._super(this)()) {
			return false;
		}

		return !this.bought();
	},
	function canSell(){
		return false;
	},
	function buy() {
		if (!buy._super(this)()) {
			return;
		}

		this.research();
	},
	function availableFunction() {
		return this.enabled() && !this.bought();
	},
	function research() {
		//
	},
], {
	availableTemplate: 'availableResearchTemplate',
	buyedTemplate: 'buyedResearchTemplate',
});
