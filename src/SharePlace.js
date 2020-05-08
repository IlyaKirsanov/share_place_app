class PlaceFinder {
	constructor() {
		const addressForm = document.querySelector('form');
		const locateUserBtn = document.getElementById('locate-btn');

		locateUserBtn.addEventListener('click', this.locateUserHandler)
		addressForm.addEventListener('submit', this.findAdressHndler)

	}

	locateUserHandler() {
		if (!navigator.geolocation) {
			alert('Location feature is not available int your version of browser')
			return;
		}

		navigator.geolocation.getCurrentPosition(
			successResult => {
				console.log(successResult);
				const cordinates = {
					lat: successResult.coords.latitude, //+ Math.random() * 50,
					lng: successResult.coords.longitude //+ Math.random() * 50
				};
				console.log(cordinates);
			}, error => {
				alert('Could not locate you. Please enter adress manualy')
			})
	}

	findAdressHndler() {
		console.log('ada')
	}
}


new PlaceFinder();