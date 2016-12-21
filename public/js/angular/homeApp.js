var app = angular.module('influenceAllyHome', ['ui.router','selectize','cgNotify','angular-jwt']);

app.config(function ($interpolateProvider, $stateProvider, $urlRouterProvider,jwtInterceptorProvider,$httpProvider) {

    $interpolateProvider.startSymbol('{[{').endSymbol('}]}');
    $urlRouterProvider.otherwise('/dashboard');

    $stateProvider
        .state('dashboard', {
            url: '/dashboard',
            templateUrl: '/js/angular/partials/home.html'
        })
        .state('new-alliance',{
            url:'/alliances/new',
            templateUrl: '/js/angular/partials/alliances/new.html',
            controller: 'allianceController'
        })
        .state('existing-alliance',{
            url:'/alliances/:allianceId',
            templateUrl: '/js/angular/partials/alliances/existing.html',
            controller: 'existingAllianceController'
        })
        .state('new-campaign',{
            url:'/campaigns/new',
            templateUrl: '/js/angular/partials/campaigns/new.html',
            controller: 'campaignController'
        })
        .state('existing-campaign',{
            url:'/campaigns/:campaignId',
            templateUrl: '/js/angular/partials/campaigns/existing.html',
            controller: 'existingCampaignController'
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
