angular.module('publicHtml').filter('startFrom', function() {
    return function(input, start) {
        input = input || '';
        start = +start; //parse to int
        return input.slice(start);
    };
});
