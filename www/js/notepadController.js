
angular.module('notepadstarter', ['ionic'])

.controller('NotepadController',function($scope,$ionicPopup,$ionicListDelegate,$http,$rootScope)
{   
    $scope.tasks=[];     
     $http.get('./tasks.json').then(function(resp)
  {
      var items=["title"];
      items=resp.data;
       $scope.tasks=items;
    });

     
     $scope.newTask=function() {
        $ionicPopup.prompt({
            title:"New task",
            template:"Enter Task",
            inputPlaceholder:"What do you need to do?",
            okText:"Create task"
            
        }).then(function(res) {
            if(res) $scope.tasks.push({title:res});
            
        })
        
    };
 
    // this function is for deleting all tasks 
    $scope.deleteAllTasks=function(tasks)
    {
      $ionicPopup.prompt({
           title:"Delete all tasks",
            template:"Reason for Task",
            inputPlaceholder:"What do you want to delete all tasks?",
            okText:"Delete tasks"
      }).then(function(res)
      {
          if(res) 
          {      
                  while($scope.tasks.length > 0) 
                  {
                  $scope.tasks.pop();                 
                  }     
          }
      })  
    };
    
      // this function is for save all tasks 
    $scope.saveTasks=function()
    {
    //     $http({
    //     headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    //     url: './tasks.json',
    //     method: "POST", 
    //     data:{"title": 'hi'},
    //   })
    var body = { title: 'AngularJS' };
         var PostResponse = $http({
                   // url: '/tasks.json',
                url: 'http://localhost:33388/WebService1.asmx',
                    method: "GET",
                
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                   
    })
    //    $http({
    //     url: '/tasks.json',
    //     method: "POST",
    //     data: { 'title' : "HI, it is working like charm" }
    // })
    .then(function(response) {
            // success
            $ionicPopup.alert({
                       title: 'Write successfull',
                       template: 'Hi, You have succesfully written data to local JSON file.'
                       });
                      console.log("Read data is:  " + response.data);
    }, 
    function(response) { 
            // failed
             console.log("Read data is:  " + response.data);     
             $ionicPopup.alert({
                       title:  response.data,
                       template: 'Hi, You have FAILED IN WRITING.'
                       });
                      console.log("Read data is:  " + response.data); 
    });
console.log("Read data is:  " + PostResponse.data); 
    };
    
     $scope.edit=function(task)
    {
        $scope.data={response:task.title};
        $ionicPopup.prompt({
             title:"Edit task",
             scope: $scope
        }).then(function(res)
        {
            if(res!==undefined)
            task.title=$scope.data.response;
            $ionicListDelegate.closeOptionButtons();
        });
    } 
})