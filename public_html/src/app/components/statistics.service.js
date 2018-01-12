
angular.module('publicHtml').factory('StatisticsSrv', function($http){
    return {
        
        loadStatistics: function () {
            return $http.get('http://192.168.1.220:3000/getUploads');
        }
    };
});

