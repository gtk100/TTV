describe('TTVService tests', function(){

    var service;
    var successCalled;
    var successResponse;
    var errorCalled;

    beforeEach(function(){

        service = new TTVService();
        successCalled = false;
        errorCalled = false;
    });

    afterEach(function(){

        service = null;
        successCalled = false;
        errorCalled = false;
        successResponse = null;
    });

    it('Service success callback test', function(){

        service.baseURL = "http://localhost:9876";
        service.auth = "";
        service.fetch(null, successCallBack, errorCallBack);
        var scriptSrc = document.getElementsByTagName('head')[0].getElementsByTagName('script')[0].src;
        var cb = scriptSrc.substr(scriptSrc.lastIndexOf('callback=') + 9);
        eval(cb + '({ cbSuccess: true })');
        expect(successCalled).toBe(true);
        expect(errorCalled).toBe(false);
        expect(successResponse.cbSuccess).toBe(true);
        expect(document.getElementsByTagName('head')[0].getElementsByTagName('script').length).toBe(0);
    });

    it('Service error callback test', function(){

        service.baseURL = "http://localhost:9876";
        service.auth = "";
        service.fetch(null, successCallBack, errorCallBack);
        service.fetchErrorCallBack(errorCallBack, document.getElementsByTagName('head')[0].getElementsByTagName('script')[0], {});
        expect(successCalled).toBe(false);
        expect(errorCalled).toBe(true);
        expect(document.getElementsByTagName('head')[0].getElementsByTagName('script').length).toBe(0);
    });

    function successCallBack(response) {

        successCalled = true;
        successResponse = response;
    }

    function errorCallBack() {

        errorCalled = true;
    }
});