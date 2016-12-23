app.controller('campaignController', function ($http, $scope, notify, $window, $state) {

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

    $scope.createCampaign = function () {
        var postData = {
            name: $scope.name,
            area: $scope.area,
            tags: $scope.tags,
            description: $scope.description,
            bounty: $scope.bounty
        };
        $http.post("/api/campaigns/new", postData).then(function (response) {
            notify('Created New Campaign.');
            $scope.$emit('load-campaigns');
            $state.go('dashboard');
        }, function (error) {
            notify('Could not create new Campaign');
            console.log(error);
        });
    }

});