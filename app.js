
var ForEx= angular.module('ForEx', []);
ForEx.controller('ConvertCtrl', ['$scope', '$http', function($scope, $http) {
    $scope.rates = {};
    $scope.fromRate = 0;
    $scope.toRate = 0;
    $scope.initialFromRate = 0;
    $scope.initialToRate = 0;
    $http.get('http://data.fixer.io/api/latest?access_key=ddaf2587988d863ad9705f30ec2b87c0').then(function(res) {
        $scope.rates = res.data.rates;
        $scope.fromRate = $scope.rates.USD;//1.164681
        $scope.toRate = $scope.rates.INR;//79.617603

        $scope.initialFromRate = 1;
        $scope.initialToRate = ($scope.toRate * $scope.initialFromRate)/$scope.fromRate;//68.36

        $scope.from = $scope.initialFromRate;
        $scope.to = $scope.initialToRate;
    });
    $scope.fromCurrency = 'USD';
    $scope.fromSymbol = '';
    $scope.toCurrency = 'INR';
    $scope.toSymbol = '';

    $scope.countries = {};
    $scope.symbols = {};
    $http.get('https://free.currencyconverterapi.com/api/v5/countries').then(function(res){
        $scope.countries = res.data.results;
        for(var country in $scope.countries){
            $scope.symbols[$scope.countries[country].currencyId] = $scope.countries[country].currencySymbol;
        }
        console.log($scope.symbols);
        $scope.fromSymbol = $scope.symbols[$scope.fromCurrency];
        $scope.toSymbol = $scope.symbols[$scope.toCurrency];
        console.log($scope.fromSymbol);
        console.log($scope.toSymbol);
    });

    $scope.updateFromSymbol = function(){
        $scope.fromRate = $scope.rates[$('#fromCurrency option:selected').text()];

        $scope.fromCurrency = $('#fromCurrency option:selected').text();
        $scope.from = $scope.initialfromRate;
        $scope.updateFrom();
        $scope.fromSymbol = $scope.symbols[$scope.fromCurrency];
        $scope.updateToSymbol();
    };

    $scope.updateToSymbol = function(){
        $scope.toRate = $scope.rates[$('#toCurrency option:selected').text()];
        $scope.initialToRate = ($scope.toRate * $scope.initialFromRate)/$scope.fromRate;
        $scope.to = $scope.initialToRate;
        $scope.updateTo();
        $scope.toCurrency = $('#toCurrency option:selected').text();
        $scope.toSymbol = $scope.symbols[$scope.toCurrency];
    };

    $scope.updateTo = function(){
        $scope.to = ($scope.from * $scope.initialToRate);
    };

    $scope.updateFrom = function(){
        $scope.from = ($scope.to)*($scope.initialFromRate / $scope.initialToRate);
    };

}]);