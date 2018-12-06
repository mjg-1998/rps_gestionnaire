const mongoose = require('mongoose');
const Rp = mongoose.model('RP');
const rFunc = require('./rpFunctions');
const _ = require('lodash');

class rpMiddleware{
    static loadFromParameters(req,res,next, id) {
        rFunc.getRpById(id).then(function(rp) {
            req.data.rp = rp;
            next();
        }, err => next(err));
    };

    static displayAll(req,res,next){
        rFunc.getAllRps().then(function (all){
            res.send(all);
        }, err =>next(all));
    };

    static displayARp(req,res,next){
        if(!req.data.rp) {
            return next({
                message: "Ce rp n'existe pas ou a été archivé. ",
                status: 404
            });
        }
        res.send(req.data.rp);
    };

    static createARp(req,res,next){
        const rp = new Rp(
            req.body
        );
        rp.save(function (err, rpSaved) {
            if(err) {
                next(err);
            }
            res.send(rpSaved);
        });
    };

    static modifyARp(req,res,next){
        req.data.rp = _.extend(req.data.rp, req.body);
        req.data.rp.save((err, rpUpdated) => {
            if(err) {
                return next(err);
            }
            else {
                res.send(rpUpdated);
            }
        })
    };

    static deleteARp(req,res,next){
        req.data.rp.delete((err,info) => {
            if(err) return next(err);
            res.send({
                message: "Ce rp a été supprimé. "
            })
        })
    };

}
module.exports = rpMiddleware;