app.controller('existingAllianceController', function ($http, $scope, $stateParams, notify) {

    $scope.init = function () {
        $http.get('/api/alliances/' + $stateParams.allianceId).then(function (response) {
            $scope.alliance = response.data;

            var creatorUrl = '/api/stats/' + response.data.alliance.shortid;
            $http.get(creatorUrl).then(function (response) {
                $scope.creator = response.data;
            }, function (error) {
                var errorMessage = "Could not find the creator for the alliance with id: " + $stateParams.allianceId;
                console.log(errorMessage, error);
                notify(errorMessage);
            });

        }, function (error) {
            var errorMessage = "Could not find the alliance with id: " + $stateParams.allianceId;
            console.log(errorMessage, error);
            notify(errorMessage);
        });
    };

    $scope.init();
});