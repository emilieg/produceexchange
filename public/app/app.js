//initialize the app here and place all the app routing and $stateProvider and .state here
var scmanagerApp = angular.module('scmanagerApp', ['ui.router',
  'ngFlash',
  'ui.bootstrap',
  'ngRoute',
  'cloudinary',
  'photoAlbumControllers',
  'photoAlbumServices',
  'ngAnimate'])

.config(['$stateProvider',
  '$urlRouterProvider',
  '$locationProvider',
  '$httpProvider',
  function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
  
    $httpProvider.interceptors.push('AuthInterceptor')

  $urlRouterProvider.otherwise(function($injector) {
    var $state = $injector.get('$state');
    $state.go('404');
  });
  // This intercepts every $http request and runs the AuthInterceptor service
  // along with it.  AuthInterceptor adds an auth token to the http header.
  // $httpProvider.interceptors.push('AuthInterceptor');


  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: '/app/views/home.html',
    controller: 'HomeCtrl'
  })
  .state('signup', {
    url: '/signup',
    templateUrl: 'app/views/userSignUp.html',
    controller: 'SignupCtrl'
  })
  .state('login', {
    url: '/login',
    templateUrl: 'app/views/userLogin.html',
    controller: 'LoginCtrl'
  })
  .state('404', {
    templateUrl: 'app/views/404.html'
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
  .state('userpost', {
    url: '/myposts',
    templateUrl: '/app/views/userpost.html',
    controller: 'UserPostCtrl'
  });


  $locationProvider.html5Mode({enabled: true})
}])


.config(['cloudinaryProvider', function (cloudinaryProvider) {
  cloudinaryProvider
      .set("cloud_name", "dia36odnd")
      .set("upload_preset", "zdqjbzoa");
}]);


scmanagerApp.run(['$rootScope', 'Flash', function($rootScope, Flash) {
  $rootScope.$on('$stateChangeStart', 
    function(event, toState, toParams, fromState, fromParams) {
      Flash.clear()
  });
}]);




