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
			const modalElement = modalElements.querySelector('.modal');
			const backdropElement = modalElements.querySelector('.backdrop');
			const contentElement = document.importNode(this.contentTemplateEl.content, true);

			modalElement.appendChild(contentElement);
			document.body.insertAdjacentElement('afterbegin', modalElement);
			document.body.insertAdjacentElement('afterbegin', backdropElement);
		} else {
			alert(this.fallBackText)
		}
	}

	hide() { }
}