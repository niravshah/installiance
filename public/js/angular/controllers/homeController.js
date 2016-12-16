app.controller('homeController', function ($http, $scope) {
    $scope.init = function () {
        $scope.badges = [];
        $http.get('/api/misc/badge').then(function (response) {
            if (response.data.success == true) {
                $scope.badges = response.data.data;
            }
        });
    };
    $scope.init();
});