app.controller('allianceController', function ($http, $scope) {

    $scope.areaOptions = [];
    $scope.init = function () {
        $http.get('/api/ref-data/options/areas').then(function (response) {
            $scope.areaOptions = response.data;
        });

        $http.get('/api/ref-data/options/tags').then(function (response) {
            $scope.tagOptions = response.data;
        });
    };

    $scope.init();

    $scope.tags = [];
    $scope.tagOptions = [];
    $scope.tagConfig = {
        create: true,
        valueField: 'id',
        labelField: 'tag',
        delimiter: '|',
        placeholder: 'Add Tags to your Alliance'
    };

    $scope.create = function () {
        console.log('Create', $scope.name, $scope.area, $scope.newTags);
    }
});