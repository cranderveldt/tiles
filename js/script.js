/*jQuery(document).ready(function(){
  
});*/
var Main = function ($scope) {
  $scope.maps = [{ name: 'Default', tiles: [] }];
  $.cookie.json = true;
  $scope.alltiles = [
    { name: "Left Turn", num: 1 }
    , { name: "Right Turn", num: 2 }
    , { name: "Straight", num: 3 }
    , { name: "T", num: 4 }
    , { name: "4 Corners", num: 5 }
    , { name: "2 Corners", num: 6 }
    , { name: "Pong Left", num: 7 }
    , { name: "Pong Right", num: 8 }
    , { name: "One wall", num: 9 }
    , { name: "Two walls", num: 10 }
    , { name: "Three Walls", num: 11 }
    , { name: "White", num: 12 }
    , { name: "Black", num: 13 }
  ];
  $scope.initialize = function() {
    var cookie = $.cookie('tiles');
    if (cookie !== undefined) {
      $scope.maps = cookie;
    }
    
  };
  $scope.rotateClockwise = function(str) {
    var num = parseInt(str, 10);
    if (num === 270) {
      return 0;
    } else {
      return num + 90;
    }
  };
  
  $scope.saveMap = function() {
    $.cookie('tiles', $scope.maps, { expires: 30, path: '/' });
  };
  $scope.nextSource = function(src) {
    if (src === $scope.alltiles.length) {
      return 1;
    } else {
      return src + 1;
    }
  };
  $scope.addTile = function() {
    $scope.$apply(function() {
      $scope.maps[0].tiles.push({
        src: '1', rotate: '0'
      });
      $scope.saveMap();
    });
  };
  $scope.sortableOptions = {
    items: "> .tile"
  };
  $scope.initialize();
};
var app = angular.module('dnd-tiles', ['ui.sortable']);
app.controller('Main',['$scope','$http', Main]);
app.directive('tlRotate', function () {
  return {
    replace: false,
    transclude: false,
    restrict: 'A',
    scope: false,
    link: function ($scope, element, attrs) {
      element.on('click', function(e) {
        var tileIndex = $('.tile').index(element.parent());
        $scope.$apply(function() {
          $scope.maps[0].tiles[tileIndex].rotate = $scope.rotateClockwise(attrs.tlRotate);
          $scope.saveMap();
        });
      });
    }
  };
});
app.directive('tlSource', function () {
  return {
    replace: false,
    transclude: false,
    restrict: 'A',
    scope: false,
    link: function ($scope, element, attrs) {
      element.on('change', function(e) {
        var tileIndex = $('.tile').index(element.parent().parent());
        $scope.$apply(function() {
          $scope.maps[0].tiles[tileIndex].src = element.val();
          $scope.saveMap();
        });
      });
    }
  };
});
app.directive('tlAddTile', function () {
  return {
    replace: false,
    transclude: false,
    restrict: 'A',
    scope: false,
    link: function ($scope, element, attrs) {
      element.on('click', function(e) {
        $scope.addTile();
        $('#tiles').sortable("refresh");
      });
    }
  };
});
app.directive('tlSortable', function () {
  return {
    replace: false,
    transclude: false,
    restrict: 'A',
    scope: false,
    link: function ($scope, element, attrs) {
      element.on('sortchange', function(e) {
        $scope.saveMap();
      });
    }
  };
});