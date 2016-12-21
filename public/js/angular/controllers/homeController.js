app.controller('homeController', function ($http, $scope) {
    $scope.init = function () {
        $scope.stats;
        $scope.alliances;
        $http.get('/api/stats/me').then(function (response) {
            if (response.status == 200) {
                console.log(response.data);
                $scope.stats = response.data;
                var allianceUrl = '/api/user/' + response.data.shortid + '/alliances';
                $http.get(allianceUrl).then(function (response) {
                    $scope.alliances = response.data;
                }, function (error) {
                    console.log('Error fetching alliances', error);
                })
            }
        });

    };
    $scope.init();
});