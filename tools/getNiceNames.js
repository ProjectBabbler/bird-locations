var ebird = require('ebird-js');
var RateLimiter = require('limiter').RateLimiter;
var limiter = new RateLimiter(60, 'minute');
var firebase = require('firebase');
var config = {
    apiKey: 'AIzaSyB7ugHIbhdF-F2LmZcISBb2HgmF1ppp9oY',
    databaseURL: 'https://birding-locations.firebaseio.com',
    serviceAccount: {
        project_id: 'birding-locations',
        private_key: process.env.FIREBASE_SERVICE_KEY.replace(/\\n/g, '\n'),
        client_email: 'private-console-key@birding-locations.iam.gserviceaccount.com',
    }
};
let firebaseApp = firebase.initializeApp(config, 'bird-locations-server');
var ref = firebaseApp.database().ref('locations');

ref.once('value').then(snap => {
    var ps = [];
    snap.forEach(subSnap => {
        var location = subSnap.val();
        if (location.niceName) {
            return;
        }
        var name = location.name;
        console.log('Searching for ' + name);
        ps.push(new Promise((resolve, reject) => {
            limiter.removeTokens(1, () => {
                ebird.ref.region({
                    q: encodeURI(name),
                }).then(results => {
                    var pps = [];
                    results.forEach(r => {
                        console.log('Setting name for ' + r.code);
                        pps.push(ref.child(r.code).child('niceName').set(r.name));
                    });
                    return Promise.all(pps);
                }).catch(e => {
                    // Failures are ok
                }).then(resolve);
            });
        }));
    });

    return Promise.all(ps);
}).then(() => {
    console.log('Updated Names');
    process.exit(0);
}).catch(e => {
    console.log('Error', e);
    process.exit(1);
});