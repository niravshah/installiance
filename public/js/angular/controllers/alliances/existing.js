app.controller('existingAllianceController', function ($http, $scope, $stateParams, notify) {

    $scope.temp = "Random Text";
    $scope.alliance;
    $scope.init = function () {
        console.log('existingAllianceController');

        $http.get('/api/alliances/' + $stateParams.allianceId).then(function (response) {
            console.log(response);
            $scope.alliance = response.data.alliance;
        }, function (error) {
            console.log("Could not find the alliance with id: " + $stateParams.allianceId, error);
            notify('Could not find the alliance with id: ' + $stateParams.allianceId)
        });
    };

    $scope.init();

});