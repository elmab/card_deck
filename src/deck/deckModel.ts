import * as mongoose from 'mongoose';


var cardValues = require( "../../config/cardValues.json" );
var suites = require( "../../config/suites.json" );
console.log(cardValues);


const Schema = mongoose.Schema;

const cardSchema = new Schema({
	"value":String,
	"suite":String,
	"code":String

});
//var cardModel = mongoose.model('card', d);
const deckSchema = new Schema({
	'type' : String,
	'shuffled' : Boolean,
	'cards' : [cardSchema]
});

deckSchema.pre('save', function(this) {
	this.cards = this.getNewDeck();
	console.log(this)
	console.log(this.shuffled);
	if(this.shuffled)
		console.log("We need to shuffle")
  });
export = mongoose.model('deck', deckSchema);



deckSchema.methods.getNewDeck = function getNewDeck(params, callback) {
	console.log("CreATIng A NEw DECK")
	var cards=[];
	suites.forEach(s=> {
		cardValues.forEach(c => {
			if(this.type=="SHORT" && c.deckType=="SHORT"){
				//console.log("PUTTING INSIDE ",{"value": c.value,"suite": s, "code":c.code + s[0]} )
				var x={"value": c.value, "suite" : s, "code": c.code + s[0]} as any;
				cards.push(x);
			}
		})
	})

	console.log("****")
	return cards;
 }
  

deckSchema.methods.shuffle = function shuffle(params, callback) {
  //if self.shuffle , do it
  //implementation code goes here
}
