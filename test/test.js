const lhost = "localhost:3000/deck";
const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();

chai.use(chaiHttp);

let newid;

describe("Deck", () => {
  it("should return status 201 upon creating", (done) => {
    chai
      .request(lhost)
      .post("/")
      .end((err, res) => {
        res.should.have.status(201);
        newid = res.body.deckId;
        done();
      });
  });
  it("should return a deck with 52 cards remaining", (done) => {
    chai
      .request(lhost)
      .get("/" + newid)
      .end((err, res) => {
        res.body.should.be.a("object");
        res.body.cards.length.should.be.equal(52);
        done();
      });
  });
  it("should draw 2", (done) => {
    chai
      .request(lhost)
      .get("/" + newid + "/draw/2")
      .end((err, res) => {
        res.body.cards.length.should.be.equal(2);
        done();
      });
  });
  it("should show remaining", (done) => {
    chai
      .request(lhost)
      .get("/" + newid)
      .end((err, res) => {
        res.body.remaining.should.be.equal(50);
        done();
      });
  });
  it("should return an error because of a bad parameter(trying to draw 100 cards)", (done) => {
    chai
      .request(lhost)
      .get("/" + newid + "/draw/100")
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it("deck should not be shuffled", (done) => {
    chai
      .request(lhost)
      .get("/" + newid)
      .end((err, res) => {
        res.body.shuffled.should.be.equal(false);
        done();
      });
  });
});
