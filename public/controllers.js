// 'use strict';

/* Controllers */

var photoAlbumControllers = angular.module('photoAlbumControllers',  ['ngFileUpload',
                                                                      'photoAlbumServices',
                                                                      'ngAnimate',
                                                                      'ui.bootstrap']);

photoAlbumControllers.controller('photoUploadCtrl', ['$scope',
                                                     '$rootScope',
                                                     '$routeParams',
                                                     '$location',
                                                     'Upload',
                                                     'cloudinary',
                                                     'PostsAPI',
                                                     'AllPosts',
                                                     
  /* Uploading with Angular File Upload */
  function($scope, $rootScope, $routeParams, $location, $upload, cloudinary, PostsAPI, AllPosts) {
    var d = new Date();
    $scope.title = "Image (" + d.getDate() + " - " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + ")";
    //$scope.$watch('files', function() {
    $scope.uploadFiles = function(files){
      $scope.files = files;
      if (!$scope.files) return;
      angular.forEach(files, function(file){
        if (file && !file.$error) {
          file.upload = $upload.upload({
            url: "https://api.cloudinary.com/v1_1/" + cloudinary.config().cloud_name + "/upload",
            data: {
              upload_preset: cloudinary.config().upload_preset,
              tags: 'myphotoalbum',
              context: 'photo=' + $scope.title,
              file: file
            }
          }).progress(function (e) {
            file.progress = Math.round((e.loaded * 100.0) / e.total);
            file.status = "Uploading... " + file.progress + "%";
          }).success(function (data, status, headers, config) {
            $rootScope.photos = $rootScope.photos || [];
            data.context = {custom: {photo: $scope.title}};
            file.result = data;
            $rootScope.photos.push(data);
            $scope.fileUrl = file.result.secure_url;
            $scope.public_id = file.result.public_id;
            console.log("Secure_url: " + file.result.secure_url);
            console.log("Public_id: " + file.result.public_id);
          }).error(function (data, status, headers, config) {
            file.result = data;
          });
        }
      });
    };
    //});

    /* Modify the look and fill of the dropzone when files are being dragged over it */
    $scope.dragOverClass = function($event) {
      var items = $event.dataTransfer.items;
      var hasFile = false;
      if (items != null) {
        for (var i = 0 ; i < items.length; i++) {
          if (items[i].kind == 'file') {
            hasFile = true;
            break;
          }
        }
      } else {
        hasFile = true;
      }
      return hasFile ? "dragover" : "dragover-err";
    };

    $scope.post = {
      title: '',
      description: '',
      contact_name: '',
      email: '',
      public_id: '',
      secure_url: ''
    };

    $scope.submitPost = function (){
      var newPost = {
        title: $scope.post.title, 
        description: $scope.post.description, 
        contact_name: $scope.post.contact_name, 
        email: $scope.post.email, 
        public_id: $scope.public_id, 
        secure_url: $scope.fileUrl,
      };
      console.log("newPost: ", newPost);

      PostsAPI.save(newPost, function success(data) {
        $location.path('/allposts');
      }, function error(data) {
        console.log(data);
      });
    };


  }]);



var scmanagerApp = angular.module('scmanagerApp')

scmanagerApp.controller('HomeCtrl', function() {

});

scmanagerApp.controller('AllPostCtrl', ['$q',
                                        '$scope',
                                        '$stateParams',
                                        '$routeParams',
                                        'AllPosts',
                                        'AllPostsDelete',
                                        'FindPost',
  function($q, $scope, $stateParams, $routeParams, AllPosts, AllPostsDelete, FindPost ) {
    AllPosts.query(function success(data) {
      $scope.posts = data;
      // $scope.displayAll = true;
      // $scope.displaySearch = false;
      console.log("$scope.posts", $scope.posts);
      // $scope.myInterval = 3000;
      // $scope.noWrapSlides= false;
      // $scope.active = 0;
      // $scope.currIndex = 0;
      $scope.slides = [];
      for (var i=0; i < $scope.posts.length; i ++) {
        if ($scope.posts[i].secure_url) {
          $scope.slides.push({image: $scope.posts[i].secure_url, id: $scope.currIndex++, title: $scope.posts[i].title,
            email: $scope.posts[i].email, post_id: $scope.posts[i]._id, description: $scope.posts[i].description})
        }
      }
      }, function error(data) {
        console.log(data);
      })

  $scope.claim = function(id, postIdx, post) {
    console.log(id, postIdx);
    AllPostsDelete.delete({id: id}, function success(data){
      console.log("postIdx is: ", postIdx);
      console.log(data);

      var index = $scope.posts.indexOf(post);
      $scope.posts.splice(index, 1);
      $scope.searchTerm = '';

    }, function error(data) {

    })
  }

  $scope.searchTerm = '';

    // $scope.searchPost = function(searchTerm){
    //   FindPost.query({id: searchTerm}, function success(data){
    //     console.log("success data: ", data);
    //     for (var i = 0; i < data.length; i++){
    //       $scope.title = data[i].title;
    //       $scope.description = data[i].description;
    //       $scope.contact_name = data[i].contact_name;
    //       $scope.email = data[i].email;
    //       $scope.public_id = data[i].public_id;
    //       $scope.secure_url = data[i].secure_url;
    //       $scope.id = data[i]._id;
    //       console.log("$scope.id) ", $scope.id);
    //     };
    //     $scope.displaySearch = true;
    //     $scope.displayAll = false;

    //   }, function error(data){
    //     console.log("error data: ", data);
    //   })
    // }

    $scope.matchesSearch = function(value, index, array) {
      if ($scope.searchTerm === '') {;
        return true;
      } 
      if (value.title.toLowerCase().indexOf($scope.searchTerm.toLowerCase()) > -1) {
        return true;  
      } 
        return false;
    }


}]);


