const BaseResponse = require('./BaseResponse');
const Record = require('../core/Record');

class GetRecordingssResponse extends BaseResponse {
    constructor(xml) {
        super(xml);
        this.records = [];
        this._parseRecords();
    }

    _parseRecords() {
        // console.log('this.rawXML', this.rawXML.response);
        if (Array.isArray(this.rawXML.response.meetings.meeting)) {
            for (var i = 0; i < this.rawXML.response.recordings.recording.length; i++) {
                this.records[i] = new Record(this.rawXML.response.recordings.recording[i]);
            }
        } else if (this.rawXML.response.recordings.recording) {
            this.records[0] = new Record(this.rawXML.response.recordings.recording);
        }
    }

    getRecords() {
        if (this.records) {
            return this.records;
        } else {
            this._parseRecords();
            return this.records;
        }
    }
}

module.exports = GetRecordingssResponse;
