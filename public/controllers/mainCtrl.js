app.controller('mainCtrl', ["$http", "$scope", "dataFactory",
	function ($http, $scope, dataFactory) {
		console.log("main Ctrl");

		$scope.data = {};
		$scope.user = {
			name: 'abhishek'
		};
		$scope.data.cmt = '';

		$scope.data.comments = dataFactory.getComments();

		$scope.vote = function (id, delta) {
			dataFactory.setVotes(id, delta);
		};

		$scope.addComment = function (comment) {
			dataFactory.addComment(comment, $scope.user.name);
			$scope.data.cmt = '';
		};

		$scope.addReply = function (reply, id) {
			dataFactory.addReply(reply, id, $scope.user.name);
		};

	}
]);
