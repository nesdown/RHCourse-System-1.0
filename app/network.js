'use strict';

const request = require('request');

class Network {
    constructor() {

    }

    async asyncGet(url) {
        return new Promise((resolve, reject) => {
            request.get(url, (err, res, body) => {
                if (err) reject(err);
                if (res) {
                    if (res.statusCode === 200) resolve(body);
                    else resolve(res.statusCode);
                }
            });
        });
    }
}

module.exports = Network;
