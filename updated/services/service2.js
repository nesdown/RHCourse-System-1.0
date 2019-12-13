'use strict';

const Network = require('../app/network.js');

class Service2 {
    constructor() {
        this.entryPriceList = 'http://localhost:3002/course/price-list';
        this.entryDetails = 'http://localhost:3002/course/details/';
        this.network = new Network();
    }

    async getAllCourses() {
        let i = 1;
        let priceList = [];
        while (true) {
            let f = false;
            let response = await this.network.asyncGet(this.entryPriceList + '?page=' + i);
            response = JSON.parse(response);
            for (let item of response) {
                if (item)
                    priceList.push(item);
                else {
                    f = true;
                    break;
                }
            }
            if (f) break;
            i++;
        }
        let courses = [];
        for (i = 0; i < priceList.length; ++i) {
            let details = await this.network.asyncGet(this.entryDetails + priceList[i].course_id);
            details = JSON.parse(details)[0];
            let course = {
                id: details.course_id,
                name: priceList[i].name,
                students_amount: details.students_amount,
                partner: details.partner,
                location: details.location,
                date: details.date,
                price: priceList[i].price,
                provider: 'service2'
            };
            courses.push(course);
            if (i === 1000) console.log(10000000);
        }
        return courses;
    }
}

module.exports = Service2;
