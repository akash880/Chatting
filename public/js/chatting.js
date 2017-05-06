/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var appChatting = angular.module('myApp',[]);
appChatting.controller('ChatCtrl',function($http,$scope,$location){
      var socket = io.connect();
       var params = $location.absUrl().split('/');
        $scope.userid=params[params.length-1];
        $scope.message='hey';
//    socket.on('receiveMessage', function (data) {
//		alert();
//	});

socket.on('connect',function() {
        socket.emit('setUsername', {userid:  $scope.userid});
    });
    
    socket.on('getChannelId',function(data){
        alert(data);
    });
    socket.on('recv',function(data){
        alert(data)
    });
    $scope.notckicked=1;
     $scope.check =0;
     $http({
        url: NODOMAIN+'getalluser',
        method: "GET"
    })
    .success(function (response) {
        
 if (response.error.errorCode == 0) {
        $scope.names =response.results; 
 }
});
$scope.callChannel=function(id,name){
    $scope.userid_two = id;
    var data = {'userid_one':$scope.userid,'userid_two':id};
    socket.emit('getChannelId',data);
    $scope.notckicked =0;
    $scope.check =1;
    $scope.namewith= name;
};
 
 $scope.sendMessage=function(msg){
     var data = {'message':msg,'userid_one':$scope.userid,'userid_two':$scope.userid_two};
     alert(JSON.stringify(data));
  socket.emit('sendMessage', data);
  /*
   * steps to be done
   * Now pass the channelid to sendMessage and from server update in db 
   * Than using userid two send the message
   * 
   * 
   */
  
  
 }
});