var loginmodule=angular.module('Loginstarter', ['ionic', 'ngCordova'])
loginmodule.config(function($stateProvider,$urlRouterProvider)
{
    $stateProvider
    .state('login',{
       url:'/login',
       templateUrl:'templates/login.html',
       controller:'LoginController'
   });
});
loginmodule.controller("LoginController", function($scope, $cordovaSQLite,$state,$ionicPopup) {
 
 $scope.loginEmail='';
 $scope.loginPassword='';
    $scope.insert = function(emailid, password) {
        var query = "INSERT INTO mydatatable (emailid, password) VALUES (?,?)";
        $cordovaSQLite.execute(db, query, [emailid, password]).then(function(result) {
            console.log("INSERT ID -> " + result.insertId);
        }, function (err) {
            console.error(err);
        });
    }
 
    $scope.loginToAccount = function(emailid,password) {
        var query = "SELECT emailid, password FROM mydatatable WHERE password = ? AND emailid=?";
        $cordovaSQLite.execute(db, query, [password,emailid]).then(function(result) {
            if(result.rows.length > 0) {
                console.log("SELECTED -> " + result.rows.item(0).emailid + " " + result.rows.item(0).password);
                 $state.go("app");
            } else {
                 $ionicPopup.alert({
                       title: 'Invalid credentials',
                       template: 'Please enter valid credentials'
                       });
            }
        }, function (err) {
            console.error(err);
        });
    }  
});