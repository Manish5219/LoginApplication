var db = null;
 
var example = angular.module('starter', ['ionic', 'ngCordova','Loginstarter','SignUpstarter'])
    .run(function($ionicPlatform, $cordovaSQLite) {
        $ionicPlatform.ready(function() {
            if(window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if(window.StatusBar) {
                StatusBar.styleDefault();
            }
            // db = $cordovaSQLite.openDB("my.db");
            // $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS people (id integer primary key, firstname text, lastname text)");
        db = window.openDatabase("bigdatatable.db", "1", "userdatatable", 200000);
        $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS mydatatable (id integer primary key, emailid text, password text)");
  
        });
    });
    
    example.controller("MainController", function($scope, $cordovaSQLite,$state) {
    
    $scope.Login=function(){
        $state.go("login");
    }
    
     $scope.SignUp=function(){
        $state.go("signup");
    }
 
});

example.config(function($stateProvider,$urlRouterProvider){
   $stateProvider
   .state('main',{
       url:'/',
       templateUrl:'templates/main.html',
       controller:'MainController'
   }) 
      .state('app',{
       url:'/app',
       templateUrl:'templates/firstpage.html',
      
   })
   $urlRouterProvider.otherwise('/');
});
