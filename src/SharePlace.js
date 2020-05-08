import { Modal } from './UI/Modal';
import { Map } from './UI/Map';
import { getCoordsFromAddress, getAddressFromCoords } from './Utility/Location';


class PlaceFinder {
	constructor() {
		const addressForm = document.querySelector('form');
		const locateUserBtn = document.getElementById('locate-btn');
		this.shareBtn = document.getElementById('share-btn')

		locateUserBtn.addEventListener('click', this.locateUserHandler.bind(this))
		addressForm.addEventListener('submit', this.findAddressHndler.bind(this))
		this.shareBtn.addEventListener('click', this.sharePlaceHandler)

	}

	sharePlaceHandler() {
		const sharedLinkInputElement = document.getElementById('share-link');
		sharedLinkInputElement.select();
		if (!navigator.clipboard) {
			return;
		}

		navigator.clipboard.writeText(sharedLinkInputElement.value)
			.then(() => {
				alert('Copied to clipboard!')
			})
			.catch(err => console.log(err.message));
	}

	selectPlace(coordinates, address) {
		if (this.map) {
			this.map.render(coordinates);
		} else {
			this.map = new Map(coordinates);
		}
		this.shareBtn.disabled = false;
		const sharedLinkInputElement = document.getElementById('share-link');
		sharedLinkInputElement.value = `${location.origin}/my-place?address=${encodeURI(address)}&lat=${coordinates.lat}&lng=${coordinates.lng}`
	}

	locateUserHandler() {
		if (!navigator.geolocation) {
			alert('Location feature is not available int your version of browser')
			return;
		}

		const modal = new Modal('loading-modal-content', 'Loading location, please wait!')
		modal.show();

		navigator.geolocation.getCurrentPosition(
			async successResult => {
				modal.hide();
				const coordinates = {
					lat: successResult.coords.latitude, //+ Math.random() * 50,
					lng: successResult.coords.longitude //+ Math.random() * 50
				};
				console.log(coordinates);
				const address = await getAddressFromCoords(coordinates);
				modal.hide();
				this.selectPlace(coordinates, address);
				//контекст вызова ф-ии совпадает с this в successResult, т.е. контекст вызова ф-ии хендлера, а так как это ивентХендлер, то контекстом будет глобальная область, чтобы это избежать в конструкторе нужно забайндить this 
			}, error => {
				modal.hide();
				alert('Could not locate you. Please enter address manualy')
			})
	}

	async findAddressHndler(event) {
		event.preventDefault();
		const address = event.target.querySelector('input').value;
		if (!address || address.trim().length === 0) {
			alert('Invalid input address');
			return
		}

		const modal = new Modal(
			'loading-modal-content',
			'Loading location - please wait'
		);

		modal.show();
		try {

			const coordinates = await getCoordsFromAddress(address);
			this.selectPlace(coordinates, address);
		} catch (err) {
			alert(err.message);
		}

		modal.hide();

	}
}


new PlaceFinder();