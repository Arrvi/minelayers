class Player {
	constructor(color, name) {
		this.color = color;
		this.name = name;
		this.reset();
	}

	reset() {
		this.points = 0;
		this.fields = 0;
	}
}