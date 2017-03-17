angular
    .module('dashboard')
    .controller('DashboardController', ['$scope', '$timeout', 'DashboardDataService', function ($scope, $timeout, dashboardDataService) {

        var donut = {
            data: {
                columns: [],
                type: 'donut'
            },
            donut: {
                title: "",
                label: {
                    show: true,
                    format: function (value, ratio, id) {
                        return d3.format()(value);
                    }
                }
            },
            transition: {
                duration: 1000
            }
        };

        var pie = {
            data: {
                columns: [],
                type: 'pie'
            },
            transition: {
                duration: 1000
            }
        };

        var topEver = {
            data: {
                x: 'x',
                columns: [],
                type: 'bar'
            },
            axis: {
                rotated: true,
                x: {
                    type: 'category'
                }
            },
            legend: {
                show: false
            },
            transition: {
                duration: 1000
            }
        };

        var topToday = {
            data: {
                x: 'x',
                columns: [],
                type: 'bar'
            },
            axis: {
                rotated: true,
                x: {
                    type: 'category'
                }
            },
            legend: {
                show: false
            },
            transition: {
                duration: 1000
            }
        };

        $scope.chart = donut;

        $scope.clickEvent = function (datum, mouseEvent) {
            console.log('data clicked', datum, mouseEvent);
            $scope.chart.data.hide.push(datum.id);
        };

        $scope.getDrinksByHours = function (hours) {
            dashboardDataService.getDrinksByHours(hours).then(function (data) {
                var drinks = data.data;
                $scope.getactivatedlicensessince = drinks[0].getactivatedlicensessince;
            }, function (error) {
                console.log(error);
            });
        }


        $scope.getTopDrinksEver = function() {
             dashboardDataService.getTopDrinksEver().then(function (data) {
                var drinks = data.data;
                drinks.sort(function (a, b) {
                    return b.rank - a.rank;
                });
                topEver.data.columns = [];

                var keys = ['x'];
                var values = ['value'];

                drinks.forEach(function (drink) {
                    keys.push(drink.technologydataname);
                    values.push(drink.rank);
                }, this);

                topEver.data.columns.push(keys);
                topEver.data.columns.push(values);

                $scope.topEver = topEver;

            }, function (error) {
                console.log(error);
            });
        }


        $scope.getTopDrinksOfToday = function () {
            dashboardDataService.getTopDrinksOfToday().then(function (data) {
                var drinks = data.data;
                drinks.sort(function (a, b) {
                    return b.rank - a.rank;
                });
                topToday.data.columns = [];

                var keys = ['x'];
                var values = ['value'];

                drinks.forEach(function (drink) {
                    keys.push(drink.technologydataname);
                    values.push(drink.rank);
                }, this);

                topToday.data.columns.push(keys);
                topToday.data.columns.push(values);

                $scope.topToday = topToday;

            }, function (error) {
                console.log(error);
            });
        }

        var getData = function () {
            $scope.getDrinksByHours(5);
            $scope.getTopDrinksOfToday();
            $scope.getTopDrinksEver();
            nextLoad();
        }

        var loadTime = 10000;
        var loadPromise; //Pointer to the promise created by the Angular $timout service

        var cancelNextLoad = function () {
            $timeout.cancel(loadPromise);
        };

        var nextLoad = function () {
            //Always make sure the last timeout is cleared before starting a new one
            cancelNextLoad();
            loadPromise = $timeout(getData, loadTime);
        };

        //Start polling the data from the server
        getData();

        //Always clear the timeout when the view is destroyed, otherwise it will keep polling
        $scope.$on('$destroy', function () {
            cancelNextLoad();
        });
    }]);