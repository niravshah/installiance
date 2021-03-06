var app = angular.module('influenceAllyHome', ['ui.router', 'selectize', 'cgNotify', 'angular-jwt', 'ngAvatar']);

app.config(function ($interpolateProvider, $stateProvider, $urlRouterProvider, jwtInterceptorProvider, $httpProvider) {

    $interpolateProvider.startSymbol('{[{').endSymbol('}]}');
    $urlRouterProvider.otherwise('/dashboard');


    $stateProvider
        .state('dashboard', {
            url: '/dashboard',
            templateUrl: '/js/angular/partials/home.html'
        })
        .state('dashboard.alliance', {
            url: '/alliances/:allianceId',
            templateUrl: '/js/angular/partials/alliances/existing.html',
            controller: 'existingAllianceController'
        })
        .state('dashboard.campaign', {
            url: '/campaigns/:campaignId',
            templateUrl: '/js/angular/partials/campaigns/existing.html',
            controller: 'existingCampaignController'
        })
        .state('new-alliance', {
            url: '/alliances/new',
            templateUrl: '/js/angular/partials/alliances/new.html',
            controller: 'allianceController'
        })
        .state('new-campaign', {
            url: '/campaigns/new',
            templateUrl: '/js/angular/partials/campaigns/new.html',
            controller: 'campaignController'
        })
        .state('alliance-details', {
            url: '/alliances/:allianceId',
            templateUrl: '/js/angular/partials/alliances/details.html',
            controller: 'detailsAllianceController'
        })
        .state('campaign-details', {
            url: '/campaigns/:campaignId',
            templateUrl: '/js/angular/partials/campaigns/details.html',
            controller: 'detailsCampaignController'
        });
    jwtInterceptorProvider.tokenGetter = function () {
        return localStorage.getItem('id_token');
    };

    $httpProvider.interceptors.push('jwtInterceptor');

});

/*app.run(['$rootScope', '$state', 'AuthService', function ($rootScope, $state, AuthService) {
 $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
 if (!AuthService.validToken() && toState.authenticate) {
 $state.transitionTo('login');
 event.preventDefault();
 }
 if (toState.redirectTo) {
 event.preventDefault();
 $state.go(toState.redirectTo, toParams, {location: 'replace'})
 }
 });

 }]);*/

app.filter('initials', function () {
    return function (name) {
        return name.match(/\b(\w)/g).join('');
    }
});
