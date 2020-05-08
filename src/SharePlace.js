import { Modal } from './UI/Modal';

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

		const modal = new Modal('loading-modal-content', 'Loading location, please wait!')
		modal.show();

		navigator.geolocation.getCurrentPosition(
			successResult => {
				modal.hide();
				console.log(successResult);
				const cordinates = {
					lat: successResult.coords.latitude, //+ Math.random() * 50,
					lng: successResult.coords.longitude //+ Math.random() * 50
				};
				console.log(cordinates);
			}, error => {
				modal.hide();
				alert('Could not locate you. Please enter adress manualy')
			})
	}

	findAdressHndler() {
		console.log('ada')
	}
}


new PlaceFinder();