describe('ttv test', function(){

    var page;
    var stream = { 
        "preview" : {
            "medium" : "test.img" 
        }, 
        "channel" : { 
            "display_name" : "display name 1", 
            "status" : "description 1"
        }, 
        "game" : "game name 1",
        "viewers" : "490"
    };

    beforeEach(function(){
        var ttvService = {};
        var ttvDisTemplatePool = new TTVDisTemplatePool(ttvService);
        page = new TTVPage(ttvService, ttvDisTemplatePool);
        page.displayResults = document.createElement('div');
        page.totalResults = document.createElement('div');
        page.currentPage = document.createElement('div');
        page.totalPages = document.createElement('div');
        page.queryData = document.createElement('input');
    });

    afterEach(function(){
        page = null;
    });

    it('setPaginationDetails test single page', function(){
        
        initSinglePage();
        expect(page.totalResults.innerHTML).toBe("1");
        expect(page.currentPage.innerHTML).toBe("1");
        expect(page.totalPages.innerHTML).toBe("1");
        page.nextPage();        
        expect(page.currentPage.innerHTML).toBe("1");
        page.previousPage();
        expect(page.currentPage.innerHTML).toBe("1");
    });

    it('setPaginationDetails test multiple page', function(){
        
        page.resultPerPage = 2;
        initMultiplePage();
        expect(page.totalResults.innerHTML).toBe("4");
        expect(page.currentPage.innerHTML).toBe("1");
        expect(page.totalPages.innerHTML).toBe("2");
        page.nextPage();        
        expect(page.currentPage.innerHTML).toBe("2");
        page.previousPage();
        expect(page.currentPage.innerHTML).toBe("1");
    });

    it('setPaginationDetails test multiple more page', function(){
        
        page.resultPerPage = 2;
        page.queryLimit = 4;
        initMultiplePageWithMore();
        expect(page.totalResults.innerHTML).toBe("10");
        expect(page.currentPage.innerHTML).toBe("1");
        expect(page.totalPages.innerHTML).toBe("5");
        page.nextPage();        
        expect(page.currentPage.innerHTML).toBe("2");
        page.previousPage();
        expect(page.currentPage.innerHTML).toBe("1");
    });

    it('setPaginationDetails test multiple more page with subset', function(){
        
        page.resultPerPage = 2;
        page.queryLimit = 4;
        initMultiplePageWithMore();
        expect(page.totalResults.innerHTML).toBe("10");
        expect(page.currentPage.innerHTML).toBe("1");
        expect(page.totalPages.innerHTML).toBe("5");
        page.nextPage();        
        expect(page.currentPage.innerHTML).toBe("2");
        initMultiplePageWithMoreAndSubset();
        expect(page.currentPage.innerHTML).toBe("3");
        page.nextPage();        
        expect(page.currentPage.innerHTML).toBe("4");
        expect(page.totalPages.innerHTML).toBe("5");
    });
   

    it('setPaginationDetails test multiple more page with subset and less data', function(){
        
        page.resultPerPage = 2;
        page.queryLimit = 4;
        initMultiplePageWithMore();
        expect(page.totalResults.innerHTML).toBe("10");
        expect(page.currentPage.innerHTML).toBe("1");
        expect(page.totalPages.innerHTML).toBe("5");
        page.nextPage();        
        expect(page.currentPage.innerHTML).toBe("2");
        initMultiplePageWithMoreAndSubsetAndLessData();
        expect(page.totalPages.innerHTML).toBe("4");
        expect(page.currentPage.innerHTML).toBe("3");
        page.nextPage();        
        expect(page.currentPage.innerHTML).toBe("4");
    });

    function initMultiplePageWithMoreAndSubset() {

         page.parseSubResults({"_total":10,"_links":{"self":"self.url","next":"next.url"},"streams":[stream, stream, stream, stream]});
    }

    function initMultiplePageWithMoreAndSubsetAndLessData() {

         page.parseSubResults({"_total":10,"_links":{"self":"self.url","next":"next.url"},"streams":[stream, stream, stream]});
    }

    function initMultiplePageWithMore() {

         page.parseResults({"_total":10,"_links":{"self":"self.url","next":"next.url"},"streams":[stream, stream, stream, stream]});
    }

    function initMultiplePage() {

         page.parseResults({"_total":4,"_links":{"self":"self.url","next":"next.url"},"streams":[stream, stream, stream, stream]});
    }

    function initSinglePage() {

         page.parseResults({"_total":1,"_links":{"self":"self.url","next":"next.url"},"streams":[stream]});
    }
});