/**
 * RajaOngkir API jQuery plugin
 * @author          M ABD AZIZ ALFIAN
 * @version         1.1.0
 * @repository      https://github.com/aalfiann/rajaongkir-jquery
 */
(function($){
    $.fn.RajaOngkir = function(type,key) {

        // Validate parameter type and key is required
        if(!$.trim(type)) throw new Error("RajaOngkir Account Type is required!");
        if(!$.trim(key)) throw new Error("RajaOngkir API Key is required!");
        type = type.toLowerCase();

        // Configuration RajaOngkir API
        var config = {
            apikey: key,
            api_url: 'https://'+((type !== 'pro')?'api':'pro')+'.rajaongkir.com/'+((type !== 'pro')?type:'api')+'/',
            cors_proxy: 'https://cors-anywhere.herokuapp.com/'
        };
    
        // Default option for making http request
        var default_option = {
            url: '',
            method: 'get',
            data: '',
            headers:{
                'content-type':'application/x-www-form-urlencoded',
                'key':config.apikey
            }
        };

        /**
         * Endpoint builder
         * @param {string} name
         * @return {string}
         */
        this.endpoint = function(name) {
            var version = '';
            if(name.indexOf('international') !== -1 ) {
                version = 'v2/';
            }
            return config.cors_proxy + config.api_url + version + name;
        };

        /**
         * Make HTTP Request with Ajax
         * @param {object} options
         * @return {Ajax}
         */
        this.makeRequest = function(options) {
            var ops = $.extend({}, default_option, options);
            return $.ajax({
                url:ops.url,
                type:ops.method,
                data:ops.data,
                headers:ops.headers
            });
        };

        /**
         * Get Province
         * @param {string} provinceId       [optional]
         * @return {Ajax}
         */
        this.province = function(provinceId) {
            return this.makeRequest({
                url: this.endpoint('province'),
                method:'get',
                data:{"id": provinceId}
            });
        };

        /**
         * Get City
         * @param {string} cityId       [optional]
         * @param {string} provinceId   [optional]
         * @return {Ajax}
         */
        this.city = function(cityId,provinceId) {
            return this.makeRequest({
                url: this.endpoint('city'),
                method:'get',
                data:{"id": cityId,"province": provinceId}
            });
        };

        /**
         * Get Cost
         * @param {string} originID
         * @param {string} destinationId
         * @param {string|int} weight           Weight in gramm
         * @param {string} courier 
         * @param {string} originType           [conditional]
         * @param {string} destinationType      [conditional]
         * @param {string} length               [optional] in cm
         * @param {string} width                [optional] in cm
         * @param {string} height               [optional] in cm
         * @param {string} diameter             [optional] in cm
         * @return {Ajax}
         */
        this.cost = function(originID,destinationId,weight,courier,originType,destinationType,length,width,height,diameter) {
            var params = {
                "origin": originID,
                "originType": originType,
                "destination": destinationId,
                "destinationType": destinationType,
                "weight":parseInt(weight),
                "courier": courier,
                "length": length,
                "width": width,
                "height": height,
                "diameter": diameter
            };

            if(type !== 'pro') {
                delete params['originType'];
                delete params['destinationType'];
                delete params['length'];
                delete params['width'];
                delete params['height'];
                delete params['diameter'];
            }

            return this.makeRequest({
                url: this.endpoint('cost'),
                method:'post',
                data:params
            });
        };

        /**
         * Get Subdistrict
         * @param {string} cityId
         * @param {string} subId        [optional]
         * @return {Ajax}
         */
        this.subdistrict = function(cityId,subId) {
            return this.makeRequest({
                url: this.endpoint('subdistrict'),
                method:'get',
                data:{"city":cityId,"id": subId}
            });
        };

        /**
         * Get International Origin
         * @param {string} cityId           [optional]
         * @param {string} provinceId       [optional]
         * @return {Ajax}
         */
        this.internationalOrigin = function(cityId,provinceId) {
            return this.makeRequest({
                url: this.endpoint('internationalOrigin'),
                method:'get',
                data:{"id": cityId,"province": provinceId}
            });
        };

        /**
         * Get International Destination
         * @param {string} cityId           [optional]
         * @param {string} provinceId       [optional]
         * @return {Ajax}
         */
        this.internationalDestination = function(countryId) {
            return this.makeRequest({
                url: this.endpoint('internationalDestination'),
                method:'get',
                data:{"id": countryId}
            });
        };

        /**
         * Get International Cost
         * @param {string} originId
         * @param {string} destinationId 
         * @param {string} weight               Weight in gramm
         * @param {string} courier
         * @param {string} length               [optional] in cm
         * @param {string} width                [optional] in cm
         * @param {string} height               [optional] in cm
         * @return {Ajax}
         */
        this.internationalCost = function(originId,destinationId,weight,courier,length,width,height) {
            return this.makeRequest({
                url: this.endpoint('internationalCost'),
                method:'post',
                data:{
                    "origin": originId,
                    "destination": destinationId,
                    "weight":parseInt(weight),
                    "courier": courier,
                    "length": length,
                    "width": width,
                    "height": height
                }
            });
        };

        /**
         * Get Currency
         * @return {Ajax}
         */
        this.currency = function() {
            return this.makeRequest({
                url: this.endpoint('currency'),
                method:'get'
            });
        };

        /**
         * Get Waybill Status
         * @param {string}
         * @param {string}
         * @return {Ajax}
         */
        this.waybill = function(courier,waybill) {
            return this.makeRequest({
                url: this.endpoint('waybill'),
                method:'post',
                data:{"courier": courier, "waybill": waybill}
            });
        };

        return this;
    }

})(jQuery);