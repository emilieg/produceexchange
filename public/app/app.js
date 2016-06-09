//initialize the app here and place all the app routing and $stateProvider and .state here
var scmanagerApp = angular.module('scmanagerApp', ['ui.router',
  'ui.bootstrap',
  'ngRoute',
  'cloudinary',
  'photoAlbumControllers',
  'photoAlbumServices',
  'ngAnimate'])

.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: '/app/views/home.html',
    controller: 'HomeCtrl'
  })
  .state('about', {
    url: '/about',
    templateUrl: '/app/views/about.html',
  })
  .state('post', {
    url: '/post',
    templateUrl: '/app/views/post.html',
    controller: 'photoUploadCtrl',
  })
  .state('allposts', {
    url: '/allposts?q=:query',
    templateUrl: '/app/views/allposts.html',
    controller: 'AllPostCtrl',
  })


  $locationProvider.html5Mode({enabled: true})
}])


.config(['cloudinaryProvider', function (cloudinaryProvider) {
  cloudinaryProvider
      .set("cloud_name", "dia36odnd")
      .set("upload_preset", "zdqjbzoa");
}]);





