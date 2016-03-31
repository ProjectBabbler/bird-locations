var Firebase = require('firebase');
var firebaseRef = new Firebase('https://birding-locations.firebaseio.com/');

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
    }
};