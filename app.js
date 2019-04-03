var casper = require("casper").create({
    verbose: true,
    logLevel: 'error',
    clientScripts: ["vendors/jquery.min.js", "vendors/lodash.js"]
});

var links = []

const FIRST_SEARCH_TERM = 'apple'
const SECOND_SEARCH_TERM = 'aphabet'

function getLinks() {
    var links = $('.b_algo a');
    return _.map(links, function (e) {
        return e.getAttribute('href')
    });
}

function inputSearchTerm(self, text){
    self.fill('form[action="/search"]', {
        q: text
    }, true)
}

casper.start('http://bing.com', function () {
    inputSearchTerm(this, FIRST_SEARCH_TERM)
})

casper.then(function(){
    links = this.evaluate(getLinks)
    inputSearchTerm(this, SECOND_SEARCH_TERM)
})

casper.then(function () {
    links = links.concat(this.evaluate(getLinks))
})

casper.run(function () {
    this.echo('count of links: ' + links.length)
    this.echo('*'+links.join('\n*')).exit()
})