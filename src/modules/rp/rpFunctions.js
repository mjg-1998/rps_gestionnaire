const mongoose = require('mongoose');
const rp  = mongoose.model('RP');

class rpFunctions {
    static getRpById(id){
        return new Promise(function (resolve, reject) {
            rp.find({"_id": id},
                function (err, rps) {
                    if (err) {
                        reject(err);
                    }
                    return resolve(rps[0]);
                });
        });
    };

    static getAllRps() {
        return new Promise(function (resolve, reject) {
            rp.find({}, function (err, allRps) {
                if (err) {
                    reject(err);
                }
                resolve(allRps);
            });
        })
    }
}

module.exports = rpFunctions;