'use strict';

var photoAlbumServices = angular.module('photoAlbumServices', ['ngResource', 'cloudinary']);

photoAlbumServices.factory('album', ['$rootScope', '$resource', 'cloudinary',
  function($rootScope, $resource, cloudinary){
    // instead of maintaining the list of images, we rely on the 'myphotoalbum' tag
    // and simply retrieve a list of all images with that tag.
    var url = cloudinary.url('myphotoalbum', {format: 'json', type: 'list'});
    //cache bust
    url = url + "?" + Math.ceil(new Date().getTime()/1000);
    return $resource(url, {}, {
      photos: {method:'GET', isArray:false}
    });
  }])

//looks like this service retrieves the pictures from cloudinary


.factory('PostsAPI', ['$resource', function($resource) {
  return $resource('/api/post');
}])

.factory('AllPosts', ['$resource', function($resource) {
  return $resource('/api/post');
}])

.factory('UserPosts', ['$resource', function($resource) {
  return $resource('/api/post/user')
}])

.factory('AllPostsDelete', ['$resource', function($resource) {
  return $resource('/api/post/:id', {id: '@id'} 
  )
}])

.factory('FindPost', ['$resource', function($resource){
  return $resource('/api/post/:id/search', {id: '@id'}, {
    query:  {method:'GET', params: {id: '@id'}, isArray:true}
  });
}])

.factory('Auth', ['$window', function($window){
  return {
    saveToken: function(token) {
      $window.localStorage['token'] = token;
    },
    getToken: function() {
      return $window.localStorage['token'];
    },
    removeToken: function() {
      $window.localStorage.removeItem('token');
    },
    isLoggedIn: function() {
      var token = this.getToken();
      return token ? true : false;
    },
    currentUser: function() {
      if (this.isLoggedIn()) {
        var token = this.getToken()
        try {
          var tokenHeader = token.split('.')[0];
          var tokenPayload = token.split('.')[1];
          var decodedPayload = JSON.parse($window.atob(tokenPayload));
          var user = decodedPayload._doc;
          return user;
        } catch (err) {
          console.log(err);
          return false;
        }
      }
    }
  } 
}])

// Adds a JWT auth token to the header of all http requests unless they are
// listed in excludedEndpoints[].
.factory('AuthInterceptor', ['Auth', function(Auth) {
    // If querying other APIs, add URLs to this array.
    // Star Wars API added as example.
  var excludedEndpoints = [
    'https://api.cloudinary.com/'
  ];

  return {
    request: function(config) {
      var token = Auth.getToken();

      var exclude = false
      excludedEndpoints.forEach(function(endpoint){
        if(config.url.indexOf(endpoint)>-1)
          exclude = true
      })

      if (token && !exclude) {
        config.headers.Authorization = 'Bearer ' + token;
      }
      return config;
    }
  }
}]);