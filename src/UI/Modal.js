export class Modal {
    constructor(contentID, fallbackText) {
        this.fallbackText = fallbackText;
        this.contentTemplateEl = document.getElementById(contentID);
        this.modalTemplateEl = document.getElementById('modal-template');
    }    

    show() {
        if ('content' in document.createElement('template')) {
            const modalEls = document.importNode(this.modalTemplateEl.content, true);
            this.modalElement = modalEls.querySelector('.modal');
            this.backdropElement = modalEls.querySelector('.backdrop');
            const contentElement  = document.importNode(this.contentTemplateEl.content, true);

            this.modalElement.appendChild(contentElement);

            document.body.insertAdjacentElement('afterbegin', this.backdropElement);
            document.body.insertAdjacentElement('afterbegin', this.modalElement);
        } else {
            alert(this.fallbackText);
        }
    };

    hide() {
        if (this.modalElement) {
            document.body.removeChild(this.modalElement);
            this.modalElement = null;
        }
        if (this.backdropElement) {
            document.body.removeChild(this.backdropElement);
            this.backdropElement = null;
        }
    };
}