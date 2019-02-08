import {JetView} from 'webix-jet';
import {statuses} from 'models/statuses';

import {contacts} from '../models/contacts';

export default class ContactsFormView extends JetView {
    constructor(app, name, Popup) {
        super(app, name);
        this.Popup = Popup;
    }
    config() {
        const contactsFormLabel = {
            view: 'label',
            label: 'Add(Edit) Contact',
            marginX: 10,
            localId: 'contacts:formLabel'
        };
        const contactsForm = {
            view: 'form',
            autoheight: false,
            localId: 'contacts:form',
            elementsConfig: {
                margin: 50,
                labelWidth: 150
            },
            rules: {
                FirstName: webix.rules.isNotEmpty,
                LastName: webix.rules.isNotEmpty,
                Email: webix.rules.isNotEmpty,
                Age: webix.rules.isNotEmpty
            },
            elements: [
                {
                    cols: [
                        {
                            view: 'text',
                            label: 'First Name',
                            name: 'FirstName',
                            required: true,
                            invalidMessage: 'First Name is requred!'
                        },
                        {
                            view: 'text',
                            label: 'Last Name',
                            name: 'LastName',
                            height: 50,
                            required: true,
                            invalidMessage: 'Last Name is requred!'
                        }
                    ]
                },
                {
                    cols: [
                        {
                            view: 'text',
                            label: 'Email',
                            name: 'Email',
                            type: 'email',
                            required: true,
                            invalidMessage: 'Email is requred!'
                        },
                        {
                            view: 'datepicker',
                            label: 'Joining Date',
                            name: 'StartDate',
                            format: webix.Date.dateToStr('%d %M %Y')
                        }
                    ]
                },
                {
                    cols: [
                        {
                            view: 'richselect',
                            label: 'Status',
                            name: 'StatusID',
                            options: {
                                body: {
                                    data: statuses,
                                    template: obj => obj.value
                                }
                            },
                            required: true,
                            invalidMessage: 'Select your status!'
                        },
                        {
                            view: 'text',
                            label: 'Phone',
                            name: 'Phone'
                        }
                    ]
                }
            ]
        };
        return {
            rows: [contactsFormLabel, contactsForm]
        };
    }
    onShow(id) {
        this.$$('contacts:form').setValues(contacts.getItem(id));
    }
    init() {
        if (!this.Popup) this.onShow();
    }
}
