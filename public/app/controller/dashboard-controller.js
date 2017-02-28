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

        var rankbar = {
            data: {
                x: 'x',
                columns: [],
                type: 'bar',
                colors: {
                    value: function (d) {
                        return '#' + (0xff0000 + (d.value - 25) * 256 * 3).toString(16);
                    }
                }
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

        $scope.getAllDrinks = function () {
            dashboardDataService.getDrinks().then(function (data) {
                var drinks = data.data.result;
                donut.data.columns = [];

                drinks.forEach(function (drink) {
                    var item = [drink.name, drink.amount];
                    donut.data.columns.push(item);
                }, this);

                $scope.donutChart = donut;
            }, function (error) {
                console.log(error);
            });
        }


        $scope.getTopDrinks = function () {
            dashboardDataService.getDrinks().then(function (data) {
                var drinks = data.data.result;
                drinks.sort(function (a, b) {
                    return b.amount - a.amount;
                });
                rankbar.data.columns = [];

                var keys = ['x'];
                var values = ['value'];

                drinks.forEach(function (drink) {
                    keys.push(drink.name);
                    values.push(drink.amount);
                }, this);

                rankbar.data.columns.push(keys);
                rankbar.data.columns.push(values);

                $scope.barChart = rankbar;

            }, function (error) {
                console.log(error);
            });
        }



        $scope.getDrinksByHours = function () {
            dashboardDataService.getDrinksByHours(5).then(function (data) {
                var drinks = data.data.result;
                pie.data.columns = [];

                drinks.forEach(function (drink) {
                    var item = [drink.name, drink.amount];
                    pie.data.columns.push(item);
                }, this);

                $scope.pieChart = pie;
            }, function (error) {
                console.log(error);
            });
        }

        var getData = function () {
            $scope.getAllDrinks();
            $scope.getTopDrinks();
            $scope.getDrinksByHours();
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