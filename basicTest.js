var locations = require('./src/index.js');
var expect = require('chai').expect;

locations.getByCode('US').then(data => {
    expect(data).to.deep.equal({
        countryCode: 'US',
        localAbbrev: 'US',
        name: 'United States',
        nameLong: 'United States of America',
        nameShort: '',
        niceName: 'United States (US)',
    });
}).then(() => {
    return locations.getForAutoComplete().then(options => {
        var results = locations.filterAutoComplete('Marin california', options);
        expect(results[0].value).to.equal('US-CA-041');

        var results2 = locations.filterAutoComplete('Marin CA US', options);
        console.log(results2)
        expect(results2[0].value).to.equal('US-CA-041');
    });
}).then(() => {
    console.log('success');
    process.exit(0);
}).catch(e => {
    console.log(e);
    process.exit(1);
});