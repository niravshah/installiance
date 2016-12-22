app.controller('homeController', function ($http, $scope, $rootScope) {
    $scope.init = function () {
        $scope.stats;
        $scope.alliances;
        $scope.campaigns;
        $http.get('/api/stats/me').then(function (response) {
            if (response.status == 200) {
                //console.log(response.data);
                $scope.stats = response.data;
                $rootScope.currentUserId = response.data.shortid;
                var allianceUrl = '/api/user/' + response.data.shortid + '/alliances';
                $http.get(allianceUrl).then(function (response) {
                    $scope.alliances = response.data;
                }, function (error) {
                    console.log('Error fetching alliances', error);
                });

                var campaignsUrl = '/api/user/' + response.data.shortid + '/campaigns';
                $http.get(campaignsUrl).then(function (response) {
                    $scope.campaigns = response.data;
                }, function (error) {
                    console.log('Error fetching campaigns', error);
                });

            }
        });

    };
    $scope.init();
});