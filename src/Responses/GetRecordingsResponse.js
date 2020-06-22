const BaseResponse = require('./BaseResponse');
const Record = require('../core/Record');

class GetRecordingssResponse extends BaseResponse {
    constructor(xml) {
        super(xml);
        this.records = [];
        if (this.rawXML.response.recordings.recording) {
            for (var i = 0; i < this.rawXML.response.recordings.recording.length; i++) {
                this.records[i] = new Record(this.rawXML.response.recordings.recording[i]);
            }
        }
    }

    getRecords() {
        if (this.records) {
            return this.records;
        } else {
            for (var i = 0; i < this.rawXML.response.recordings.recording.length; i++) {
                this.records[i] = new Record(this.rawXML.response.recordings.recording[i]);
            }
            return this.records;
        }
    }
}

module.exports = GetRecordingssResponse;
