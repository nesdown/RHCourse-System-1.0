const axios = require('axios');
const cheerio = require('cheerio');

class serviceHandler {
  constructor (handlerBuilder) {
    this.url = handlerBuilder.url;
    this.output = handlerBuilder.output;
    this.serviceType = handlerBuilder.serviceType;
  }

  fetchData () {
    if (this.serviceType == 1) {
      //get basic webpage data via axios
      axios.get(this.url).then(response => {
        const html = response.data;
        console.log(html);
        return(html);
      })
      .catch(console.error);
    }

    else if (this.serviceType == 2) {
      axios.get(this.url).then(response => {
        const html = response.data;
        const $ = cheerio.load(html)
        const statsTable = $('.statsTableContainer > tr');
        return(statsTable);
      })
      .catch(console.error);
    }

    else {
      console.log("It seems like the data has not been sent correctly. Check your settings.")
      callback(new Error("Error #1. The data filter has not been set sucessfully."))
    }
  }

  outputFormatter(data) {
    if (this.output = "Bunch") {
      console.log(data)
    }

    else if (this.output = "Prices") {
      for (let  i = 0; i < data[0].length; i++){
        console.log(`Class: ${data[0][i]} | Price: ${data[1][i]}
                    ==========================================`)
      }
    }

    else if (this.output = "Description") {
      for (let  i = 0; i < data[0].length; i++){
        console.log(`Class: ${data[0][i]} | Price: ${data[1][i]} | Description: ${data[2][i]}
                    ==========================================`)
      }
    }

    else {
      console.log("It seems like the data has not been sent correctly. Check your settings.")
      callback(new Error("Error #2. The data output filter has been set incorrectly."))
    }
  }
}

module.exports = serviceHandler;
