var app = angular.module('code', []);
app.config(function () {
	console.log("config");
});
app.run(function () {
	console.log("run");
});
