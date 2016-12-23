app.controller('allianceController', function ($http, $scope, notify, $window, $state) {

    $scope.tags;
    $scope.area;
    $scope.tagOptions = [];
    $scope.areaOptions = [];

    $scope.init = function () {
        $http.get('/api/ref-data/options/areas').then(function (response) {
            $scope.areaOptions = response.data.map(function (x) {
                return { item: x };
            });
        });
        $http.get('/api/ref-data/options/tags').then(function (response) {
            $scope.tagOptions = response.data.map(function (x) {
                return { item: x };
            });

        });
    };

    $scope.init();

    $scope.createAlliance = function () {
        var postData = { name: $scope.name, area: $scope.area, tags: $scope.tags, description: $scope.description };
        $http.post("/api/alliances/new", postData).then(function (response) {
            notify('Created New Alliance.');
            $scope.$emit('load-alliances');
            $state.go('dashboard');
        }, function (error) {
            notify('Could not create new Alliance');
            console.log(error);
        });
    }
});