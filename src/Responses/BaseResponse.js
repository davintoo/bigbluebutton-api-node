// var parser = require('../parser');
const parse = require('xml-js');

class BaseResponse {
    constructor(rawXML) {
        this.rawXML = JSON.parse(parse.xml2json(rawXML, {compact: true}));
        if(!this.rawXML.response) {
            throw new Error(`Unable to find response in '${rawXML}'`);
        }
    }

    getRawXML() {
        return parse.json2xml(this.rawXML, {compact: true});
    }

    getReturnCode() {
        return this.rawXML.response.returncode._text;
    }

    getMessageKey() {
        return this.rawXML.response.messageKey._text;
    }

    getMessage() {
        return this.rawXML.response.message._text;
    }
}

module.exports = BaseResponse;
