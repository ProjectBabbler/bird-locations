var firebase = require('firebase');
var config = {
    apiKey: 'AIzaSyB7ugHIbhdF-F2LmZcISBb2HgmF1ppp9oY',
    databaseURL: 'https://birding-locations.firebaseio.com',
};
let firebaseApp = firebase.initializeApp(config, 'bird-locations');
var lunr = require('lunr');


module.exports = {
    getByCode(code) {
        return firebaseApp.database().ref('locations').child(code).once('value').then(snap => {
            var data = snap.val();
            if (data) {
                return data;
            } else {
                return null;
            }
        });
    },

    getAll() {
        return firebaseApp.database().ref('locations').once('value').then(snap => {
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

    getIndex() {
        return new Promise((resolve, reject) => {
            this.getAll().then(locs => {
                var idx = lunr(function() {
                    this.ref('code');
                    this.field('name', { boost: 10 });
                    this.field('niceName');
                });

                for (var code in locs) {
                    var loc = locs[code];
                    if (loc.name) {
                        idx.add({
                            code: code,
                            name: loc.name,
                            niceName: this.getNiceName(loc),
                        });
                    } else {
                        console.log(code + ' empty');
                    }
                }

                idx.searchResults = (query) => {
                    return idx.search(query).map(result => {
                        var loc = locs[result.ref];
                        return {
                            value: result.ref,
                            label: this.getNiceName(loc),
                            location: loc,
                        };
                    });
                };

                resolve(idx);
            });
        });
    }
};