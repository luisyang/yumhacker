ListsCollection = Backbone.Collection.extend({
    model: List,

    url: '/api/lists',

    initialize: function () {
        var params = $.deparam(decodeURIComponent(window.location.search.slice(1)));
        this.requested_page = (params.page ? Number(params.page) : 1);
    },

    parse: function (res) {
        this.current_page = res.current_page;
        this.per_page = res.per_page;
        this.total_pages = res.total_pages;
        this.offset = res.offset;
        this.total = res.total;
        return res.lists;
    },

    assignUrl: function (id) {
        // if (id) {
        //     this.url = '/api/users/' + id + '/lists';
        // } else {
        //     this.url = '/api/lists'
        // }
    },

    predicate: function () {
        return { page: this.requested_page };
    }
});
