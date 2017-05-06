var login = angular.module('loginApp',["ngStorage"]);
login.$inject = ['$window'];
login.controller('loginctrl', function ($scope, $http,$window , $localStorage, $sessionStorage) {


$scope.login=function(){
       $http({
        url: NODOMAIN+'loginapi',
        method: "POST",
        data: { 'name' : $scope.userName, 'password' : $scope.password }
    })
    .success(function (response) {
        console.log(response);
 if (response.error.errorCode == 0) {
     
      $window.location.href = NODOMAIN+'chatting/'+response.result.userid;
     
 }
    });
    
}
$scope.sendMessage=function(){
        
    }
});