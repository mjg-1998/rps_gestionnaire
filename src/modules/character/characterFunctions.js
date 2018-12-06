const mongoose = require('mongoose');
const character  = mongoose.model('Character');

class characterFunctions {
    static getCharacterById(id){
        return new Promise(function (resolve, reject) {
            character.find({"_id": id},
                function (err, charas) {
                    if (err) {
                        reject(err);
                    }
                    return resolve(charas[0]);
                });
        });
    };

    static getAllCharacters() {
        return new Promise(function (resolve, reject) {
            character.find({}, function (err, allCharacters) {
                if (err) {
                    reject(err);
                }
                resolve(allCharacters);
            });
        })
    }
}

module.exports = characterFunctions;