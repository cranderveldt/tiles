var DND = {};
DND.rotateClockwise = function(str) {
  var num = parseInt(str, 10);
  if (num === 270) {
    return 0;
  } else {
    return num + 90;
  }
};
jQuery(document).ready(function($) {
  DND.initialize = function(){
    var cookie = $.cookie('tiles');
    if (cookie !== undefined) {

    } else {

    }
  };
  $('#tiles .tile').draggable({
    grid: [100, 100]
  });
  DND.initialize();
});

var Main = function ($scope) {
  $scope.maps = [
    {
      name: 'Default'
      , tiles: [
        {
          src: '1'
          , rotate: '0'
        }
        , {
          src: '2'
          , rotate: '0'
        }
        , {
          src: '3'
          , rotate: '0'
        }
        , {
          src: '4'
          , rotate: '0'
        }
        , {
          src: '5'
          , rotate: '0'
        }
        , {
          src: '6'
          , rotate: '0'
        }
        , {
          src: '7'
          , rotate: '0'
        }
        , {
          src: '8'
          , rotate: '0'
        }
        , {
          src: '9'
          , rotate: '0'
        }
        , {
          src: '10'
          , rotate: '0'
        }
        , {
          src: '11'
          , rotate: '0'
        }
      ]
    }
  ]
};
var app = angular.module('dnd-tiles', []);
app.controller('Main',['$scope','$http', Main]);
app.directive('tlRotate', function () {
  return {
    replace: false,
    transclude: false,
    restrict: 'A',
    scope: false,
    link: function ($scope, element, attrs) {
      element.on('click', function(e) {
        var degree = DND.rotateClockwise(attrs.tlRotate);
        element.removeClass().addClass('rotate' + degree + 'deg');
      });
    }
  };
});