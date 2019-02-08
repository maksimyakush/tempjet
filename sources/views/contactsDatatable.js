import {JetView, plugins} from 'webix-jet';

import {statuses} from '../models/statuses';

import {contacts} from '../models/contacts';
import FormPopup from './form-popup';

export default class ContactsView extends JetView {
    config() {
        return {
            view: 'datatable',
            localId: 'contacts:datatable',
            borderless: true,
            select: true,
            scroll: 'y',

            columns: [
                {
                    id: 'FirstName',
                    header: ['First Name', {content: 'textFilter'}],
                    fillspace: true,
                    sort: 'string'
                },
                {
                    id: 'LastName',
                    header: ['Last Name', {content: 'textFilter'}],
                    fillspace: true,
                    sort: 'string'
                },

                {
                    id: 'Email',
                    header: ['Email', {content: 'textFilter'}],
                    sort: 'string'
                },

                {
                    id: 'Phone',
                    header: ['Phone', {content: 'textFilter'}],
                    sort: 'string'
                },

                {
                    id: 'StartDate',
                    header: ['Joining Date', {content: 'dateFilter'}],
                    sort: 'date'
                },
                {
                    id: 'Status',
                    header: ['Status', {content: 'selectFilter'}],

                    collection: statuses,
                    sort: 'string'
                }
            ]
        };
    }
    init() {
        this.$$('contacts:datatable').sync(contacts);
        this.on(this.$$('contacts:datatable'), 'onAfterSelect', (id) => {
            this.formPopup.showWindow(id);
        });
        this.formPopup = this.ui(FormPopup);
    }
}
