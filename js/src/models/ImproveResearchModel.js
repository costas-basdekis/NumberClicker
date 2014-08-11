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
	},
	function research() {
		var target = this.game.buyables[this.target];
		if (this.renameTo) {
			target.name(this.renameTo);
		}
		var oldRate = target.rate(), newRate = oldRate * this.rateMultiply;
		target.rate(newRate);
		var deltaRate = newRate - oldRate;
		var deltaTotalRate = deltaRate * target.count();
		this.game.boost(deltaTotalRate);
		this.game.availables.remove(this);
	},
]);
