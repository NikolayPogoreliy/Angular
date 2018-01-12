(function() {
  'use strict';

  angular
    .module('publicHtml')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope, $log, $interval, StatisticsSrv) {
    var intId;
      
    var vm = this;
    vm.fullData;
    vm.status_filter = [
        {value:"all", name:"all"},
        {value:"error", name: "error"},
        {value:"ok", name:"ok"}
    ];
    vm.filterBy = vm.status_filter[0];
    vm.items = [
        {value: "0", label: 'stopped'},
        {value: "5000", label: 'every 5sec'},
        {value: "10000", label: 'every 10sec'},
        {value: "30000", label: 'every 30sec'},
        {value: "60000", label: 'every 1min'}
    ];
    vm.autorefresh = vm.items[0];
    
    $scope.predicated='modified';
    $scope.reverse = true;
    vm.limits = [
        {value: "5"},
        {value: "10"},
        {value: "50"},
        {value: "100"}
    ];
    $scope.viewPerPage = vm.limits[1];
    $scope.currentPage = 1;
    $scope.pages = [];
    getStatistics();

    vm.refreshStatistics = function () {
            if (angular.isUndefined(intId)){
                getStatistics();
            }
        };
    vm.setRefresh = setRefresh;
    vm.setOrder = setOrder;
    vm.getStatistics = getStatistics;
    vm.setPage = setPage;
    
    
    function getStatistics() {
        StatisticsSrv.loadStatistics().then(function(res){
            if (vm.filterBy.value == 'all'){
                $scope.data = res.data.uploads;
                
            } else {
                $scope.data = res.data.uploads.filter(function(item){
                    return item.status === vm.filterBy.value;
                });
            }
            vm.fullData = $scope.data.slice();
            $scope.pages = [];
            $scope.currentPage = 1;
            for(var k = 1; k <= Math.ceil(vm.fullData.length / $scope.viewPerPage.value); k++) {$scope.pages.push(k);}
        }, function(res){
            $scope.data = res.data;
        });
    }
    
    function setRefresh() {
        if (angular.isDefined(intId)) 
        {
            $interval.cancel(intId);
            intId = undefined;
        }
        if (vm.autorefresh.value != '0') {
            intId = $interval(getStatistics, vm.autorefresh.value);
        }
    }
    
    function setOrder(field){
        $scope.reverse = ($scope.predicated === field) ? !$scope.reverse : false;
        $scope.predicated = field;
    }
    
    function setPage(page){
        $scope.currentPage = page+1;
//        console.log($scope.currentPage);
    }
}
})();

//