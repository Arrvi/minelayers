const FIELD_LAND = 'land';
const FIELD_MINE = 'mine';
class Field {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.reset();
	}

	reset() {
		this.makeLand();
	}

	get land() {
		return this.type == FIELD_LAND;
	}
	get mine() {
		return this.type == FIELD_MINE;
	}

	setNeighbours(up, right, down, left) {
		this.neighbours = [up, right, down, left];
	}

	makeLand() {
		this.type = FIELD_LAND;
		this.owner = null;
	}
	makeMine(owner) {
		this.type = FIELD_MINE;
		this.owner = owner;
	}

	trigger() {
		if (!this.mine) return;
		this.makeLand();
		let points = this.neighbours.reduce(function(sum, elem){
			return sum + elem.trigger();
		}, 1);
		return points;
	}
}