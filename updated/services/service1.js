'use strict';

const Network = require('../app/network.js');

class Service1 {
    constructor() {
        this.entryPoint = 'http://localhost:3001/course/search?query=';
        this.network = new Network();
    }

    async getCourseByName(name) {
        let url = this.entryPoint + name;
        let response = await this.network.asyncGet(url);
        response = JSON.parse(response);
        for (let i = 0; i < response.length; ++i) {
            response[i].provider = 'service1';
        }
        return response;
    }
}

module.exports = Service1;
