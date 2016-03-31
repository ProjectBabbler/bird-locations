var Firebase = require('firebase');
var firebaseRef = new Firebase('https://birding-locations.firebaseio.com/');
var request = require('request-promise');

var ref = firebaseRef.child('ebird/locations');

var baseUrl = 'http://ebird.org/ws1.1/ref/location/list';

var extras = {
    ABA: {
        name: 'ABA'
    },
};

ref.authWithCustomToken(process.env.firebase).then(() => {
    return request.get(baseUrl, {
        qs: {
            fmt: 'json',
            rtype: 'country',
        },
        json: true,
    });
}).then(countries => {
    var ps = [];
    countries.forEach(country => {
        ps.push(ref.child(country.countryCode).set(country));
    });
    return Promise.all(ps);
}).then(() => {
    return request.get(baseUrl, {
        qs: {
            fmt: 'json',
            rtype: 'subnational1',
        },
        json: true,
    });
}).then(subnationals => {
    var ps = [];
    subnationals.forEach(subnational => {
        if (subnational.subnational1Code == subnational.countryCode + '-') {
            return;
        }

        ps.push(ref.child(subnational.subnational1Code).set(subnational));
    });
    return Promise.all(ps);
}).then(() => {
    return request.get(baseUrl, {
        qs: {
            fmt: 'json',
            rtype: 'subnational2',
        },
        json: true,
    });
}).then(subnationals => {
    var ps = [];
    subnationals.forEach(subnational => {
        ps.push(ref.child(subnational.subnational2Code).set(subnational));
    });
    return Promise.all(ps);
}).then(() => {
    var ps = [];
    for (var key in extras) {
        ps.push(ref.child(key).set(extras[key]));
    }
    return Promise.all(ps);
}).then(() => {
    console.log('Saved locations');
    process.exit(0);
}).catch(e => {
    console.log('Error', e);
    process.exit(1);
});