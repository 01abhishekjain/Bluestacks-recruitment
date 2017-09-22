angular.module('code')
	.factory('dataFactory', ['$http',
		function ($http) {

			var service = {};

			service.getComments = function () {
				this.comments = localStorage.comments ? JSON.parse(localStorage.comments) : [];
				return this.comments;
			};

			service.save = function () {
				localStorage.comments = JSON.stringify(this.comments);
			};

			service.addComment = function (comment, userName) {
				var commentObj = {
					user: userName,
					comment: comment,
					votes: 0,
					replies: [],
					id: Math.floor(Math.random() * 1000) // assign random ID for now
				};
				this.comments.push(commentObj);
				service.save();
			};


			//idArr holds IDs of L1 and L2 for easy selection of comment object
			service.setVotes = function (idArr, delta) {
				var parentIdx = this.comments.findIndex(el => el.id === idArr[0]);
				var parentObj = this.comments[parentIdx];

				// if we are voting on a L2 object
				if (idArr.length > 1) {
					var childIdx = parentObj.replies.findIndex(el => el.id === idArr[1]);
					var childObj = parentObj.replies[childIdx];
					childObj.votes += delta;
					if (childObj.votes < 0) childObj.votes = 0;
				}
				// if we are voting on the L1 object
				else {
					parentObj.votes += delta;
					if (parentObj.votes < 0) parentObj.votes = 0;
				}
				service.save();
			};


			service.addReply = function (reply, commentID, userID) {
				var idx = this.comments.findIndex(el => el.id === commentID);
				var obj = this.comments[idx];
				var replyObj = {
					user: userID,
					comment: reply,
					votes: 0,
					id: Math.floor(Math.random() * 1000) // assign random ID for now
				};
				obj.replies.push(replyObj);
				obj.addReplytext = '';
				obj.addReply = false;

				service.save();
			};

			return service;
		}
	]);
