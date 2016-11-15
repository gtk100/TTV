describe('TTVService tests', function(){

    var service;
    var successCalled;
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
    });

    it('Service success callback test', function(){

        service.baseURL = "http://localhost:9876";
        service.auth = "";
        service.fetch(null, successCallBack, errorCallBack);
        service.fetchCallBack(successCallBack, document.getElementsByTagName('head')[0].getElementsByTagName('script')[0], {});
        expect(document.getElementsByTagName('head')[0].getElementsByTagName('script').length).toBe(0);
    });

    it('Service error callback test', function(){

        service.baseURL = "http://localhost:9876";
        service.auth = "";
        service.fetch(null, successCallBack, errorCallBack);
        service.fetchErrorCallBack(errorCallBack, document.getElementsByTagName('head')[0].getElementsByTagName('script')[0], {});
        expect(document.getElementsByTagName('head')[0].getElementsByTagName('script').length).toBe(0);
    });

    function successCallBack() {

        successCalled = true;
    }

    function errorCallBack() {

        errorCalled = true;
    }
});