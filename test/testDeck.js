var expect  = require("chai").expect;
var request = require("request");

describe("Card Game API", function() {

    describe("Create a new deck", function() {
  
      var url = "/deck";
  
      it("returns status 200", function() {
        request(url, function(error, response, {"type":"FULL"}) {
          expect(response.statusCode).to.equal(200);
        });
      });
  
      it("returns the color in hex", function() {
        request(url, function(error, response, body) {
          expect(body).to.equal("ffffff");
        });
      });
  
    });
  
    describe("Hex to RGB conversion", function() {
      var url = "http://localhost:3000/hexToRgb?hex=00ff00";
  
      it("returns status 200", function() {
        request(url, function(error, response, body) {
          expect(response.statusCode).to.equal(200);
        });
      });
  
      it("returns the color in RGB", function() {
        request(url, function(error, response, body) {
          expect(body).to.equal("[0,255,0]");
        });
      });
    });
  
  });