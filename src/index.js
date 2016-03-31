var Firebase = require('firebase');
var firebaseRef = new Firebase('https://birdlist.firebaseio.com/');

module.exports = {
    getByCode(code) {
        return firebaseRef.child('locations').child(code).then(snap => {
            var data = snap.val();
            if (data) {
                return data;
            } else {
                return null;
            }
        });
    }
};