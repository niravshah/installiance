app.controller('homeController', function ($http, $scope, $rootScope) {
    $scope.init = function () {
        $scope.stats;
        $rootScope.alliances=[];
        $rootScope.campaigns=[];
        $http.get('/api/stats/me').then(function (response) {
            if (response.status == 200) {
                //console.log(response.data);
                $scope.stats = response.data;
                $rootScope.currentUserId = response.data.shortid;
                $scope.$emit('load-alliances');
                $scope.$emit('load-campaigns');
            }
        });

    };
    $scope.init();

    $scope.$on('load-campaigns',function(event,data){

        var campaignsUrl = '/api/user/' + $rootScope.currentUserId  + '/campaigns';
        $http.get(campaignsUrl).then(function (response) {
            $rootScope.campaigns = response.data;
        }, function (error) {
            console.log('Error fetching campaigns', error);
        });

    });

    $scope.$on('load-alliances',function(event,data){

        var allianceUrl = '/api/user/' + $rootScope.currentUserId + '/alliances';
        $http.get(allianceUrl).then(function (response) {
            $rootScope.alliances = response.data;
        }, function (error) {
            console.log('Error fetching alliances', error);
        });

    });


});