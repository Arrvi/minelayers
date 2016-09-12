var app = angular.module('minelayers', []);
app.controller('MineLayersController', function MineLayersController($scope) {
  $scope.boardConfig = {
    width: 10,
    height: 10
  };
  $scope.canExplodeOthers = true;
  $scope.currentPlayer = 0;
  $scope.players = [
    'red',
    'blue'
  ];
  $scope.player = function player() {
    return $scope.players[$scope.currentPlayer]
  };

  $scope.board = makeBoard($scope.boardConfig);

  function makeBoard(config) {
    var board = [];
    for (let y = 0; y < config.height; y++) {
      board[y] = [];
      for (let x = 0; x < config.width; x++) {
        board[y][x] = {
          type: 'land',
          x: x,
          y: y
        };
      }
    }

    return board;
  }

  $scope.setMine = function(field) {
    if (field.type == 'land') {
      field.type = 'mine';
      field.owner = $scope.player();
    } else if (field.type == 'mine')
      explode(field);
    nextPlayer();
  }

  function explode(field) {
    if (field.type != 'mine') return;
    var neighbours = [
      [field.x - 1, field.y],
      [field.x, field.y - 1],
      [field.x + 1, field.y],
      [field.x, field.y + 1]
    ];
    field.type = 'land';
    neighbours.forEach(function(elem) {
      if (elem[0] < 0 || elem[0] >= $scope.boardConfig.width || elem[1] < 0 || elem[1] >= $scope.boardConfig.height)
        return;
      explode($scope.board[elem[1]][elem[0]]);
    });
  }

  function nextPlayer() {
    $scope.currentPlayer++;
    $scope.currentPlayer %= $scope.players.length;
  }
});
