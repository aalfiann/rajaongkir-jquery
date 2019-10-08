const assert = require('assert');
const { JSDOM } = require('jsdom');
const { window } = new JSDOM(`<!DOCTYPE html>`);

describe('jQuery rajaongkir api test', function() {

    $ = global.jQuery = require('jquery')(window);
    require('../src/rajaongkir.js');

    var timeout = 30000;
    var apikey_starter = '34fd6986388c4785f440a4cf80bc93bc';
    var apikey_pro = '34fd6986388c4785f440a4cf80bc93bc';

    it('rajaongkir param type is required', function() {
        assert.throws(function() {
            $().rajaongkir()
        },Error,"Error Throw");
    });

    it('rajaongkir param key is required', function() {
        assert.throws(function() {
            $().rajaongkir('starter')
        },Error,"Error Throw");
    });
    
    it('get province', function(done) {
        this.timeout(timeout);
        var rajaongkir = $().rajaongkir('starter',apikey_starter);
        rajaongkir.province().done(function(result,status) {
            if(status !== 'parsererror') assert.equal(result.rajaongkir.status.code,200);
            done();
        }).fail(function(err,status) {
            if(status !== 'parsererror') assert.equal((err.status >= 400),true);
            done();
        });
    });

    it('get province with invalid key', function(done) {
        this.timeout(timeout);
        var rajaongkir = $().rajaongkir('starter',apikey_starter);
        rajaongkir.province().done(function(result,status) {
            if(status !== 'parsererror') assert.equal(result.rajaongkir.status.code,200);
            done();
        }).fail(function(err,status) {
            if(status !== 'parsererror') assert.equal((err.status >= 400),true);
            done();
        });
    });

    it('get city', function(done) {
        this.timeout(timeout);
        var rajaongkir = $().rajaongkir('starter',apikey_starter);
        rajaongkir.city().done(function(result,status) {
            if(status !== 'parsererror') assert.equal(result.rajaongkir.status.code,200);
            done();
        }).fail(function(err,status) {
            if(status !== 'parsererror') assert.equal((err.status >= 400),true);
            done();
        });
    });

    it('get cost', function(done) {
        this.timeout(timeout);
        var rajaongkir = $().rajaongkir('starter',apikey_starter);
        rajaongkir.cost('501','114','1700','jne').done(function(result,status) {
            if(status !== 'parsererror') assert.equal(result.rajaongkir.status.code,200);
            done();
        }).fail(function(err,status) {
            if(status !== 'parsererror') assert.equal((err.status >= 400),true);
            done();
        });
    });

    it('get cost for pro account type', function(done) {
        this.timeout(timeout);
        var rajaongkir = $().rajaongkir('pro',apikey_pro);
        rajaongkir.cost('501','city','574','subdistrict','1700','jne').done(function(result,status) {
            if(status !== 'parsererror') assert.equal(result.rajaongkir.status.code,200);
            done();
        }).fail(function(err,status) {
            if(status !== 'parsererror') assert.equal((err.status >= 400),true);
            done();
        });
    });

    it('starter account type is allowed for province, city and cost only', function(done) {
        this.timeout(timeout);
        var rajaongkir = $().rajaongkir('starter',apikey_starter);
        rajaongkir.subdistrict('39').done(function(result,status) {
            if(status !== 'parsererror') assert.equal(result.rajaongkir.status.code,200);
            done();
        }).fail(function(err,status) {
            if(status !== 'parsererror') assert.equal((err.status >= 400),true);
            done();
        });
    });

    it('get subdistrict', function(done) {
        this.timeout(timeout);
        var rajaongkir = $().rajaongkir('pro',apikey_pro);
        rajaongkir.subdistrict('39').done(function(result,status) {
            if(status !== 'parsererror') assert.equal(result.rajaongkir.status.code,200);
            done();
        }).fail(function(err,status) {
            if(status !== 'parsererror') assert.equal((err.status >= 400),true);
            done();
        });
    });

    it('get internationalOrigin', function(done) {
        this.timeout(timeout);
        var rajaongkir = $().rajaongkir('pro',apikey_pro);
        rajaongkir.internationalOrigin().done(function(result,status) {
            if(status !== 'parsererror') assert.equal(result.rajaongkir.status.code,200);
            done();
        }).fail(function(err,status) {
            if(status !== 'parsererror') assert.equal((err.status >= 400),true);
            done();
        });
    });

    it('get internationalDestination', function(done) {
        this.timeout(timeout);
        var rajaongkir = $().rajaongkir('pro',apikey_pro);
        rajaongkir.internationalDestination().done(function(result,status) {
            if(status !== 'parsererror') assert.equal(result.rajaongkir.status.code,200);
            done();
        }).fail(function(err,status) {
            if(status !== 'parsererror') assert.equal((err.status >= 400),true);
            done();
        });
    });

    it('get internationalCost', function(done) {
        this.timeout(timeout);
        var rajaongkir = $().rajaongkir('pro',apikey_pro);
        rajaongkir.internationalCost('152','108','1400','tiki').done(function(result,status) {
            if(status !== 'parsererror') assert.equal(result.rajaongkir.status.code,200);
            done();
        }).fail(function(err,status) {
            if(status !== 'parsererror') assert.equal((err.status >= 400),true);
            done();
        });
    });

    it('get currency', function(done) {
        this.timeout(timeout);
        var rajaongkir = $().rajaongkir('pro',apikey_pro);
        rajaongkir.currency().done(function(result,status) {
            if(status !== 'parsererror') assert.equal(result.rajaongkir.status.code,200);
            done();
        }).fail(function(err,status) {
            if(status !== 'parsererror') assert.equal((err.status >= 400),true);
            done();
        });
    });

    it('get waybill', function(done) {
        this.timeout(timeout);
        var rajaongkir = $().rajaongkir('pro',apikey_pro);
        rajaongkir.waybill('jne','SOCAG00183235715').done(function(result,status) {
            if(status !== 'parsererror') assert.equal(result.rajaongkir.status.code,200);
            done();
        }).fail(function(err,status) {
            if(status !== 'parsererror') assert.equal((err.status >= 400),true);
            done();
        });
    });

});