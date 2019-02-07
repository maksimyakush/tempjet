import {JetView, plugins} from 'webix-jet';
import {contacts, dpContacts} from 'models/contacts';
import files from 'models/files';

export default class DataView extends JetView {
    config() {
        return {
            cols: [
                {
                    view: 'datatable',
                    localId: 'datatable',
                    autoConfig: true,
                    css: 'webix_shadow_medium'
                },
                {
                    view: 'datatable',
                    localId: 'datatable1',
                    autoConfig: true,
                    css: 'webix_shadow_medium'
                },
                {
                    view: 'form',
                    localId: 'form',
                    width: 640,
                    rows: [
                        {
                            margin: 15,
                            cols: [
                                {
                                    rows: [
                                        {
                                            view: 'text',
                                            name: 'FirstName',
                                            label: 'Name',
                                            value: 'Alex Brown'
                                        },
                                        {
                                            view: 'text',
                                            name: 'LastName',
                                            label: 'Email',
                                            value: 'alexb@hotmail.com'
                                        },
                                        {
                                            height: 80
                                        }
                                    ]
                                },
                                {
                                    rows: [
                                        {
                                            view: 'uploader',
                                            id: 'files',
                                            name: 'attachments',
                                            value: 'Attach File',
                                            link: 'mylist',
                                            upload: '/server/files',
                                            autosend: false
                                        },
                                        {
                                            view: 'list',
                                            id: 'mylist',
                                            type: 'uploader',
                                            autoheight: true,
                                            borderless: true
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            view: 'button',
                            value: 'Save',
                            click: () => {
                                contacts.add(this.$$('form').getValues());
                                console.log(contacts.data.pull)
                            }
                        },
                        {
                            view: 'template',
                            id: 'result',
                            height: 200
                        }
                    ]
                }
            ]
        };
    }
    urlChange() {}
    init(view) {
        this.$$('datatable').parse(contacts);
        this.$$('datatable1').parse(files);
        this.on(dpContacts, 'onAfterInsert', (obj) => {
            $$('files').files.data.each((file) => {
                file.formData = {
                    userId: obj.id
                };
            });
            this.$$('files').send();
        });

        // this.on(this.$$("uploader"), "onBeforeFileAdd", obj => {
        // 	const { name, file, sizetext } = obj;

        // 	this.files = {
        // 		ContactID: this.$$("datatable").getSelectedId(),
        // 		FileName: name,
        // 		FileSize: sizetext
        // 		// ChangeDate: file.lastModifiedDate
        // 	};
        // });
    }
}
