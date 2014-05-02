var Main = function ($scope) {
  $scope.maps = [{ name: 'Default', fog: false, tiles: [] }];
  $scope.allTiles = [
    { name: "White", num: 1 }
    , { name: "Black", num: 2 }
    , { name: "Left Turn", num: 3 }
    , { name: "Right Turn", num: 4 }
    , { name: "Straight", num: 5 }
    , { name: "T", num: 6 }
    , { name: "4 Corners", num: 7 }
    , { name: "2 Corners", num: 8 }
    , { name: "Pong Left", num: 9 }
    , { name: "Pong Right", num: 10 }
    , { name: "One wall", num: 11 }
    , { name: "Two walls", num: 12 }
    , { name: "Three Walls", num: 13 }
  ];
  $scope.allFlags = [
    { name: "None", value: "none" }
    , { name: "Blue", value: "blue" }
    , { name: "Green", value: "green" }
    , { name: "Yellow", value: "yellow" }
    , { name: "Orange", value: "orange" }
    , { name: "Purple", value: "purple" }
    , { name: "Red", value: "red" }
  ];
  $scope.initialize = function() {
    var data = localStorage.getItem('tiles');
    if (data !== null) {
      $scope.maps = JSON.parse(data);
      // for (var i in $scope.maps[0].tiles) {
      //   $scope.maps[0].tiles[i].poi = false;
      // }
    }
  };
  $scope.rotateClockwise = function(tile) {
    var num = parseInt(tile.rotate, 10);
    if (num === 270) {
      num = 0;
    } else {
      num = num + 90;
    }
    tile.rotate = num;
    $scope.saveMap();
  };
  $scope.saveMap = function() {
    localStorage.setItem('tiles', JSON.stringify($scope.maps));
  };
  $scope.nextSource = function(src) {
    if (src === $scope.alltiles.length) {
      return 1;
    } else {
      return src + 1;
    }
    $scope.saveMap();
  };
  $scope.toggleGlobalFog = function() {
    $scope.map.fog = !$scope.map.fog;
    $scope.saveMap();
  };
  $scope.toggleFog = function(tile) {
    tile.fog = !tile.fog;
    $scope.saveMap();
  };
  $scope.togglePoi = function(tile) {
    tile.poi = !tile.poi;
    $scope.saveMap();
  }
  $scope.addTile = function() {
    $scope.maps[0].tiles.push({
      src: 1, rotate: 0
    });
    $('#tiles').sortable("refresh");
  };
  $scope.sortableOptions = {
    items: "> .tile"
  };
  $scope.initialize();
};
var app = angular.module('dnd-tiles', ['ui.sortable']);
app.controller('Main',['$scope','$http', Main]);

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