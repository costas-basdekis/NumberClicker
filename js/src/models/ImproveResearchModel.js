inherit(ImproveResearchModel, ResearchModel);
function ImproveResearchModel() {
	this.init.apply(this, arguments);
}

extend(ImproveResearchModel, [
	function init(args, game) {
		args = args || {};
		init._super(this)(args, game);
		this.target = args.target;
		this.renameTo = args.renameTo;
		this.rateMultiply = args.rateMultiply;
		this.rateAdd = args.rateAdd;
	},
	function research() {
		research._super(this)();
		var target = this.game.buyables[this.target];
		if (this.renameTo) {
			target.name(this.renameTo);
		}
		var oldRate = target.rate(), newRate;
		if (this.rateMultiply) {
			newRate = oldRate.scale(this.rateMultiply);
		} else if (this.rateAdd) {
			newRate = oldRate.add(this.rateAdd);
		}
		target.rate(newRate);
	},
]);
