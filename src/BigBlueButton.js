const getenv = require('getenv');
const querystring = require('querystring');
const UrlBuilder = require('./Util/UrlBuilder');
const ApiMethod = require('./core/ApiMethod');
const parse = require('xml-js');
// var parse = require('xml-js');
// var Curl = require('node-libcurl').Curl;
// var fs = require('fs');
const ApiVersionResponse = require('./Responses/ApiVersionResponse');
// var SetConfigXMLResponse = require('./Responses/SetConfigXMLResponse');
const JoinMeetingResponse = require('./Responses/joinMeetingResponse');
// var EndMeetingResponse = require('./Responses/EndMeetingResponse');
const IsMeetingRunningResponse = require('./Responses/IsMeetingRunningResponse');
// var GetMeetingsResponse = require('./Responses/GetMeetingsResponse');
const GetMeetingInfoResponse = require('./Responses/GetMeetingInfoResponse');
// var GetRecordingsResponse = require('./Responses/GetRecordingsResponse');
// var PublishRecordingsResponse = require('./Responses/PublishRecordingsResponse');
// var DeleteRecordingsResponse = require('./Responses/DeleteRecordingsResponse');
// var UpdateRecordingsResponse = require('./Responses/UpdateRecordingsResponse');
// var CreateMeetingParametres = require('../src/Parametres/CreateMeetingParametres');
// var GetMeetingInfoParameters = require('../src/Parametres/GetMeetingInfoParametres');
// var strlen = require('locutus/php/strings/strlen');
var dynamicClass = require('./Responses/ResponseClassFactory.js');


const fetch = require('node-fetch');

class BigBlueButton {

    constructor(bbbServerBaseUrl, securitySalt) {
        this.securitySalt = securitySalt || getenv('BBB_SECURITY_SALT');
        this.bbbServerBaseUrl = bbbServerBaseUrl || getenv('BBB_SERVER_BASE_URL');
        this.urlBuilder = new UrlBuilder(this.securitySalt, this.bbbServerBaseUrl);
    }

    async getApiVersion() {
        return this.processXmlResponse(this.urlBuilder.buildUrl(), 'ApiVersionResponse')
    }

    async createMeeting(createMeetingParams) {
        return this.processXmlResponse(this.urlBuilder.buildUrl(new ApiMethod().CREATE, querystring.stringify(createMeetingParams)),
            'CreateMeetingResponse', parse.json2xml(createMeetingParams, {compact: true}));
    }

    // getDefaultConfigXMLUrl() {
    //     return this.urlBuilder.buildUrl(new ApiMethod().SET_CONFIG_XML);
    // }
    //
    // getDefaultConfigXML(callback) {
    //     var url = this.getDefaultConfigXMLUrl();
    //     this.processXmlResponse(url, 'GetDefaultConfigXMLResponse', callback);
    //
    // }
    //
    // setConfigXML(callback, setConfigXMLParams) {
    //     var url = this.getDefaultConfigXMLUrl();
    //     var setConfigXMLPayload = this.urlBuilder.buildQs(new ApiMethod().SET_CONFIG_XML, setConfigXMLParams.getHTTPQuery());
    //     this.processXmlResponse(url, 'SetConfigXMLResponse', callback, setConfigXMLPayload);
    //
    // }
    //
    // setConfigXMLUrl() {
    //     return this.urlBuilder.buildUrl(new ApiMethod().SET_CONFIG_XML, '', false);
    // }

    getJoinMeetingURL(joinMeetingParams) {
        return this.urlBuilder.buildUrl(new ApiMethod().JOIN, querystring.stringify(joinMeetingParams));
    }

    async joinMeeting(joinMeetingParams) {
        return this.processXmlResponse(this.getJoinMeetingURL(joinMeetingParams), 'JoinMeetingResponse');
    }

    // getEndMeetingURL(endParams) {
    //     return this.urlBuilder.buildUrl(new ApiMethod().END, endParams.getHTTPQuery());
    // }
    //
    // endMeeting(callback, endParams) {
    //     var url = this.getEndMeetingURL(endParams);
    //     console.log(url);
    //     this.processXmlResponse(url, 'EndMeetingResponse', callback);
    //
    // }
    //
    // getIsMeetingRunningUrl(meetingParams) {
    //     return this.urlBuilder.buildUrl(new ApiMethod().IS_MEETING_RUNNING, meetingParams.getHTTPQuery());
    // }

    async isMeetingRunning(meetingParams) {
        return this.processXmlResponse(this.urlBuilder.buildUrl(new ApiMethod().IS_MEETING_RUNNING, querystring.stringify(meetingParams)),
            'IsMeetingRunningResponse');
    }

    // getMeetingsUrl() {
    //     return this.urlBuilder.buildUrl(new ApiMethod().GET_MEETINGS);
    // }
    //
    // getMeetings(callback) {
    //     var url = this.getMeetingsUrl();
    //     this.processXmlResponse(url, 'GetMeetingsResponse', callback);
    //
    // }
    //
    // getMeetingInfoUrl(meetingParams) {
    //     console.log(meetingParams.getHTTPQuery());
    //     return ;
    // }

    async getMeetingInfo(meetingParams) {
        return this.processXmlResponse(this.urlBuilder.buildUrl(new ApiMethod().GET_MEETING_INFO, querystring.stringify(meetingParams)),
            'GetMeetingInfoResponse');
    }

    // getRecordingsUrl(recordingParams) {
    //     console.log(recordingParams.getHTTPQuery());
    //     return this.urlBuilder.buildUrl(new ApiMethod().GET_RECORDINGS, recordingParams.getHTTPQuery());
    // }
    //
    // getRecordings(callback, recordingParams) {
    //     var url = this.getRecordingsUrl(recordingParams);
    //     console.log(url);
    //     this.processXmlResponse(url, 'GetRecordingsResponse', callback);
    //
    // }
    //
    // getPublishRecordingsUrl(recordingParams) {
    //     return this.urlBuilder.buildUrl(new ApiMethod().PUBLISH_RECORDINGS, recordingParams.getHTTPQuery());
    // }
    //
    // publishRecordings(callback, recordingParams) {
    //     var url = this.getPublishRecordingsUrl(recordingParams);
    //     this.processXmlResponse(url, 'PublishRecordingsResponse', callback);
    //
    // }
    //
    // getDeleteRecordingsUrl(recordingParams) {
    //     return this.urlBuilder.buildUrl(new ApiMethod().DELETE_RECORDINGS, recordingParams.getHTTPQuery());
    // }
    //
    // deleteRecordings(callback, recordingParams) {
    //     var url = this.getDeleteRecordingsUrl(recordingParams);
    //     this.processXmlResponse(url, 'DeleteRecordingsResponse', callback);
    //
    // }
    //
    // getUpdateRecordingsUrl(recordingParams) {
    //     return this.urlBuilder.buildUrl(new ApiMethod().UPDATE_RECORDINGS, recordingParams.getHTTPQuery());
    // }
    //
    // updateRecordings(callback, recordingParams) {
    //     var url = this.getUpdateRecordingsUrl(recordingParams);
    //     this.processXmlResponse(url, 'UpdateRecordingsResponse', callback);
    //
    // }

    async processXmlResponse(url, className, payload = '') {
        console.log('processXmlResponse.url', url);
        let options = {};
        if (payload !== '') {
            options.method = 'POST';
            options.body = payload;
        }
        const body = await fetch(url, {
            headers: {
                // 'Content-Type': 'application/json',
                // 'Authorization': 'Bearer ' + this._token
            },
        }).then(res => res.text());
        console.log('processXmlResponse.body', body);

        const classResponse = dynamicClass(className);
        // const obj = new classResponse(body);

        return new classResponse(body);
    }
}

module.exports = BigBlueButton;
