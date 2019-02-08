webix.proxy.mongo1 = webix.extend(
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
                        delete item.__v;
                        return item;
                    });
                    return webix.ajax.$callback(view, callback, {data});
                });
        }
    },
    webix.proxy.rest
);

export default new webix.DataCollection({
    url: 'mongo1->/server/files',
    save: '/server/files',
    scheme: {
        $save: (obj) => {
            // $$('files').send();
        }
    }
});
