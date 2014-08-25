var games = games || {};
games.numbers = {
	instance: ko.observable(null),
	saveManager: new SaveManager(),
};
