angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('tabsController.weatherTabPage', {
    url: '/page2',
    views: {
      'tab1': {
        templateUrl: 'templates/weatherTabPage.html',
        controller: 'weatherTabPageCtrl'
      }
    }
  })

  .state('tabsController.forecastTabPage', {
    url: '/page4',
    views: {
      'tab3': {
        templateUrl: 'templates/forecastTabPage.html',
        controller: 'forecastTabPageCtrl'
      }
    }
  })

  .state('tabsController', {
    url: '/page1',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

$urlRouterProvider.otherwise('/page1/page2')

  

});