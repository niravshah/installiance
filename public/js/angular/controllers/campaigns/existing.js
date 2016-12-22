app.controller('existingCampaignController', function ($http, $scope, notify, $stateParams) {

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

    $scope.changeStatus = function (status) {
        console.log(status);
        $http.post('/api/campaigns/' + $scope.campaign.campaignId + '/status/' + status).then(function (response) {
            //console.log('Response', response);
            $scope.campaign = response.data;
        }, function (error) {
            console.log('Error', error);
        });
    };

    $scope.joinCampaign = function () {
        var url = '/api/campaigns/' + $scope.campaign.campaignId + '/join/' + $scope.joinAlliance;
        console.log('Join Campaign', url);
        $http.post(url).then(function (response) {
            notify('Alliance added to the Campaign');
            $scope.campaign = response.data;
        }, function (error) {
            console.log('Error', error);
        });
    }
});