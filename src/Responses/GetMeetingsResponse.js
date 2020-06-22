const BaseResponse = require('./BaseResponse');
const Meeting = require('../core/Meeting');

class GetMeetingsResponse extends BaseResponse {
    constructor(xml) {
        super(xml);
        this.meetings = [];
        this._parseMeetings();
    }

    _parseMeetings() {
        // console.log('this.rawXML', this.rawXML.response);
        if (Array.isArray(this.rawXML.response.meetings.meeting)) {
            for (var i = 0; i < this.rawXML.response.meetings.meeting.length; i++) {
                this.meetings[i] = new Meeting(this.rawXML.response.meetings.meeting[i]);
            }
        } else if (this.rawXML.response.meetings.meeting) {
            this.meetings[0] = new Meeting(this.rawXML.response.meetings.meeting);
        }
    }

    getMeetings() {
        if (this.meetings) {
            return this.meetings;
        } else {
            this._parseMeetings();
            return this.meetings;
        }
    }
}

module.exports = GetMeetingsResponse;
