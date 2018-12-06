
const mongoose = require('mongoose');
const Character = mongoose.model('Character');
const cFunc = require('./characterFunctions');
const _ = require('lodash');

class characterMiddleware {

    static loadFromParameters(req,res,next, id) {
        cFunc.getCharacterById(id).then(function(character) {
            req.data.character = character;
            next();
        }, err => next(err));
    };

    static displayAll(req,res, next) {
        cFunc.getAllCharacters().then( function(all) {
            res.send(all);
        }, err=>next(err));
    };

    static displayACharacter(req,res,next){
        if(!req.data.character) {
            return next({
                message: "Tu ne joues plus ce personnage, ou il n'existe pas. ",
                status: 404
            });
        }
        res.send(req.data.character);
    };

    static createACharacter(req, res, next) {
        const chara = new Character(
            req.body
        );
        chara.save(function (err, characterSaved) {
                if (err) {
                    next(err);
                }
                res.send(characterSaved);
            }
        );
    };

    static modifyACharacter(req, res, next) {
        req.data.character = _.extend(req.data.character, req.body);
        req.data.character.save((err, charaUpdated) => {
            if(err) {
                return next(err);
            }
            else {
                res.send(charaUpdated);
            }
        });
    };

    static deleteACharacter(req, res, next) {
        req.data.character.delete((err, info) => {
            if (err) return next(err);
            res.send({
                message: "Ce personnage a été supprimé. "
            });
        });
    };

}

module.exports=characterMiddleware;