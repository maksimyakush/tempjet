import {JetView} from 'webix-jet';
import ContactForm from './contactForm';

export default class FormPopupView extends JetView {
    config() {
        this.ContactForm = new ContactForm(this.app, '', this);
        return {
            view: 'popup',
            modal: true,
            width: 500,
            height: 600,
            position: 'center',
            body: this.ContactForm
        };
    }
    showWindow(item) {
        this.getRoot().show();
        this.ContactForm.onShow(item);
    }
}
