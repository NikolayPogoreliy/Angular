/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module('publicHtml').controller('StatisticsCtrl', function ($scope, StatisticsSrv) {
    var vm = this;
    vm.data = StatisticsSrv.data;
});

