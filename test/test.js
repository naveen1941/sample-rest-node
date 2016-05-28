var supertest = require('supertest');
var should = require('should');

var server = supertest.agent('http://localhost:3000');

describe("ACCESS WITH NO TOKEN", function(){
    it("should return 401 code", function(done){
        server
        .get("/api/v1/product/get")
        .expect("Content-type",/json/)
        .expect(401)
        .end(function(err, res){
            res.status.should.equal(401);
            res.body.error.should.equal(true);
            done();
        });
    });
});

describe("ACCESS WITH WRONG TOKEN", function(){
    it("should return 401 code", function(done){
        server
        .get("/api/v1/product/get")        
        .send({token : "badtokenbro"})
        .expect("Content-type",/json/)
        .expect(401)
        .end(function(err, res){
            res.status.should.equal(401);
            res.body.error.should.equal(true);
            done();
        });
    });
});

describe("CREATE DUPLICATE USER", function(){
    it("should return 400 code", function(done){
        server
        .post('/api/v1/user/register')
        .send({"username":"user3","password":"password"})  
        .expect("Content-type",/json/)
        .expect(400)
        .end(function(err, res){
            res.status.should.equal(400);
            res.body.error.should.equal(true);
            done();
        });
    });
});

describe("CREATE USER, WRONG USERNAME", function(){
    it("should return 400 code", function(done){
        server
        .post('/api/v1/user/register')
        .send({"username":"u","password":"password"})  
        .expect("Content-type",/json/)
        .expect(400)
        .end(function(err, res){
            res.status.should.equal(400);
            res.body.error.should.equal(true);
            done();
        });
    });
});

describe("CREATE USER, WRONG PASSWORD", function(){
    it("should return 400 code", function(done){
        server
        .post('/api/v1/user/register')
        .send({"username":"username","password":"paw"})  
        .expect("Content-type",/json/)
        .expect(400)
        .end(function(err, res){
            res.status.should.equal(400);
            res.body.error.should.equal(true);
            done();
        });
    });
});

describe("REGISTRATION", function(){
    it("should return 200 code", function(done){
        server
        .post('/api/v1/user/register')
        .send({"username":"username","password":"password"})  
        .expect("Content-type",/json/)
        .expect(200)
        .end(function(err, res){
            res.status.should.equal(200);
            res.body.error.should.equal(false);
            done();
        });
    });
});

describe("LOGIN WRONG USER", function(){
    it("should return 400 code", function(done){
        server
        .post('/api/v1/user/authenticate')
        .send({"username":"lloluser","password":"password"})  
        .expect("Content-type",/json/)
        .expect(400)
        .end(function(err, res){
            res.status.should.equal(400);
            res.body.error.should.equal(true);
            done();
        });
    });
});


describe("LOGIN WORNG PASSWORD", function(){
    it("should return 400 code", function(done){
        server
        .post('/api/v1/user/authenticate')
        .send({"username":"user3","password":"pass"})  
        .expect("Content-type",/json/)
        .expect(400)
        .end(function(err, res){
            res.status.should.equal(400);
            res.body.error.should.equal(true);
            done();
        });
    });
});

describe("LOGIN CORRECT CREDENTIALS", function(){
    it("should return 200 code", function(done){
        server
        .post('/api/v1/user/authenticate')
        .send({"username":"user3","password":"password"})  
        .expect("Content-type",/json/)
        .expect(200)
        .end(function(err, res){
            res.status.should.equal(200);
            res.body.error.should.equal(false);
            res.body.data.username.should.equal('user3');
            done();
        });
    });
});

describe("ADD PRODUCT NO TOKEN", function(){
    it("should return 401 code", function(done){
        server
        .post('/api/v1/product/add')
        .send({"name": "wfvd ","description":"this is sample product","price":50,"tags":["tag1","tag2"]})  
        .expect("Content-type",/json/)
        .expect(401)
        .end(function(err, res){
            res.status.should.equal(401);
            res.body.error.should.equal(true);
            done();
        });
    });
});


describe("ADD PRODUCT BAD JSON", function(){
    it("should return 400 code", function(done){
        server
        .post('/api/v1/product/add')
        .send({"nameee": "wfvd ","descripeeion":"this is sample product"})  
        .expect("Content-type",/json/)
        .expect(400)
        .end(function(err, res){
            res.status.should.equal(400);
            res.body.error.should.equal(true);
            done();
        });
    });
});

describe("ADD PRODUCT WRONG TOKEN", function(){
    it("should return 401 code", function(done){
        server
        .post('/api/v1/product/add')
        .send({"name": "wfvd","description":"this is sample product","price":50,"tags":["tag1","tag2"],"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwiZ2V0dGVycyI6e30sIndhc1BvcHVsYXRlZCI6ZmFsc2UsImFjdGl2ZVBhdGhzIjp7InBhdGhzIjp7InVzZXJuYW1lIjoiaW5pdCIsIl9fdiI6ImluaXQiLCJwYXNzd29yZCI6ImluaXQiLCJpc19hZG1pbiI6ImluaXQiLCJjcmVhdGVkX2F0IjoiaW5pdCIsInVwZGF0ZWRfYXQiOiJpbml0IiwiX2lkIjoiaW5pdCJ9LCJzdGF0ZXMiOnsiaWdub3JlIjp7fSwiZGVmYXVsdCI6e30sImluaXQiOnsiX192Ijp0cnVlLCJ1c2VybmFtZSI6dHJ1ZSwicGFzc3dvcmQiOnRydWUsImlzX2FkbWluIjp0cnVlLCJjcmVhdGVkX2F0Ijp0cnVlLCJ1cGRhdGVkX2F0Ijp0cnVlLCJfaWQiOnRydWV9LCJtb2RpZnkiOnt9LCJyZXF1aXJlIjp7fX0sInN0YXRlTmFtZXMiOlsicmVxdWlyZSIsIm1vZGlmeSIsImluaXQiLCJl19LCJlbWl0dGVyIjp7ImRvbWFpbiI6bnVsbCwiX2V2ZW50cyI6e30sIl9ldmVudHNDb3VudCI6MCwiX21heExpc3RlbmVycyI6MH19LCJpc05ldyI6ZmFsc2UsIl9kb2MiOnsiX192IjowLCJ1c2VybmFtZSI6InVzZXIyIiwicGFzc3dvcmQiOiIkMmEkMTAkWG9VbEt1ZVhqbGpyZjB5dC8weVBwLlBRWU8zRmVPMnVwLkNwOTQ1aDN1NTN0L01qdy94RjYiLCJpc19hZG1pbiI6ZmFsc2UsImNyZWF0ZWRfYXQiOjE0NjQ0MTExMTAsInVwZGF0ZWRfYXQiOjE0NjQ0MTExMTAsIl9pZCI6IjU3NDkyM2U2MmQ0MDcxNTAyNDYwZTliZiJ9LCJfcHJlcyI6eyIkX19vcmlnaW5hbF9zYXZlIjpbbnVsbCxudWxsLG51bGxdfSwiX3Bvc3RzIjp7IiRfX29yaWdpbmFsX3NhdmUiOltdfSwiaWF0IjoxNDY0NDExMTMxLCJleHAiOjE0NjQ0OTc1MzF9.uT7EVCGzeHtZsG0MbJztaY4oNOcYgrkO4w0Un4qJ_lE"})  
        .expect("Content-type",/json/)
        .expect(401)
        .end(function(err, res){
            res.status.should.equal(401);
            res.body.error.should.equal(true);
            done();
        });
    });
});

describe("ADD PRODUCT", function(){
    it("should return 200 code", function(done){
        server
        .post('/api/v1/product/add')
        .send({"name": "wfvd","description":"this is sample product","price":50,"tags":["tag1","tag2"],"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwiZ2V0dGVycyI6e30sIndhc1BvcHVsYXRlZCI6ZmFsc2UsImFjdGl2ZVBhdGhzIjp7InBhdGhzIjp7InVzZXJuYW1lIjoiaW5pdCIsIl9fdiI6ImluaXQiLCJwYXNzd29yZCI6ImluaXQiLCJpc19hZG1pbiI6ImluaXQiLCJjcmVhdGVkX2F0IjoiaW5pdCIsInVwZGF0ZWRfYXQiOiJpbml0IiwiX2lkIjoiaW5pdCJ9LCJzdGF0ZXMiOnsiaWdub3JlIjp7fSwiZGVmYXVsdCI6e30sImluaXQiOnsiX192Ijp0cnVlLCJ1c2VybmFtZSI6dHJ1ZSwicGFzc3dvcmQiOnRydWUsImlzX2FkbWluIjp0cnVlLCJjcmVhdGVkX2F0Ijp0cnVlLCJ1cGRhdGVkX2F0Ijp0cnVlLCJfaWQiOnRydWV9LCJtb2RpZnkiOnt9LCJyZXF1aXJlIjp7fX0sInN0YXRlTmFtZXMiOlsicmVxdWlyZSIsIm1vZGlmeSIsImluaXQiLCJkZWZhdWx0IiwiaWdub3JlIl19LCJlbWl0dGVyIjp7ImRvbWFpbiI6bnVsbCwiX2V2ZW50cyI6e30sIl9ldmVudHNDb3VudCI6MCwiX21heExpc3RlbmVycyI6MH19LCJpc05ldyI6ZmFsc2UsIl9kb2MiOnsiX192IjowLCJ1c2VybmFtZSI6InVzZXIyIiwicGFzc3dvcmQiOiIkMmEkMTAkWG9VbEt1ZVhqbGpyZjB5dC8weVBwLlBRWU8zRmVPMnVwLkNwOTQ1aDN1NTN0L01qdy94RjYiLCJpc19hZG1pbiI6ZmFsc2UsImNyZWF0ZWRfYXQiOjE0NjQ0MTExMTAsInVwZGF0ZWRfYXQiOjE0NjQ0MTExMTAsIl9pZCI6IjU3NDkyM2U2MmQ0MDcxNTAyNDYwZTliZiJ9LCJfcHJlcyI6eyIkX19vcmlnaW5hbF9zYXZlIjpbbnVsbCxudWxsLG51bGxdfSwiX3Bvc3RzIjp7IiRfX29yaWdpbmFsX3NhdmUiOltdfSwiaWF0IjoxNDY0NDExMTMxLCJleHAiOjE0NjQ0OTc1MzF9.uT7EVCGzeHtZsG0MbJztaY4oNOcYgrkO4w0Un4qJ_lE"})  
        .expect("Content-type",/json/)
        .expect(200)
        .end(function(err, res){
            res.status.should.equal(200);
            res.body.error.should.equal(false);
            res.body.data.name.should.equal("wfvd");
            done();
        });
    });
});

describe("GET PRODUCT BAD ID", function(){
    it("should return 400 code", function(done){
        server
        .get('/api/v1/product/get/574924252d4071502460e')
        .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwiZ2V0dGVycyI6e30sIndhc1BvcHVsYXRlZCI6ZmFsc2UsImFjdGl2ZVBhdGhzIjp7InBhdGhzIjp7InVzZXJuYW1lIjoiaW5pdCIsIl9fdiI6ImluaXQiLCJwYXNzd29yZCI6ImluaXQiLCJpc19hZG1pbiI6ImluaXQiLCJjcmVhdGVkX2F0IjoiaW5pdCIsInVwZGF0ZWRfYXQiOiJpbml0IiwiX2lkIjoiaW5pdCJ9LCJzdGF0ZXMiOnsiaWdub3JlIjp7fSwiZGVmYXVsdCI6e30sImluaXQiOnsiX192Ijp0cnVlLCJ1c2VybmFtZSI6dHJ1ZSwicGFzc3dvcmQiOnRydWUsImlzX2FkbWluIjp0cnVlLCJjcmVhdGVkX2F0Ijp0cnVlLCJ1cGRhdGVkX2F0Ijp0cnVlLCJfaWQiOnRydWV9LCJtb2RpZnkiOnt9LCJyZXF1aXJlIjp7fX0sInN0YXRlTmFtZXMiOlsicmVxdWlyZSIsIm1vZGlmeSIsImluaXQiLCJkZWZhdWx0IiwiaWdub3JlIl19LCJlbWl0dGVyIjp7ImRvbWFpbiI6bnVsbCwiX2V2ZW50cyI6e30sIl9ldmVudHNDb3VudCI6MCwiX21heExpc3RlbmVycyI6MH19LCJpc05ldyI6ZmFsc2UsIl9kb2MiOnsiX192IjowLCJ1c2VybmFtZSI6InVzZXIyIiwicGFzc3dvcmQiOiIkMmEkMTAkWG9VbEt1ZVhqbGpyZjB5dC8weVBwLlBRWU8zRmVPMnVwLkNwOTQ1aDN1NTN0L01qdy94RjYiLCJpc19hZG1pbiI6ZmFsc2UsImNyZWF0ZWRfYXQiOjE0NjQ0MTExMTAsInVwZGF0ZWRfYXQiOjE0NjQ0MTExMTAsIl9pZCI6IjU3NDkyM2U2MmQ0MDcxNTAyNDYwZTliZiJ9LCJfcHJlcyI6eyIkX19vcmlnaW5hbF9zYXZlIjpbbnVsbCxudWxsLG51bGxdfSwiX3Bvc3RzIjp7IiRfX29yaWdpbmFsX3NhdmUiOltdfSwiaWF0IjoxNDY0NDExMTMxLCJleHAiOjE0NjQ0OTc1MzF9.uT7EVCGzeHtZsG0MbJztaY4oNOcYgrkO4w0Un4qJ_lE') 
        .expect("Content-type",/json/)
        .expect(400)
        .end(function(err, res){
            res.status.should.equal(400);
            res.body.error.should.equal(true);
            console.log(res.body.data);
            done();
        });
    });
});

describe("GET PRODUCT NO TOKEN", function(){
    it("should return 401 code", function(done){
        server
        .get('/api/v1/product/get/574924252d4071502460e')
        .expect("Content-type",/json/)
        .expect(401)
        .end(function(err, res){
            res.status.should.equal(401);
            res.body.error.should.equal(true);
            done();
        });
    });
});

describe("GET PRODUCT", function(){
    it("should return 200 code", function(done){
        server
        .get('/api/v1/product/get/574924252d4071502460e9c1')
        .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwiZ2V0dGVycyI6e30sIndhc1BvcHVsYXRlZCI6ZmFsc2UsImFjdGl2ZVBhdGhzIjp7InBhdGhzIjp7InVzZXJuYW1lIjoiaW5pdCIsIl9fdiI6ImluaXQiLCJwYXNzd29yZCI6ImluaXQiLCJpc19hZG1pbiI6ImluaXQiLCJjcmVhdGVkX2F0IjoiaW5pdCIsInVwZGF0ZWRfYXQiOiJpbml0IiwiX2lkIjoiaW5pdCJ9LCJzdGF0ZXMiOnsiaWdub3JlIjp7fSwiZGVmYXVsdCI6e30sImluaXQiOnsiX192Ijp0cnVlLCJ1c2VybmFtZSI6dHJ1ZSwicGFzc3dvcmQiOnRydWUsImlzX2FkbWluIjp0cnVlLCJjcmVhdGVkX2F0Ijp0cnVlLCJ1cGRhdGVkX2F0Ijp0cnVlLCJfaWQiOnRydWV9LCJtb2RpZnkiOnt9LCJyZXF1aXJlIjp7fX0sInN0YXRlTmFtZXMiOlsicmVxdWlyZSIsIm1vZGlmeSIsImluaXQiLCJkZWZhdWx0IiwiaWdub3JlIl19LCJlbWl0dGVyIjp7ImRvbWFpbiI6bnVsbCwiX2V2ZW50cyI6e30sIl9ldmVudHNDb3VudCI6MCwiX21heExpc3RlbmVycyI6MH19LCJpc05ldyI6ZmFsc2UsIl9kb2MiOnsiX192IjowLCJ1c2VybmFtZSI6InVzZXIyIiwicGFzc3dvcmQiOiIkMmEkMTAkWG9VbEt1ZVhqbGpyZjB5dC8weVBwLlBRWU8zRmVPMnVwLkNwOTQ1aDN1NTN0L01qdy94RjYiLCJpc19hZG1pbiI6ZmFsc2UsImNyZWF0ZWRfYXQiOjE0NjQ0MTExMTAsInVwZGF0ZWRfYXQiOjE0NjQ0MTExMTAsIl9pZCI6IjU3NDkyM2U2MmQ0MDcxNTAyNDYwZTliZiJ9LCJfcHJlcyI6eyIkX19vcmlnaW5hbF9zYXZlIjpbbnVsbCxudWxsLG51bGxdfSwiX3Bvc3RzIjp7IiRfX29yaWdpbmFsX3NhdmUiOltdfSwiaWF0IjoxNDY0NDExMTMxLCJleHAiOjE0NjQ0OTc1MzF9.uT7EVCGzeHtZsG0MbJztaY4oNOcYgrkO4w0Un4qJ_lE') 
        .expect("Content-type",/json/)
        .expect(200)
        .end(function(err, res){
            res.status.should.equal(200);
            res.body.error.should.equal(false);
            done();
        });
    });
});

describe("EDIT PRODUCT NO TOKEN", function(){
    it("should return 401 code", function(done){
        server
        .put('/api/v1/product/edit/574924252d4071502460e9c1')
        .expect("Content-type",/json/)
        .expect(401)
        .end(function(err, res){
            res.status.should.equal(401);
            res.body.error.should.equal(true);
            done();
        });
    });
});

describe("EDIT PRODUCT NOT AUTHORIZED", function(){
    it("should return 400 code", function(done){
        server
        .put('/api/v1/product/edit/574924252d4071502460e9c1')
        .send({"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwiZ2V0dGVycyI6e30sIndhc1BvcHVsYXRlZCI6ZmFsc2UsImFjdGl2ZVBhdGhzIjp7InBhdGhzIjp7InVzZXJuYW1lIjoiaW5pdCIsIl9fdiI6ImluaXQiLCJwYXNzd29yZCI6ImluaXQiLCJpc19hZG1pbiI6ImluaXQiLCJjcmVhdGVkX2F0IjoiaW5pdCIsInVwZGF0ZWRfYXQiOiJpbml0IiwiX2lkIjoiaW5pdCJ9LCJzdGF0ZXMiOnsiaWdub3JlIjp7fSwiZGVmYXVsdCI6e30sImluaXQiOnsiX192Ijp0cnVlLCJ1c2VybmFtZSI6dHJ1ZSwicGFzc3dvcmQiOnRydWUsImlzX2FkbWluIjp0cnVlLCJjcmVhdGVkX2F0Ijp0cnVlLCJ1cGRhdGVkX2F0Ijp0cnVlLCJfaWQiOnRydWV9LCJtb2RpZnkiOnt9LCJyZXF1aXJlIjp7fX0sInN0YXRlTmFtZXMiOlsicmVxdWlyZSIsIm1vZGlmeSIsImluaXQiLCJkZWZhdWx0IiwiaWdub3JlIl19LCJlbWl0dGVyIjp7ImRvbWFpbiI6bnVsbCwiX2V2ZW50cyI6e30sIl9ldmVudHNDb3VudCI6MCwiX21heExpc3RlbmVycyI6MH19LCJpc05ldyI6ZmFsc2UsIl9kb2MiOnsiX192IjowLCJ1c2VybmFtZSI6InVzZXIzIiwicGFzc3dvcmQiOiIkMmEkMTAkUk1LRktXVU04bmJIN051ZE5RekpRLkFVdW92UDRyampJSXFBcWxEczAuay83eTU4a3FqbmEiLCJpc19hZG1pbiI6ZmFsc2UsImNyZWF0ZWRfYXQiOjE0NjQ0MTExMTgsInVwZGF0ZWRfYXQiOjE0NjQ0MTExMTgsIl9pZCI6IjU3NDkyM2VlMmQ0MDcxNTAyNDYwZTljMCJ9LCJfcHJlcyI6eyIkX19vcmlnaW5hbF9zYXZlIjpbbnVsbCxudWxsLG51bGxdfSwiX3Bvc3RzIjp7IiRfX29yaWdpbmFsX3NhdmUiOltdfSwiaWF0IjoxNDY0NDIzMjgwLCJleHAiOjE0NjQ1MDk2ODB9.D4MZiAGDmms20Ywi3VuNCOnwelOqWn061hPuCTcFdH0"})
        .expect("Content-type",/json/)
        .expect(400)
        .end(function(err, res){
            res.status.should.equal(400);
            res.body.error.should.equal(true);
            done();
        });
    });
});

describe("EDIT PRODUCT BAD INPUT", function(){
    it("should return 400 code", function(done){
        server
        .put('/api/v1/product/edit/57495460b24bcd1028c85547')
        .send({'got':"lol", "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwiZ2V0dGVycyI6e30sIndhc1BvcHVsYXRlZCI6ZmFsc2UsImFjdGl2ZVBhdGhzIjp7InBhdGhzIjp7InVzZXJuYW1lIjoiaW5pdCIsIl9fdiI6ImluaXQiLCJwYXNzd29yZCI6ImluaXQiLCJpc19hZG1pbiI6ImluaXQiLCJjcmVhdGVkX2F0IjoiaW5pdCIsInVwZGF0ZWRfYXQiOiJpbml0IiwiX2lkIjoiaW5pdCJ9LCJzdGF0ZXMiOnsiaWdub3JlIjp7fSwiZGVmYXVsdCI6e30sImluaXQiOnsiX192Ijp0cnVlLCJ1c2VybmFtZSI6dHJ1ZSwicGFzc3dvcmQiOnRydWUsImlzX2FkbWluIjp0cnVlLCJjcmVhdGVkX2F0Ijp0cnVlLCJ1cGRhdGVkX2F0Ijp0cnVlLCJfaWQiOnRydWV9LCJtb2RpZnkiOnt9LCJyZXF1aXJlIjp7fX0sInN0YXRlTmFtZXMiOlsicmVxdWlyZSIsIm1vZGlmeSIsImluaXQiLCJkZWZhdWx0IiwiaWdub3JlIl19LCJlbWl0dGVyIjp7ImRvbWFpbiI6bnVsbCwiX2V2ZW50cyI6e30sIl9ldmVudHNDb3VudCI6MCwiX21heExpc3RlbmVycyI6MH19LCJpc05ldyI6ZmFsc2UsIl9kb2MiOnsiX192IjowLCJ1c2VybmFtZSI6InVzZXIyIiwicGFzc3dvcmQiOiIkMmEkMTAkWG9VbEt1ZVhqbGpyZjB5dC8weVBwLlBRWU8zRmVPMnVwLkNwOTQ1aDN1NTN0L01qdy94RjYiLCJpc19hZG1pbiI6ZmFsc2UsImNyZWF0ZWRfYXQiOjE0NjQ0MTExMTAsInVwZGF0ZWRfYXQiOjE0NjQ0MTExMTAsIl9pZCI6IjU3NDkyM2U2MmQ0MDcxNTAyNDYwZTliZiJ9LCJfcHJlcyI6eyIkX19vcmlnaW5hbF9zYXZlIjpbbnVsbCxudWxsLG51bGxdfSwiX3Bvc3RzIjp7IiRfX29yaWdpbmFsX3NhdmUiOltdfSwiaWF0IjoxNDY0NDExMTMxLCJleHAiOjE0NjQ0OTc1MzF9.uT7EVCGzeHtZsG0MbJztaY4oNOcYgrkO4w0Un4qJ_lE"})
        .expect("Content-type",/json/)
        .expect(400)
        .end(function(err, res){
            res.status.should.equal(400);
            res.body.error.should.equal(true);
            done();
        });
    });
});

describe("EDIT PRODUCT", function(){
    it("should return 200 code", function(done){
        server
        .put('/api/v1/product/edit/574996b2e10b4bac177b6e95')
        .send({"edit":{'name':"OMG"}, "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwiZ2V0dGVycyI6e30sIndhc1BvcHVsYXRlZCI6ZmFsc2UsImFjdGl2ZVBhdGhzIjp7InBhdGhzIjp7InVzZXJuYW1lIjoiaW5pdCIsIl9fdiI6ImluaXQiLCJwYXNzd29yZCI6ImluaXQiLCJpc19hZG1pbiI6ImluaXQiLCJjcmVhdGVkX2F0IjoiaW5pdCIsInVwZGF0ZWRfYXQiOiJpbml0IiwiX2lkIjoiaW5pdCJ9LCJzdGF0ZXMiOnsiaWdub3JlIjp7fSwiZGVmYXVsdCI6e30sImluaXQiOnsiX192Ijp0cnVlLCJ1c2VybmFtZSI6dHJ1ZSwicGFzc3dvcmQiOnRydWUsImlzX2FkbWluIjp0cnVlLCJjcmVhdGVkX2F0Ijp0cnVlLCJ1cGRhdGVkX2F0Ijp0cnVlLCJfaWQiOnRydWV9LCJtb2RpZnkiOnt9LCJyZXF1aXJlIjp7fX0sInN0YXRlTmFtZXMiOlsicmVxdWlyZSIsIm1vZGlmeSIsImluaXQiLCJkZWZhdWx0IiwiaWdub3JlIl19LCJlbWl0dGVyIjp7ImRvbWFpbiI6bnVsbCwiX2V2ZW50cyI6e30sIl9ldmVudHNDb3VudCI6MCwiX21heExpc3RlbmVycyI6MH19LCJpc05ldyI6ZmFsc2UsIl9kb2MiOnsiX192IjowLCJ1c2VybmFtZSI6InVzZXIyIiwicGFzc3dvcmQiOiIkMmEkMTAkWG9VbEt1ZVhqbGpyZjB5dC8weVBwLlBRWU8zRmVPMnVwLkNwOTQ1aDN1NTN0L01qdy94RjYiLCJpc19hZG1pbiI6ZmFsc2UsImNyZWF0ZWRfYXQiOjE0NjQ0MTExMTAsInVwZGF0ZWRfYXQiOjE0NjQ0MTExMTAsIl9pZCI6IjU3NDkyM2U2MmQ0MDcxNTAyNDYwZTliZiJ9LCJfcHJlcyI6eyIkX19vcmlnaW5hbF9zYXZlIjpbbnVsbCxudWxsLG51bGxdfSwiX3Bvc3RzIjp7IiRfX29yaWdpbmFsX3NhdmUiOltdfSwiaWF0IjoxNDY0NDExMTMxLCJleHAiOjE0NjQ0OTc1MzF9.uT7EVCGzeHtZsG0MbJztaY4oNOcYgrkO4w0Un4qJ_lE"})
        .expect("Content-type",/json/)
        .expect(200)
        .end(function(err, res){
            res.status.should.equal(200);
            res.body.error.should.equal(false);
            done();
        });
    });
});


describe("DELETE PRODUCT NO TOKEN", function(){
    it("should return 401 code", function(done){
        server
        .delete('/api/v1/product/delete/574924252d4071502460e9c1')
        .expect("Content-type",/json/)
        .expect(401)
        .end(function(err, res){
            res.status.should.equal(401);
            res.body.error.should.equal(true);
            done();
        });
    });
});

describe("DELETE PRODUCT NOT AUTHORIZED", function(){
    it("should return 400 code", function(done){
        server
        .delete('/api/v1/product/delete/574924252d4071502460e9c1')
        .send({"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwiZ2V0dGVycyI6e30sIndhc1BvcHVsYXRlZCI6ZmFsc2UsImFjdGl2ZVBhdGhzIjp7InBhdGhzIjp7InVzZXJuYW1lIjoiaW5pdCIsIl9fdiI6ImluaXQiLCJwYXNzd29yZCI6ImluaXQiLCJpc19hZG1pbiI6ImluaXQiLCJjcmVhdGVkX2F0IjoiaW5pdCIsInVwZGF0ZWRfYXQiOiJpbml0IiwiX2lkIjoiaW5pdCJ9LCJzdGF0ZXMiOnsiaWdub3JlIjp7fSwiZGVmYXVsdCI6e30sImluaXQiOnsiX192Ijp0cnVlLCJ1c2VybmFtZSI6dHJ1ZSwicGFzc3dvcmQiOnRydWUsImlzX2FkbWluIjp0cnVlLCJjcmVhdGVkX2F0Ijp0cnVlLCJ1cGRhdGVkX2F0Ijp0cnVlLCJfaWQiOnRydWV9LCJtb2RpZnkiOnt9LCJyZXF1aXJlIjp7fX0sInN0YXRlTmFtZXMiOlsicmVxdWlyZSIsIm1vZGlmeSIsImluaXQiLCJkZWZhdWx0IiwiaWdub3JlIl19LCJlbWl0dGVyIjp7ImRvbWFpbiI6bnVsbCwiX2V2ZW50cyI6e30sIl9ldmVudHNDb3VudCI6MCwiX21heExpc3RlbmVycyI6MH19LCJpc05ldyI6ZmFsc2UsIl9kb2MiOnsiX192IjowLCJ1c2VybmFtZSI6InVzZXIzIiwicGFzc3dvcmQiOiIkMmEkMTAkUk1LRktXVU04bmJIN051ZE5RekpRLkFVdW92UDRyampJSXFBcWxEczAuay83eTU4a3FqbmEiLCJpc19hZG1pbiI6ZmFsc2UsImNyZWF0ZWRfYXQiOjE0NjQ0MTExMTgsInVwZGF0ZWRfYXQiOjE0NjQ0MTExMTgsIl9pZCI6IjU3NDkyM2VlMmQ0MDcxNTAyNDYwZTljMCJ9LCJfcHJlcyI6eyIkX19vcmlnaW5hbF9zYXZlIjpbbnVsbCxudWxsLG51bGxdfSwiX3Bvc3RzIjp7IiRfX29yaWdpbmFsX3NhdmUiOltdfSwiaWF0IjoxNDY0NDIzMjgwLCJleHAiOjE0NjQ1MDk2ODB9.D4MZiAGDmms20Ywi3VuNCOnwelOqWn061hPuCTcFdH0"})
        .expect("Content-type",/json/)
        .expect(400)
        .end(function(err, res){
            res.status.should.equal(400);
            res.body.error.should.equal(true);
            done();
        });
    });
});

describe("DELETE PRODUCT", function(){
    it("should return 200 code", function(done){
        server
        .delete('/api/v1/product/delete/57495460b24bcd1028c85547')
        .send({"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwiZ2V0dGVycyI6e30sIndhc1BvcHVsYXRlZCI6ZmFsc2UsImFjdGl2ZVBhdGhzIjp7InBhdGhzIjp7InVzZXJuYW1lIjoiaW5pdCIsIl9fdiI6ImluaXQiLCJwYXNzd29yZCI6ImluaXQiLCJpc19hZG1pbiI6ImluaXQiLCJjcmVhdGVkX2F0IjoiaW5pdCIsInVwZGF0ZWRfYXQiOiJpbml0IiwiX2lkIjoiaW5pdCJ9LCJzdGF0ZXMiOnsiaWdub3JlIjp7fSwiZGVmYXVsdCI6e30sImluaXQiOnsiX192Ijp0cnVlLCJ1c2VybmFtZSI6dHJ1ZSwicGFzc3dvcmQiOnRydWUsImlzX2FkbWluIjp0cnVlLCJjcmVhdGVkX2F0Ijp0cnVlLCJ1cGRhdGVkX2F0Ijp0cnVlLCJfaWQiOnRydWV9LCJtb2RpZnkiOnt9LCJyZXF1aXJlIjp7fX0sInN0YXRlTmFtZXMiOlsicmVxdWlyZSIsIm1vZGlmeSIsImluaXQiLCJkZWZhdWx0IiwiaWdub3JlIl19LCJlbWl0dGVyIjp7ImRvbWFpbiI6bnVsbCwiX2V2ZW50cyI6e30sIl9ldmVudHNDb3VudCI6MCwiX21heExpc3RlbmVycyI6MH19LCJpc05ldyI6ZmFsc2UsIl9kb2MiOnsiX192IjowLCJ1c2VybmFtZSI6InVzZXIyIiwicGFzc3dvcmQiOiIkMmEkMTAkWG9VbEt1ZVhqbGpyZjB5dC8weVBwLlBRWU8zRmVPMnVwLkNwOTQ1aDN1NTN0L01qdy94RjYiLCJpc19hZG1pbiI6ZmFsc2UsImNyZWF0ZWRfYXQiOjE0NjQ0MTExMTAsInVwZGF0ZWRfYXQiOjE0NjQ0MTExMTAsIl9pZCI6IjU3NDkyM2U2MmQ0MDcxNTAyNDYwZTliZiJ9LCJfcHJlcyI6eyIkX19vcmlnaW5hbF9zYXZlIjpbbnVsbCxudWxsLG51bGxdfSwiX3Bvc3RzIjp7IiRfX29yaWdpbmFsX3NhdmUiOltdfSwiaWF0IjoxNDY0NDExMTMxLCJleHAiOjE0NjQ0OTc1MzF9.uT7EVCGzeHtZsG0MbJztaY4oNOcYgrkO4w0Un4qJ_lE"})
        .expect("Content-type",/json/)
        .expect(200)
        .end(function(err, res){
            res.status.should.equal(200);
            res.body.error.should.equal(false);
            done();
        });
    });
});


describe("SEARCH PRODUCT NO TOKEN", function(){
    it("should return 401 code", function(done){
        server
        .get('/api/v1/product/search')
        .expect("Content-type",/json/)
        .expect(401)
        .end(function(err, res){
            res.status.should.equal(401);
            res.body.error.should.equal(true);
            done();
        });
    });
});

describe("SEARCH PRODUCT BAD QUERY", function(){
    it("should return 400 code", function(done){
        server
        .get('/api/v1/product/search?nam=noname&price=100')
        .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwiZ2V0dGVycyI6e30sIndhc1BvcHVsYXRlZCI6ZmFsc2UsImFjdGl2ZVBhdGhzIjp7InBhdGhzIjp7InVzZXJuYW1lIjoiaW5pdCIsIl9fdiI6ImluaXQiLCJwYXNzd29yZCI6ImluaXQiLCJpc19hZG1pbiI6ImluaXQiLCJjcmVhdGVkX2F0IjoiaW5pdCIsInVwZGF0ZWRfYXQiOiJpbml0IiwiX2lkIjoiaW5pdCJ9LCJzdGF0ZXMiOnsiaWdub3JlIjp7fSwiZGVmYXVsdCI6e30sImluaXQiOnsiX192Ijp0cnVlLCJ1c2VybmFtZSI6dHJ1ZSwicGFzc3dvcmQiOnRydWUsImlzX2FkbWluIjp0cnVlLCJjcmVhdGVkX2F0Ijp0cnVlLCJ1cGRhdGVkX2F0Ijp0cnVlLCJfaWQiOnRydWV9LCJtb2RpZnkiOnt9LCJyZXF1aXJlIjp7fX0sInN0YXRlTmFtZXMiOlsicmVxdWlyZSIsIm1vZGlmeSIsImluaXQiLCJkZWZhdWx0IiwiaWdub3JlIl19LCJlbWl0dGVyIjp7ImRvbWFpbiI6bnVsbCwiX2V2ZW50cyI6e30sIl9ldmVudHNDb3VudCI6MCwiX21heExpc3RlbmVycyI6MH19LCJpc05ldyI6ZmFsc2UsIl9kb2MiOnsiX192IjowLCJ1c2VybmFtZSI6InVzZXIyIiwicGFzc3dvcmQiOiIkMmEkMTAkWG9VbEt1ZVhqbGpyZjB5dC8weVBwLlBRWU8zRmVPMnVwLkNwOTQ1aDN1NTN0L01qdy94RjYiLCJpc19hZG1pbiI6ZmFsc2UsImNyZWF0ZWRfYXQiOjE0NjQ0MTExMTAsInVwZGF0ZWRfYXQiOjE0NjQ0MTExMTAsIl9pZCI6IjU3NDkyM2U2MmQ0MDcxNTAyNDYwZTliZiJ9LCJfcHJlcyI6eyIkX19vcmlnaW5hbF9zYXZlIjpbbnVsbCxudWxsLG51bGxdfSwiX3Bvc3RzIjp7IiRfX29yaWdpbmFsX3NhdmUiOltdfSwiaWF0IjoxNDY0NDExMTMxLCJleHAiOjE0NjQ0OTc1MzF9.uT7EVCGzeHtZsG0MbJztaY4oNOcYgrkO4w0Un4qJ_lE')
        .expect("Content-type",/json/)
        .expect(400)
        .end(function(err, res){
            res.status.should.equal(400);
            res.body.error.should.equal(true);
            done();
        });
    });
});

describe("SEARCH PRODUCT", function(){
    it("should return 200 code", function(done){
        server
        .get('/api/v1/product/search?name=noname&price=100')
        .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwiZ2V0dGVycyI6e30sIndhc1BvcHVsYXRlZCI6ZmFsc2UsImFjdGl2ZVBhdGhzIjp7InBhdGhzIjp7InVzZXJuYW1lIjoiaW5pdCIsIl9fdiI6ImluaXQiLCJwYXNzd29yZCI6ImluaXQiLCJpc19hZG1pbiI6ImluaXQiLCJjcmVhdGVkX2F0IjoiaW5pdCIsInVwZGF0ZWRfYXQiOiJpbml0IiwiX2lkIjoiaW5pdCJ9LCJzdGF0ZXMiOnsiaWdub3JlIjp7fSwiZGVmYXVsdCI6e30sImluaXQiOnsiX192Ijp0cnVlLCJ1c2VybmFtZSI6dHJ1ZSwicGFzc3dvcmQiOnRydWUsImlzX2FkbWluIjp0cnVlLCJjcmVhdGVkX2F0Ijp0cnVlLCJ1cGRhdGVkX2F0Ijp0cnVlLCJfaWQiOnRydWV9LCJtb2RpZnkiOnt9LCJyZXF1aXJlIjp7fX0sInN0YXRlTmFtZXMiOlsicmVxdWlyZSIsIm1vZGlmeSIsImluaXQiLCJkZWZhdWx0IiwiaWdub3JlIl19LCJlbWl0dGVyIjp7ImRvbWFpbiI6bnVsbCwiX2V2ZW50cyI6e30sIl9ldmVudHNDb3VudCI6MCwiX21heExpc3RlbmVycyI6MH19LCJpc05ldyI6ZmFsc2UsIl9kb2MiOnsiX192IjowLCJ1c2VybmFtZSI6InVzZXIyIiwicGFzc3dvcmQiOiIkMmEkMTAkWG9VbEt1ZVhqbGpyZjB5dC8weVBwLlBRWU8zRmVPMnVwLkNwOTQ1aDN1NTN0L01qdy94RjYiLCJpc19hZG1pbiI6ZmFsc2UsImNyZWF0ZWRfYXQiOjE0NjQ0MTExMTAsInVwZGF0ZWRfYXQiOjE0NjQ0MTExMTAsIl9pZCI6IjU3NDkyM2U2MmQ0MDcxNTAyNDYwZTliZiJ9LCJfcHJlcyI6eyIkX19vcmlnaW5hbF9zYXZlIjpbbnVsbCxudWxsLG51bGxdfSwiX3Bvc3RzIjp7IiRfX29yaWdpbmFsX3NhdmUiOltdfSwiaWF0IjoxNDY0NDExMTMxLCJleHAiOjE0NjQ0OTc1MzF9.uT7EVCGzeHtZsG0MbJztaY4oNOcYgrkO4w0Un4qJ_lE')
        .expect("Content-type",/json/)
        .expect(200)
        .end(function(err, res){
            res.status.should.equal(200);
            res.body.error.should.equal(false);
            done();
        });
    });
});