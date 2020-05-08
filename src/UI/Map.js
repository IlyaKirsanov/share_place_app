export class Map {
	constructor(coords) {
		this.render(coords)
	}

	render(cordinates) {
		if (!google) {
			alert('Could not load google maps libriary')
			return;
		}

		const map = new google.maps.Map(document.getElementById('map'), {
			center: cordinates,
			zoom: 16
		});

		new google.maps.Marker({
			position: cordinates,
			map: map
		});
	}
}