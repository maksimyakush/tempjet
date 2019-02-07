webix.proxy.mongo = webix.extend({
    $proxy: true,
    load: function(view, callback) {
        var url;
        url = this.source;
        return webix.ajax().get(url).then(function(res) {
            var data;
            data = res.json().map(function(item) {
                item.id = item._id;
                delete item._id;
                return item;
            });
            return webix.ajax.$callback(view, callback, {
                data: data
            });
        });
    }
}, webix.proxy.rest);
export const contacts =  new webix.DataCollection({url: '/server/contacts', save: 'mongo->/server/contacts'});
export const dpContacts = webix.dp(contacts);
