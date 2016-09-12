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

	score(points) {
		this.points += points;
	}

	addField(field) {
		if (field.owner == this) this.fields++;
	}
	removeField(field) {
		if (field.owner == this) this.fields--;
	}
}