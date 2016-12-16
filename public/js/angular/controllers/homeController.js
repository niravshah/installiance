app.controller('homeController', function ($http, $scope) {
    $scope.init = function () {
        $scope.badges = [];
        $http.get('/api/user/stats').then(function (response) {
            if (status == 200) {
                console.log(response.data);
            }
        });
    };
    $scope.init();
});