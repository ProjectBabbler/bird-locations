var Firebase = require('firebase');
var firebaseRef = new Firebase('https://birding-locations.firebaseio.com/');
var split = require('split-string-words');


module.exports = {
    getByCode(code) {
        return firebaseRef.child('locations').child(code).once('value').then(snap => {
            var data = snap.val();
            if (data) {
                return data;
            } else {
                return null;
            }
        });
    },

    getAll() {
        return firebaseRef.child('locations').once('value').then(snap => {
            var data = snap.val();
            if (data) {
                return data;
            } else {
                return null;
            }
        });
    },

    getNiceName(result) {
        return result.niceName || result.name;
    },

    getForAutoComplete() {
        return new Promise((resolve, reject) => {
            this.getAll().then(locs => {
                var options = [];
                for (var code in locs) {
                    var loc = locs[code];
                    if (loc.name) {
                        options.push({
                            value: code,
                            label: this.getNiceName(loc),
                            location: loc,
                        });
                    } else {
                        console.log(code + ' empty');
                    }
                }

                resolve(options);
            });
        });
    },

    filterAutoComplete(input, options) {
        var words = split(input);
        var filtered = options.filter(o => {
            var searchText = split(o.label.toLowerCase()).join(' ');
            return words.every(word => {
                return searchText.match(word.toLowerCase());
            });
        });

        return filtered;
    }
};