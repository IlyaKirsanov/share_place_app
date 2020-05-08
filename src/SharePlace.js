import { Modal } from './UI/Modal';
import { Map } from './UI/Map';
import { getCoordsFromAdress } from './Utility/Location';


class PlaceFinder {
	constructor() {
		const addressForm = document.querySelector('form');
		const locateUserBtn = document.getElementById('locate-btn');

		locateUserBtn.addEventListener('click', this.locateUserHandler.bind(this))
		addressForm.addEventListener('submit', this.findAdressHndler.bind(this))

	}

	selectPlace(coordinates) {
		if (this.map) {
			this.map.render(coordinates);
		} else {
			this.map = new Map(coordinates);
		}
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
				const coordinates = {
					lat: successResult.coords.latitude, //+ Math.random() * 50,
					lng: successResult.coords.longitude //+ Math.random() * 50
				};
				console.log(coordinates);
				this.selectPlace(coordinates);
				//контекст вызова ф-ии совпадает с this в successResult, т.е. контекст вызова ф-ии хендлера, а так как это ивентХендлер, то контекстом будет глобальная область, чтобы это избежать в конструкторе нужно забайндить this 
			}, error => {
				modal.hide();
				alert('Could not locate you. Please enter adress manualy')
			})
	}

	async findAdressHndler(event) {
		event.preventDefault();
		const adress = event.target.querySelector('input').value;
		if (!adress || adress.trim().length === 0) {
			alert('Invalid input adress');
			return
		}

		const modal = new Modal(
			'loading-modal-content',
			'Loading location - please wait'
		);

		modal.show();
		try {

			const coordinates = await getCoordsFromAdress(adress);
			this.selectPlace(coordinates);
		} catch (err) {
			alert(err.message);
		}

		modal.hide();

	}
}


new PlaceFinder();