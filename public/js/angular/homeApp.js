var app = angular.module('influenceAllyHome', ['ui.router']);

app.config(function ($interpolateProvider) {
    $interpolateProvider.startSymbol('{[{').endSymbol('}]}');
});