// var parser = require('../parser');
const parse = require('xml-js');

class BaseResponse {
    constructor(rawXML) {
        this.rawXML = JSON.parse(parse.xml2json(rawXML, {compact: true}));
        if(this.rawXML.response && this.rawXML.response.returncode && this.rawXML.response.returncode._text !== 'SUCCESS') {
            console.error(`Error in BBB respounce '${JSON.stringify(this.rawXML)}'`);
            // throw new Error(`Error in BBB respounce '${JSON.stringify(this.rawXML)}'`);
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
