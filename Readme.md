# bird-list
Api for database of birds

## How to use

```
npm install --save bird-list
```

```js
var birdList = require('bird-list');

birdList.getBySpeciesCode('weosun1').then((data) => {
    // Metadata for a bird
    console.log(data);

    /*
        {
            category: 'species',
            comName: 'Western Olive Sunbird',
            comNameCodes: [ 'WOSU', 'OLSU' ],
            sciName: 'Cyanomitra obscura',
            sciNameCodes: [ 'CYOB' ],
            speciesCode: 'weosun1',
            taxonID: 'TC010237',
            taxonOrder: 27067,
        }
    */
}).catch((error) => {
    console.log(error);
})
```

## API

### getBySpeciesCode(code)
Return meta data for a bird

```js
    birdList.getBySpeciesCode(code)
```