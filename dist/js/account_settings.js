'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.init = init;

require('fetch');

var _urijs = require('urijs');

var _urijs2 = _interopRequireDefault(_urijs);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import 'babel/browser-polyfill';
//import * as es6Promise from 'es6-promise';
fetch.Promise = _bluebird2.default;

//es6Promise.polyfill();

function checkStatus(response) {
    console.log('Checking status');
    console.log(response);
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        var error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
}

function parseJSON(response) {
    console.log('Parsing json');
    return response.json();
}

function handleError(error) {
    console.log('request failed', error);
}

/**
 *
 */
function init(root) {
    var _url = (0, _urijs2.default)(root + 'account/settings');
    return {

        url: _url.toString(),

        /**
         *
         */
        getSettings: function getSettings() {
            var myHeaders = new Headers();
            myHeaders.append('Accept', 'text/plain');
            myHeaders.append('Accept', 'application/json');
            myHeaders.append('Accept', '*/*');
            myHeaders.append('X-Omit', 'WWW-Authenticate');
            //myHeaders.append('cache-control', 'cache');
            return fetch(_url.toString(), {
                credentials: 'same-origin',
                cache: 'default',
                //mode: 'no-cors',
                headers: myHeaders
            }).then(function (response) {
                console.log('Checking status');
                console.log(response);
                if (response.status >= 200 && response.status < 300) {
                    return _bluebird2.default.resolve(response);
                } else {
                    var error = new Error(response.statusText);
                    error.response = response;
                    throw error;
                }
            }).then(function (response) {
                return response.json();
            });
        },

        /**
         *
         */
        updateSettings: function updateSettings(settings) {
            return fetch(_url.toString(), {
                method: 'POST',
                body: settings
            }).then(checkStatus).then(parseJSON).catch(handleError);
        }
    };
}