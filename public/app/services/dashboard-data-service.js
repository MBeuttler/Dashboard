angular.module('dashboard').factory('DashboardDataService', function($q, $http) {
    
    // api/drinks
    function getDrinks() {
        var defer = $q.defer();
        $http.get('api/drinks').then(function(result) {
            defer.resolve(result);
        }, function(error) {
            defer.reject(error);
        });
        return defer.promise;
    };
    
    // api/drinks?hours=x
    function getDrinksByHours(hours) {
        var defer = $q.defer();
        $http.get('api/drinks?hours=' + hours).then(function(result) {
            defer.resolve(result);
        }, function(error) {
            defer.reject(error);
        });
        return defer.promise;
    }

    return {
        getDrinks: getDrinks,
        getDrinksByHours: getDrinksByHours     
    };
});