const readline = require('readline-sync');

class handlerBuilder {
  url = '';
  output = '';
  serviceType = 0;

  constructor() {
    this.url = readline.question("What is the url to check?");
    this.output = readline.question("What is the output type ypu want to get?");
    this.serviceType = readline.question("What service provider are you using?");
  }
}

module.exports = handlerBuilder;
