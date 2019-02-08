import {JetView, plugins} from 'webix-jet';
import {
    addContactAndFilesAjaxRequest,
    contacts,
    getContactFilesAjaxRequest
} from '../models/contacts';

export default class DataView extends JetView {
    config() {
        return {
            cols: [
                {
                    view: 'datatable',
                    localId: 'datatable',
                    autoConfig: true,
                    select: true,
                    css: 'webix_shadow_medium',
                    columns: [
                        {
                            id: 'id'
                        },
                        {
                            id: 'FirstName',
                            title: 'FirstName'
                        }
                    ]
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
                                            label: 'Name'
                                        },
                                        {
                                            view: 'text',
                                            name: 'LastName',
                                            label: 'Email'
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
                                addContactAndFilesAjaxRequest(this.$$('form').getValues()).then(
                                    (contact) => {
                                        const {FirstName, LastName, id} = contact.json();
                                        contacts.add({FirstName, LastName, id});
                                        if (this.$$('files') && this.$$('files').files.count()) {
                                            this.$$('files').files.data.each((file) => {
                                                file.formData = {contactId: id};
                                            });
                                        }
                                        this.$$('files').send();
                                    }
                                );
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
        this.$$('datatable').sync(contacts);
        webix.promise.all([contacts.waitData]).then(() => {
            console.log(contacts.data);
            if (contacts.count()) {
                this.$$('datatable').select(contacts.getFirstId());
            }
        });
        this.on(this.$$('datatable'), 'onAfterSelect', (id) => {
            getContactFilesAjaxRequest(id).then((files) => {
                this.$$('datatable1').clearAll();
                const userFiles = files.json();
                this.$$('datatable1').parse(userFiles)
            })
        });
        // this.on(dpContacts, 'onAfterInsert', (obj) => {
        //     files.filter();
        //     console.log('hello');
        //     if (obj) {
        //         console.log(obj.id);
        //         this.$$('files').files.data.each((file) => {
        //             file.formData = {contactId: obj.id};
        //             console.log(file);
        //             files.add({contactId: obj.id, name: file.name});
        //             console.log(files.data.pull);
        //         });
        //     }
        // });

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
