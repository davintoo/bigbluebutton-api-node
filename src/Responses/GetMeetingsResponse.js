const BaseResponse = require('./BaseResponse');
const Meeting = require('../core/Meeting');

class GetMeetingsResponse extends BaseResponse {
    constructor(xml) {
        super(xml);
        this.meetings = [];
        // console.log('this.rawXML', this.rawXML.response);
        for (var i = 0; i < this.rawXML.response.meetings.meeting.length; i++) {
            this.meetings[i] = new Meeting(this.rawXML.response.meetings.meeting[i]);
        }

    }

    getMeetings() {
        if (this.meetings) {
            return this.meetings;
        } else {
            for (var i = 0; i < this.rawXML.response.meetings.meeting.length; i++) {
                this.meetings[i] = new Meeting(this.rawXML.response.meetings.meeting[i]);
            }
            return this.meetings;
        }

    }
}

module.exports = GetMeetingsResponse;
