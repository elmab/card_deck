import { debug } from 'console';
import DeckModel from './deckModel';
import mongoose from "mongoose";
import { env } from "../../config/global"

/**
 * deckController.ts
 *
 * @description :: Server-side logic for managing decks.
 */

// Connecting to DB
mongoose.connect( env.MONGO_URI).then(() => {
    console.log('MongoDB connected!!');
}).catch(err => {
    console.log('Failed to connect to MongoDB', err);
});;
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
})


export = {

   /**
     * deckController.draw()
     */
    draw: function (req, res) {
        console.log(req.params)
        const id = req.params.id;
        const numOfCards = req.params.numOfCards;
        console.log(numOfCards,"*******")
        DeckModel.findOne({_id: id}, (err, deck) => {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting deck.',
                    error: err
                });
            }

            if (!deck) {
                return res.status(404).json({
                    message: 'No such deck'
                });
            }
            var cards = deck.draw(numOfCards);
            return res.json({"cards": cards});
        });
    },
    /**
     * deckController.list()
     */
    list: function (req, res) {
        DeckModel.find((err, decks) => {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting deck.',
                    error: err
                });
            }
            return res.send('NOT IMPLEMENTED: Author list');
            //return res.json(decks);
        });
    },

    /**
     * deckController.show()
     */
    show: function (req, res) {
        const id = req.params.id;

        DeckModel.findOne({_id: id}, (err, deck) => {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting deck.',
                    error: err
                });
            }

            if (!deck) {
                return res.status(404).json({
                    message: 'No such deck'
                });
            }
            return res.json(deck);
        });
    },

    /**
     * deckController.create()
     */
    create: async function (req, res) {
        const deck = new DeckModel({
			type : req.body.type || 'FULL',
			shuffled : req.body.shuffled || false
        });
        console.log(deck)
        deck.postCreate();
        deck.save((err, deck) => {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating deck',
                    error: err
                });
            }
            //var deckJS = deck.toJSON()

            return res.status(201).json({"deckId": deck._id, "shuffled": deck.shuffled, "type":deck.type, "reamining": deck.cards.length});
        });
    },

    /**
     * deckController.update()
     */
    update: function (req, res) {
        const id = req.params.id;

        DeckModel.findOne({_id: id}, (err, deck) => {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting deck',
                    error: err
                });

            }
            if (!deck) {
                return res.status(404).json({
                    message: 'No such deck'
                });
            }

            deck.type = req.body.type ? req.body.type : deck.type;
			deck.shuffle = req.body.shuffle ? req.body.shuffle : deck.shuffle;
			deck.cards = req.body.cards ? req.body.cards : deck.cards;
			
            deck.save((err, deck) => {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating deck.',
                        error: err
                    });
                }
                return res.send('NOT IMPLEMENTED: Author list');
                //return res.json(deck);
            });
        });
    },

    /**
     * deckController.remove()
     */
    remove: function (req, res) {
        const id = req.params.id;

        DeckModel.findByIdAndRemove(id, (err, deck) => {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the deck.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
