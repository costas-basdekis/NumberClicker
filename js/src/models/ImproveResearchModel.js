inherit(ImproveResearchModel, ResearchModel);
function ImproveResearchModel() {
	this.init.apply(this, arguments);
}

extend(ImproveResearchModel, [
	function init(args, instanceObs) {
		init._super(this)(args, instanceObs);
		
		this.target = args.target;
		this.renameTo = args.renameTo;
		this.rateMultiply = args.rateMultiply;
		this.rateAdd = args.rateAdd;
	},
	function researchRename() {
		if (this.renameTo) {
			var target = this.instanceObs().buyables[this.target];
			target.name(this.renameTo);
		}
	},
	function researchReRate() {
		var target = this.instanceObs().buyables[this.target];
		var oldRate = target.rate(), newRate;
		if (this.rateMultiply) {
			newRate = oldRate.scale(this.rateMultiply);
		} else if (this.rateAdd) {
			newRate = oldRate.add(this.rateAdd);
		}
		target.rate(newRate);
	},
	function research() {
		research._super(this)();
		this.researchRename();
		this.researchReRate();
	},
]);
