export class Modal {
	constructor(contentId) {
		this.fallBackText = this.fallBackText;
		this.contentTemplateEl = document.getElementById(contentId);
		this.modalTemplateEl = document.getElementById('modal-template');
	}
	show() {
		/*
		?если браузер не поддерживает темплейты, то при попытке получить контент у несуществующего тега - получим undefined
		?и попадем в else, и если сработает, то возьмем теплейт и будем его наполнять
		*/
		if ('content' in document.createElement('template')) {
			const modalElements = document.importNode(this.modalTemplateEl.content, true)
			//записав через this они доступны как поля класса, а не локальные переменные
			this.modalElement = modalElements.querySelector('.modal');
			this.backdropElement = modalElements.querySelector('.backdrop');
			const contentElement = document.importNode(this.contentTemplateEl.content, true);

			this.modalElement.appendChild(contentElement);
			document.body.insertAdjacentElement('afterbegin', this.modalElement);
			document.body.insertAdjacentElement('afterbegin', this.backdropElement);
		} else {
			alert(this.fallBackText)
		}
	}

	hide() {
		if (this.modalElement) {
			document.body.removeChild(this.modalElement);
			document.body.removeChild(this.backdropElement);
			this.modalElement = null;
			this.backdropElement = null; //для сборки мусора и не получения memoryLeaks
			console.log('modal hide() end')
		}
	}
}