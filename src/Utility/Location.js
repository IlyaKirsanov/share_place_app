//?https://developers.google.com/maps/documentation/geocoding/intro

const GOOGLE_API_KEY = 'AIzaSyAU-ciWY0OzIzvFHzfVJfmqdg8rW7DZ-do';

export async function getAddressFromCoords(coords) {
	const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat},${coords.lng}&key=${GOOGLE_API_KEY}`);

	if (!response.ok) {
		throw new Error('Faild to fetch coordinates. Try again!')
	}
	const data = await response.json();
	if (data.error_message) {
		throw new Error(data.error_message);
	}

	const address = data.results[0].formatted_address;
	return address;
}

export async function getCoordsFromAddress(address) {
	const urlAddress = encodeURI(address); //глобальный метод для конверта строки в адресс для URL читаемого формата
	const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${urlAddress}&key=${GOOGLE_API_KEY}`);

	if (!response.ok) {
		throw new Error('Faild to fetch coordinates. Try again!')
	}
	const data = await response.json();
	if (data.error_message) {
		throw new Error(data.error_message);
	}

	const coordinates = data.results[0].geometry.location;
	return coordinates;
}