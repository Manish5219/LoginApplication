var signupmodule=angular.module('SignUpstarter', ['ionic', 'ngCordova'])
signupmodule.config(function($stateProvider,$urlRouterProvider)
{
    $stateProvider
      .state('signup',{
       url:'/signup',
       templateUrl:'templates/signup.html',
       controller:'SignUpController'
   });
});
signupmodule.controller("SignUpController", function($scope, $cordovaSQLite,$state,$ionicPopup) {
 
$scope.emailid='';
$scope.password='';
    $scope.SignUpToAccount = function(emailid, password) {
        
             //     var query = "SELECT emailid, password FROM mydatatable WHERE password = ?";
        // $cordovaSQLite.execute(db, query, [password]).then(function(result) 
          var query = "SELECT emailid, password FROM mydatatable WHERE password = ? AND emailid=?";
        $cordovaSQLite.execute(db, query, [password,emailid]).then(function(result)   
        {
            if(result.rows.length > 0)
             {
                    $ionicPopup.alert({
                       title: 'User already exist',
                       template: 'Please enter with different credentials'
                       });
             } 
            else
             {              
                 var query = "INSERT INTO mydatatable (emailid, password) VALUES (?,?)";
                 $cordovaSQLite.execute(db, query, [emailid, password]).then(function(result) {
                 console.log("INSERT ID -> " + result.insertId);
                  $state.go("app");
                 }, function (err) {
                 console.error(err);
                 
                 });
             }
        }, function (err) {
            console.error(err);
        });               
    } 
});