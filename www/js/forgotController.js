var forgotpwdmodule=angular.module('Forgotstarter', ['ionic', 'ngCordova'])
forgotpwdmodule.config(function($stateProvider,$urlRouterProvider)
{
    $stateProvider
        .state('forgotpwd',{
       url:'/forgot-password',
       templateUrl:'templates/forgotPassword.html',
       controller:'ForgotController'
      
   });
   
});
forgotpwdmodule.controller("ForgotController", function($scope, $cordovaSQLite,$state,$ionicPopup) {
 
 $scope.EmailIdForData='';

    $scope.forgotPasswordClick = function(emailidToGet) {
        var query = "SELECT emailid, password FROM mydatatable WHERE emailid = ?";
        $cordovaSQLite.execute(db, query, [emailidToGet]).then(function(result) {
            if(result.rows.length > 0) {
                console.log("Email Id:" + result.rows.item(0).emailid + " and Password:" + result.rows.item(0).password);
                 $ionicPopup.alert({
                       title: 'Password',
                       template: 'Your Password is:'+result.rows.item(0).password
                       });
                //  $state.go("app");
            } else {
                 $ionicPopup.alert({
                       title: 'Invalid Email Id',
                       template: 'Please enter valid Email Id'
                       });
            }
        }, function (err) {
            console.error(err);
        });
    }  
});