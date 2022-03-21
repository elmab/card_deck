import * as mongoose from 'mongoose';
//import arrayShuffle from 'array-shuffle';
const _ = require("lodash");  
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
}, {
	toJSON: {
	  transform: function (doc, ret) {
		  ret.deckID=ret._id;
		  ret.remaining = ret.cards.length;
		//delete ret.cards;
		delete ret._id;
		delete ret.__v;
	  }
	}
});


export = mongoose.model('deck', deckSchema);


//add cards and shuffle them if required
deckSchema.methods.postCreate = function(this){
	//deckSchema.pre('save', function(this) {
	this.cards = this.getNewDeck();
	if(this.shuffled)
		this.shuffle();
};
	
deckSchema.methods.draw = function draw(numOfCards) {
	if(numOfCards===undefined || numOfCards <1 )
		numOfCards=1

	if(this.cards<1)
		return this.cards;

	var drawn_cards = this.cards.splice(this.cards.lengh-1, numOfCards);
	this.save()
	return drawn_cards;

}

deckSchema.methods.getNewDeck = function getNewDeck(params, callback) {
	var cards=[] as any;
	suites.forEach(s=> {
		cardValues.forEach(c => {
			if((this.type=="SHORT" && c.deckType=="SHORT") || this.type=="FULL"){
				//console.log("PUTTING INSIDE ",{"value": c.value,"suite": s, "code":c.code + s[0]} )
				var x={"value": c.value, "suite" : s, "code": c.code + s[0]} as any;
				cards.push(x);
			}
		})
	})

	console.log("****", cards.length)
	return cards;
 }
  

deckSchema.methods.shuffle = function shuffle(params, callback) {
	console.log("SHUFFLING", this.cards.length)
	// shuffle the cards
	for (let i = this.cards.length - 1; i > 0; i--) {
    	let j = Math.floor(Math.random() * i);
    	let temp = this.cards[i];
    	this.cards[i] = this.cards[j];
    	this.cards[j] = temp;
	}
	//console.log("FINISHED SHUFFLINg")
	//return this.cards;

}

deckSchema.methods.shallowCopy = function shallowCopy() {

	return {"type": this.type, "remaining": this.cards.length}

}
	

deckSchema.methods.deepCopy = function deepCopy() {

	var oldJSON = this.toJSON ;

}
