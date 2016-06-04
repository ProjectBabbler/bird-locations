var firebase = require('firebase');
var config = {
    apiKey: 'AIzaSyB7ugHIbhdF-F2LmZcISBb2HgmF1ppp9oY',
    databaseURL: 'https://birding-locations.firebaseio.com',
    serviceAccount: {
        project_id: 'birding-locations',
        // This key only has read permissions.
        private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCKB8qnbzO0Bl3f\nainp6sbfDAny+xnfPTL/5RWp7Ao+Z7IovrKB60DdqLYFXmLqxe1MKIiVy6JUgUS+\ney/P3RoXlVQjO9IMCCWmMuxUiPLKAJnXaYtBgYYv5iQkLJsZ/a0IYzj47zcpt1AQ\nwE74B6g19V1i84XBrwhTM2rGNfWJXHpw9ZtDrSwHLlhkKhbAr8F0UEPRfp9izee9\ncnxjGVMwxlWVWmGZwwtKb+YiO12a8obYUDaNtqwqChf1Eesfb4/MEHxI7onj1p2y\nmsLXzThdaAFSnOKr43MttZKC25RUtP3Mw+u9d5Wl32SMZ5Vn/WQR5IRfBQ7W1Evl\nm47JDG1pAgMBAAECggEAUX9OOVPgHDASJwKA4ts7NqDeEvgNi5CP1yVEiEKUvcnu\nGD6YGTt03itp5XuYPfRFKs1X79H+85QrqagET9/FMx15QyBj4bTBvgKdJUCC0aBP\nNS/dB/1Y5FknB7DKlyr/ik9DaT+cu2W/wVQ6jBnBSLKpw+3zEKuu56kZJxTe942g\nRi7SUxaAXGs7ejGgiBiTcxILI3InIeljLg5Xwc+qY8jTtvWLyL0V7FDZN4pRhT+N\n/uQQ1Jcqx2xx1qXKAiwdMnd4cV9zVeTaRMTVgm4pg2pmMrFO+iCHGai03QwkFbaZ\nQ82uRHmhSWwpYQlkevQVb4Lmm1MGkjk1f2Aec1ihTQKBgQDgeNQr5eG+q0U8Y6E3\njSYqED90ei/U8n8oZru//j00DLruLlGjj/hsYOz+mQR5XB0YS1GkI1sa2UHdM+M0\n/EEFHZ/3xj/NRZg1LximgFFnS13/Q7ZOa5hWZ4KV4zWd0iNp/xR2YUGUMVKp9+1t\nSwhb7nQEsdGmIPGrD+N/jS0KdwKBgQCdatlCa0CeAzAvHnouDq+/eNRcDogWNaKH\noxO3WFcCc5eM9JXBC+wyyWteTQ9E1vAjbMgPKoIaO60W75NBM+LQeYWHtq1bI1cN\nGuk+RBn2TqW7+doz+yyjaXdYR/fwXxptGtAvwP9Ty7J+TT70aHQSvw4YC2ZMfFQy\nmQqAK3pfHwKBgEw7nMrfwl/PqK7OoyTLked9Jx+2k2H9jQO6iA63GDACFsXnAyDK\nNzMPY80/SE6y4sqqYaqdu0YN/JlUEtiexrInEnnCYU6kUQHW4cdCEuNCrESRyWsu\njUji1G11AXN8tzw7PcbKVswuSAWjRoX0kn0uKUai4TFLROe0eK2L030XAoGAfvVF\n9AN8QfRgUCBMegjuRYa1/ujZaNApHSuxIxXkVt3TRKOeg+uRvAQmzA9qWSLg2jFJ\nyLGH7JBksTLXmKa4L1tTDnmOpwqBktg5dTaHmdckY87G5VWWUtUko9anaP3K2mPd\ntCX7xyFp++Ng+s2jj9r3Cv1mrBk57vTvOx/VuhECgYAZixww3Bw1qULdxQx55dUH\nl30DjnjA0vk2A1w8Bfg84pHr7XEfWTRtaDcZ7IMhbQo33FZsZz3d/AGi+uYXgWYJ\ntg1SaVZE90PukOOfQmKB47gsmncI7Ynh0EcWmVHrWkO/1imccl3NIv7f7X4ExDYr\nw+TJ7Fkbtuaqw5P/w7pw3g==\n-----END PRIVATE KEY-----\n',
        client_email: 'public-read-only@birding-locations.iam.gserviceaccount.com',
    }
};
let firebaseApp = firebase.initializeApp(config);
var split = require('split-string-words');


module.exports = {
    getByCode(code) {
        return firebaseApp.database().ref('locations').child(code).once('value').then(snap => {
            var data = snap.val();
            if (data) {
                return data;
            } else {
                return null;
            }
        });
    },

    getAll() {
        return firebaseApp.database().ref('locations').once('value').then(snap => {
            var data = snap.val();
            if (data) {
                return data;
            } else {
                return null;
            }
        });
    },

    getNiceName(result) {
        return result.niceName || result.name;
    },

    getForAutoComplete() {
        return new Promise((resolve, reject) => {
            this.getAll().then(locs => {
                var options = [];
                for (var code in locs) {
                    var loc = locs[code];
                    if (loc.name) {
                        options.push({
                            value: code,
                            label: this.getNiceName(loc),
                            location: loc,
                        });
                    } else {
                        console.log(code + ' empty');
                    }
                }

                resolve(options);
            });
        });
    },

    filterAutoComplete(input, options) {
        var words = split(input);
        var filtered = options.filter(o => {
            var searchText = split(o.label.toLowerCase()).join(' ');
            return words.every(word => {
                return searchText.match(word.toLowerCase());
            });
        });

        return filtered;
    }
};