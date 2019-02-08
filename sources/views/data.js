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
                                contacts.add(this.$$('form').getValues());
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
        webix.promise.all([contacts.waitData, files.waitData]).then(() => {
            console.log(contacts.data);
            if(contacts.count()) {
                this.$$('datatable').select(contacts.getFirstId());

            }
        });
        this.on(this.$$('datatable'), 'onAfterSelect', (id) => {

            files.filter((obj) => {
                if(obj.contactId && id) {

                    return id == obj.contactId;
                }
            })
        });
        this.$$('datatable1').parse(files);
        this.on(dpContacts, 'onAfterInsert', (obj) => {
            files.filter();
            console.log('hello');
            if (obj) {
                console.log(obj.id);
                this.$$('files').files.data.each((file) => {
                    file.formData = {contactId: obj.id};
                    console.log(file);
                    files.add({contactId: obj.id, name: file.name});
                    console.log(files.data.pull);
                });
            }
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
