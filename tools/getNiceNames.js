var Firebase = require('firebase');
var firebaseRef = new Firebase('https://birding-locations.firebaseio.com/');
var ebird = require('ebird-js');

var ref = firebaseRef.child('locations');

ref.authWithCustomToken(process.env.firebase).then(() => {
    return ref.once('value');
}).then(snap => {
    var ps = [];
    snap.forEach(subSnap => {
        var name = subSnap.val().name;
        console.log('Searching for ' + name);
        ps.push(ebird.ref.region({
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