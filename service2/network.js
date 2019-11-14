'use strict';

const request = require('request');

class Network {
  constructor() {
    
  }

  async asyncRequest(url) {
    return new Promise((resolve, reject) => {
      request.get(url, (err, res, body) => {
        if (err) reject(err);
        if (res.statusCode === 200) resolve(body);
        else resolve(res.statusCode);
      });
    });
  }

  async asyncPost(url, data) {
    return new Promise((resolve, reject) => {
      request.post({
        url: url,
        form: data
      }, (err, res, body) => {
        if (err) throw err;
        resolve(body);
      });
    });
  }
}

module.exports = Network;
