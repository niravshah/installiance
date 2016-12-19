var app = angular.module('influenceAllyHome', ['ui.router']);

app.config(function ($interpolateProvider, $stateProvider, $urlRouterProvider) {

    $interpolateProvider.startSymbol('{[{').endSymbol('}]}');
    $urlRouterProvider.otherwise('/home');

    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: '/js/angular/partials/home.html'
        })
        .state('alliance',{
            url:'/alliance/new',
            templateUrl: '/js/angular/partials/alliance/new.html',
            controller: 'allianceController'
        })
});