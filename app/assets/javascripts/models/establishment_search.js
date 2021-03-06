EstablishmentSearch = new (Backbone.Model.extend({
    defaults: {
        lat: 37.7749295,
        lng: -122.4194155,
        location_name: 'San Francisco, CA'        
   },

    initialize: function () {
        if ($.cookie('establishment_search')) {
            this.set(JSON.parse($.cookie('establishment_search')));
        }
        var params = $.deparam(decodeURIComponent(window.location.search.slice(1)));

        if (typeof params.lat != 'undefined') this.set('lat', Number(params.lat));
        if (typeof params.lng != 'undefined') this.set('lng', Number(params.lng));

        this.googleGeocoder = new google.maps.Geocoder();

        // this.on('change', this.writeCookie, this);
    },

    writeCookie: function () {
        $.cookie('establishment_search', JSON.stringify(this.attributes), { path: '/' });
    },

    geocode: function (query) {
        this.googleGeocoder.geocode( { 'address': query}, $.proxy(this.updateFromGeocoder, this));
    },

    updateFromGeocoder: function (result, status) {
        if (status == 'OK') {
            var latlng = result[0].geometry.location;
            var lat = latlng.lat();
            var lng = latlng.lng();
            var formatted_address = result[0].formatted_address; 
            this.set({
                lat: lat,
                lng: lng,
                location_name: formatted_address
            });

            this.trigger('geocode');            
        } else {
            this.trigger('error');
        }
    },

    predicate: function () {
        var data = {
            lat: this.get('lat'),
            lng: this.get('lng')
        };
        return data;
    }

}))();