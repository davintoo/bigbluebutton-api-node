const getenv = require('getenv');
const querystring = require('querystring');
const UrlBuilder = require('./Util/UrlBuilder');
const ApiMethod = require('./core/ApiMethod');
const parse = require('xml-js');

const ApiVersionResponse = require('./Responses/ApiVersionResponse');
const JoinMeetingResponse = require('./Responses/joinMeetingResponse');
const EndMeetingResponse = require('./Responses/EndMeetingResponse');
const IsMeetingRunningResponse = require('./Responses/IsMeetingRunningResponse');
const GetMeetingsResponse = require('./Responses/GetMeetingsResponse');
const GetMeetingInfoResponse = require('./Responses/GetMeetingInfoResponse');
const GetRecordingsResponse = require('./Responses/GetRecordingsResponse');
// var PublishRecordingsResponse = require('./Responses/PublishRecordingsResponse');
// var DeleteRecordingsResponse = require('./Responses/DeleteRecordingsResponse');
// var UpdateRecordingsResponse = require('./Responses/UpdateRecordingsResponse');
const dynamicClass = require('./Responses/ResponseClassFactory.js');
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

    getJoinMeetingURL(joinMeetingParams) {
        return this.urlBuilder.buildUrl(new ApiMethod().JOIN, querystring.stringify(joinMeetingParams));
    }

    async joinMeeting(joinMeetingParams) {
        return this.processXmlResponse(this.getJoinMeetingURL(joinMeetingParams), 'JoinMeetingResponse');
    }

    async endMeeting(endParams) {
        return this.processXmlResponse(this.urlBuilder.buildUrl(new ApiMethod().END, querystring.stringify(endParams)),
            'EndMeetingResponse');
    }

    async isMeetingRunning(meetingParams) {
        return this.processXmlResponse(this.urlBuilder.buildUrl(new ApiMethod().IS_MEETING_RUNNING, querystring.stringify(meetingParams)),
            'IsMeetingRunningResponse');
    }

    async getMeetings() {
        try {
            const meetingsRes = await this.processXmlResponse(this.urlBuilder.buildUrl(new ApiMethod().GET_MEETINGS), 'GetMeetingsResponse');
            return meetingsRes.getMeetings();
        } catch (err) {
            return [];
        }
    }

    async getMeetingInfo(meetingParams) {
        return this.processXmlResponse(this.urlBuilder.buildUrl(new ApiMethod().GET_MEETING_INFO, querystring.stringify(meetingParams)),
            'GetMeetingInfoResponse');
    }

    async getRecordings(recordingParams) {
        return this.processXmlResponse(this.urlBuilder.buildUrl(new ApiMethod().GET_RECORDINGS, querystring.stringify(recordingParams)),
            'GetRecordingsResponse');

    }
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
        // console.log('processXmlResponse.url', url);
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
        // console.log('processXmlResponse.body', body);

        const classResponse = dynamicClass(className);
        // const obj = new classResponse(body);

        return new classResponse(body);
    }
}

module.exports = BigBlueButton;
