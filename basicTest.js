var locations = require('./src/index.js');
var expect = require('chai').expect;

locations.getByCode('US').then(data => {
    expect(data).to.deep.equal({
        countryCode: 'US',
        localAbbrev: 'US',
        name: 'United States',
        nameLong: 'United States of America',
        nameShort: '',
    });
}).then(() => {
    console.log('success');
    process.exit(0);
}).catch(e => {
    console.log(e);
    process.exit(1);
});