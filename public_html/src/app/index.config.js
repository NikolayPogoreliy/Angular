(function() {
  'use strict';

  angular
    .module('publicHtml')
    .config(config);

  /** @ngInject */
  function config($logProvider, RestangularProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
//    RestangularProvider.setBaseUrl('http://localhost:3003');
  }

})();
