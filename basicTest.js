var birdList = require('./src/index.js');
var expect = require('chai').expect;

birdList.getBySpeciesCode('weosun1').then(data => {
    expect(data).to.deep.equal({
        category: 'species',
        comName: 'Western Olive Sunbird',
        comNameCodes: [ 'WOSU', 'OLSU' ],
        sciName: 'Cyanomitra obscura',
        sciNameCodes: [ 'CYOB' ],
        speciesCode: 'weosun1',
        taxonID: 'TC010237',
        taxonOrder: 27067,
    });
}).then(() => {
    console.log('success');
    process.exit(0);
}).catch(e => {
    console.log(e);
    process.exit(1);
});