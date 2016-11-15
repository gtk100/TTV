describe('TTV template pool test', function(){

    var pool;

    beforeEach(function(){
        var ttvService = new TTVService();
        pool = new TTVDisTemplatePool(ttvService);
    });

    afterEach(function(){
        pool = null;
    });

    it('get returns not null', function(){

        var template = pool.get();
        expect(template).not.toBeNull();
    });

    it('get returns existing object', function(){

        var template = pool.get();
        pool.return(template);
        var template2 = pool.get();
        expect(template).toBe(template2);
        var template3 = pool.get();
        expect(template).not.toBe(template3);
    });

    it('return does not accept other object', function(){

        var hi = "HI";
        pool.return(hi);
        var template = pool.get();
        expect(template).not.toBe(hi);
    })  
});

describe('TTV template test', function(){

    var template;
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
        var pool = new TTVDisTemplatePool(ttvService);
        template = new TTVDisTemplate(ttvService, pool.getRawTemplate());
    });

    afterEach(function(){
        template = null;
    });

    it('attach functionality test', function(){
        var parent = document.createElement('div');
        expect(parent.firstChild).toBeNull();
        template.setStream(stream);
        template.attach(parent);
        expect(parent.firstChild).not.toBeNull();
    });

    it('setStream test', function(){
        var parent = document.createElement('div');
        expect(parent.firstChild).toBeNull();
        template.setStream(stream);
        template.attach(parent);
        expect(parent.firstChild).not.toBeNull();
        var temObj = parent.firstChild;
        expect(temObj.firstChild.src).toContain("test.img");
        expect(temObj.childNodes[1].childNodes[0].innerHTML).toBe("display name 1");
        expect(temObj.childNodes[1].childNodes[2].innerHTML).toBe("game name 1");
        expect(temObj.childNodes[1].childNodes[4].innerHTML).toBe("490");
        expect(temObj.childNodes[1].childNodes[7].innerHTML).toContain("description 1");
    });
});