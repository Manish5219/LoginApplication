var firstpagemodule=angular.module('FirstPagestarter', ['ionic', 'ngCordova'])
forgotpwdmodule.config(function($stateProvider,$urlRouterProvider)
{
    $stateProvider
       .state('app',{
       url:'/app',
       templateUrl:'templates/firstpage.html',
        controller:'FirstpageController'   
   });   
});
forgotpwdmodule.controller("FirstpageController", function($scope, $cordovaSQLite,$state,$ionicPopup,$http,$ionicLoading) {
 
 $scope.IpValue='manish';
    $scope.getDataFromWebsite = function() {
     
     $ionicLoading.show({
    template: 'loading'
  })
      
    //  $http.get('http://ip.jsontest.com/').then(function(resp) {         
        $http.get('http://localhost:8732/Service1/data/10').then(function(resp) {         
          $ionicLoading.hide();
    console.log('Success', resp);
    $scope.IpValue=resp.data;
  }, function(err) {
    console.error('ERR', err);
     $ionicLoading.hide();
      $ionicPopup.alert({
                       title: 'Server temporaily down',
                       template: 'There is something wrong with the server.Please try after some time'
                       });
  })
    }  
    
    
    $scope.GotoNotePadApplication = function() {
      $state.go("notepad");
    }
    

});