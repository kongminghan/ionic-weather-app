var myApp = angular.module('app.controllers', [])

myApp.controller('weatherTabPageCtrl', ['$scope', '$stateParams','$http', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$http) {

  $scope.getWeather = function(city){
      var URL = 'http://api.openweathermap.org/data/2.5/weather';

      myApp.cityName = city.value; //new variable

      var request = {
        method: 'GET',
        url:URL,
        params:{
          q:city.value,
          mode:'json',
          units:'metric',
          appid:'31251f38861714fc3ab601cd5d836c9a'
        }
      };

      $http(request)
        .then(function(response){
          var weatherDt = angular.fromJson(response.data);
          var temp = weatherDt.main.temp;
          var iconCode = weatherDt.weather[0].icon;
          var desc = weatherDt.weather[0].description;
          var iconUrl = 'http://openweathermap.org/img/w/' + iconCode + '.png';
          $scope.weathers = [{info:temp+" Celcius",imgUrl:iconUrl,description:desc}];
        }).catch(function(response){
          $scope.weathers = [{info:"Error"}];
        });
  }

}])

myApp.controller('forecastTabPageCtrl', ['$scope', '$stateParams','$http', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$http) {

  $scope.$on("$ionicView.enter",function(event,data){

  if(myApp.cityName == undefined){
    return;
  }

  var URL = 'http://api.openweathermap.org/data/2.5/forecast/current';

  var request = {
    method: 'GET',
    url:URL,
    params:{
      q:myApp.cityName,
      mode:'json',
      units:'metric',
      cnt:5,
      appid:'31251f38861714fc3ab601cd5d836c9a'
    }
  };

  $http(request)
    .then(function(response){
      var weatherDt = angular.fromJson(response.data);
      var weatherDtList = weatherDt.list;
      var count = 1;
      $scope.weathers = [];
      angular.forEach(weatherDtList,function(weatherData){
        var temp = weatherData.main.temp;
        var iconCode = weatherData.weather[0].icon;
        var desc = weatherData.weather[0].description;
        var iconUrl = 'http://openweathermap.org/img/w/' + iconCode + '.png';
        $scope.weathers.push({info:temp+" Celcius",imgUrl:iconUrl,description:desc,day:"Next "+count+" day"});
        count++;
      },this);
    }).catch(function(response){
      $scope.weathers = [{info:"Error"}];
    });
  });

}])
