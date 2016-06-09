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
    console.log('success', 'getByCode US');
}).then(() => {
    return locations.getIndex().then(index => {
        var results = index.searchResults('Marin california');
        expect(results[0].value).to.equal('US-CA-041');
        console.log('success', 'index Marin california');

        var results2 = index.searchResults('Marin CA US');
        expect(results2[0].value).to.equal('US-CA-041');
        console.log('success', 'index Marin CA US');

        var results3 = index.searchResults('ABA');
        expect(results3[0].value).to.equal('aba');
        console.log('success', 'index ABA');
    });
}).then(() => {
    console.log('success');
    process.exit(0);
}).catch(e => {
    console.log(e);
    process.exit(1);
});