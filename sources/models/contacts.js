webix.proxy.mongo = webix.extend(
    {
        $proxy: true,
        load(view, callback) {
            const url = this.source;
            return webix
                .ajax()
                .get(url)
                .then((res) => {
                    const data = res.json().map((item) => {
                        item.id = item._id;
                        delete item._id;
                        return item;
                    });
                    return webix.ajax.$callback(view, callback, {data});
                });
        }
        // save(view, callback) {
        //     const url = this.source;
        //     return webix
        //         .ajax()
        //         .get(url)
        //         .then((res) => {
        //             const data = res.json().map((item) => {
        //                 item.id = item._id;
        //                 delete item._id;
        //                 return item;
        //             });
        //             return webix.ajax.$callback(view, callback, {data});
        //         });
        // }
    },
    webix.proxy.rest
);
export const contacts = new webix.DataCollection({
    url: 'mongo->/server/contacts'
});

export const addContactAndFilesAjaxRequest = data => webix.ajax().post('/server/contacts/', data);

export const getContactFilesAjaxRequest = id => webix.ajax(`/server/files/${id}`);
