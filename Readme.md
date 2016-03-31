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
            countryCode: 'US',
            localAbbrev: 'US',
            name: 'United States',
            nameLong: 'United States of America',
            nameShort: '',
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