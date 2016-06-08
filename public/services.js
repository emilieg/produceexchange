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
  return $resource('/api/allposts')
}])

.factory('AllPostsDelete', ['$resource', function($resource) {
  return $resource('/api/allposts/:id', {id: '@id'} 
  )
}])

