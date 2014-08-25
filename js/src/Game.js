function Game() {
	this.init.apply(this, arguments);
}

extend(Game, [
	function init(data) {
		this.instance = ko.observable(null);
		this.saveManager = new SaveManager();
		this.meta = {
			name: data.name || 'Unnamed',
			creator: data.creator || 'Unknown',
			dateCreated: data.dateCreated || new Date(),
			dateUpdated: data.Updated || new Date(),
			uuid: data.uuid || null,
			vesrion: data.version || null,
			oldestLoadableVersion: data.oldestLoadableVersion || data.version || null,
		};
	},
	function toSaveState() {
		var state = this.saveManager.toSaveState();
		var jstate = JSON.stringify(state);
		var b64 = utf8_to_b64(jstate);

		return b64;
	},
	function fromSaveState(b64) {
		var jstate = b64_to_utf8(b64);
		var state = JSON.parse(jstate);
		return state;
	},
	function toSave() {
		return JSON.stringify({
			meta: this.meta,
			state: this.toSaveState(),
		})
	},
	function validateLoad(s) {
		try {
			var j = JSON.parse(s);
		} catch (e) {
			return 'Could not load save';
		}

		if (!j.meta) {
			return 'No metadata in the save';
		}

		if ((j.meta.uuid != this.meta.uuid) &&
			(j.meta.uuid != null)) {
			return 'Save is for different game';
		}

		if ((j.meta.version < this.meta.oldestLoadableVersion) &&
			(j.meta.version != null) &&
			(j.meta.oldestLoadableVersion != null)) {
			return 'Incompatible save and loadable versions: ' + j.meta.versions
				+ ' < ' + this.oldestLoadableVersion;
		}

		try {
			var state = this.fromSaveState(j.state);
		} catch (e) {
			return 'Could not load save state';
		}

		return {
			state: state
		};
	},
	function fromSave(s) {
		var loaded = this.validateLoad(s);

		if (!loaded.state) {
			return {
				error: loaded,
			};
		}

		this.useState(loaded.state);
	},
	function useState(state) {
		try {
			this.saveManager.fromSaveState(state);
		} catch (e) {
			console.log(e.stack);
			return {
				error: 'Could not load state: ' + e.toString(),
			}
		}

		return {
			success: true,
		};
	},
	function saveToLocalStorage(name) {
		name = name || 'game';

		var save = this.toSave();
		localStorage.setItem(name, save);
	},
	function loadFromLocalStorage(name) {
		name = name || 'game';

		var save = localStorage.getItem(name);
		if (!save) {
			return;
		}
		this.fromSave(save);
	},
]);
