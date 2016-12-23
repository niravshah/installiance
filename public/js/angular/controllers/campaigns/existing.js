app.controller('existingCampaignController', function ($http, $scope, notify, $stateParams, $rootScope) {

    $scope.campaign;
    $scope.init = function () {
        $http.get('/api/campaigns/' + $stateParams.campaignId).then(function (response) {
            $scope.campaign = response.data;
            $scope.joinUrl = '/campaigns/' + response.data.campaignId + '/join/' + response.data.joinToken;
        }, function (error) {
            var errorMessage = "Could not find the alliance with id: " + $stateParams.allianceId;
            console.log(errorMessage, error);
            notify(errorMessage);
        });
    };

    $scope.init();

});