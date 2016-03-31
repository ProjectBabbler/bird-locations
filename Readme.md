# bird-list
Database of locations for ebird

## How to use

```
npm install --save bird-locations
```

```js
var locations = require('bird-locations');

locations.getByCode('US').then((data) => {
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

### getByCode(code)
Return data for a location

```js
    locations.getByCode(code)
```