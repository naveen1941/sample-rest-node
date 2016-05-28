var supertest = require('supertest');
var should = require('should');

var server = supertest.agent('http://localhost:3000');

describe("GET HOME", function(){
    it("should return 403 code", function(done){
        server
        .get("/")
        .expect("Content-type",/json/)
        .expect(403)
        .end(function(err, res){
            res.status.should.equal(403);
            //res.body.error.shoudl.equal(true);
            done();
        });
    });
});