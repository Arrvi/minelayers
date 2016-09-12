var app = angular.module('minelayers', []);
app.controller('MineLayersController', function MineLayersController($scope) {
  $scope.boardConfig = {
    width: 10,
    height: 10
  };
  $scope.canExplodeOthers = true;
  $scope.numberOfPlayers = 2;
  $scope.currentPlayer = 0;
  let players = [
    new Player('red', 'Red'),
    new Player('blue', 'Blue'),
    new Player('green', 'Green')
  ];
  $scope.players = [];
  for (let i = 0; i < $scope.numberOfPlayers; i++) {
    $scope.players.push(players[i]);
  }
  $scope.player = function player() {
    return $scope.players[$scope.currentPlayer]
  };

  $scope.board = makeBoard($scope.boardConfig);

  function makeBoard(config) {
    var board = [];
    for (let y = 0; y < config.height; y++) {
      board[y] = [];
      for (let x = 0; x < config.width; x++) {
        board[y][x] = new Field(x, y);
      }
    }
    for (let y = 0; y < config.height; y++) {
      for (let x = 0; x < config.width; x++) {
        let up, right, down, left;
        if ( y > 0 ) up = board[y-1][x];
        if ( x < config.width-1) right = board[y][x+1];
        if ( y < config.height-1 ) down = board[y+1][x];
        if ( x > 0 ) left = board[y][x-1];
        board[y][x].setNeighbours(up, right, down, left);
      }
    }
    return board;
  }

  $scope.trigger = function(field) {
    if ( field.land ) {
      field.makeMine($scope.player());
    } else if ( field.mine ) {
      let points = field.trigger();
      $scope.player().score(points);
    }
    nextPlayer();
  }

  function nextPlayer() {
    $scope.currentPlayer++;
    $scope.currentPlayer %= $scope.numberOfPlayers;
  }

});
