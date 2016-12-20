app.controller('allianceController', function ($http, $scope) {

    $scope.areaOptions = [];
    $scope.init = function(){
        $http.get('/api/ref-data/options/area').then(function(response){
            console.log('Area Options', response.data);
            $scope.areaOptions = response.data;
        })
    };

    $scope.init();

    $scope.newTags = [];
    $scope.newTagsOptions = [];
    $scope.newTagsConfig = {
        create: true,
        valueField: 'id',
        labelField: 'tag',
        delimiter: '|',
        placeholder: 'Add Tags to your Alliance'
    };

    $scope.create = function(){
        console.log('Create', $scope.name, $scope.area, $scope.newTags);
    }
});