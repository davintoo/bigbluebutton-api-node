const BigBlueButton = require('../src/BigBlueButton');
const inst = new BigBlueButton('', '');

(async () => {
    // let res = await inst.getApiVersion();
    // console.log(res.getVersion());

    let meetingParams = {
        'name': 'test',
        'meetingID': 2,
        'attendeePw': 'ap',
        'moderatorPw': 'mp',
        'voiceBridge': '12345',
        'maxParticipants': '-1',
        'record': 'false',
        'duration': '0',
        'logoutUrl': `https://dev-main.davintoo.com/webinars/execute/1`
    };
    let res2 = await inst.isMeetingRunning(meetingParams);
    console.log(res2.isRunning());

    if (!res2.isRunning()) {
        try {
            let res3 = await inst.getMeetingInfo(meetingParams);
            console.log(res3.getMeetingInfo());
        } catch (err) {
            let res4 = await inst.createMeeting(meetingParams);
            console.log(res4.getMeetingId());
        }

        let res5 = inst.getJoinMeetingURL({
            'meetingID': 2,
            'fullName': 'test user',
            'password': 'mp',
            'userID': 1
        });
        console.log(res5);
    }
})();

// var getenv = require('getenv');
// var TestCase = require('./TestCase');
// // var Curl = require('node-libcurl').Curl;
// var CreateMeetingParametres = require('../src/Parametres/CreateMeetingParametres');
// process.env.BBB_SECURITY_SALT = '8cd8ef52e8e101574e400365b55e11a6';
// process.env.BBB_SERVER_BASE_URL = 'http://test-install.blindsidenetworks.com/bigbluebutton/';
// var test = new BigBlueButtonTest();
// var t = new TestCase();
// test.testCreateMeetingWithDocumentUrl();

/////

// var Curl = require('node-libcurl').Curl,
//     querystring = require('querystring');
//
// var curl = new Curl(),
//     url = 'http://www.example.com',
//     data = '<response>\n' +
//         '<returncode>SUCCESS</returncode>\n' +
//         '<version>1.0</version>\n' +
//         '</response>';
//
// //You need to build the query string,
// // node has this helper function, but it's limited for real use cases (no support for array values for example)
//
//
// curl.setOpt(Curl.option.URL, url);
// curl.setOpt(Curl.option.POSTFIELDS, data);
// curl.setOpt(Curl.option.HTTPHEADER, ['Content-Type: text/xml']);
// curl.setOpt(Curl.option.VERBOSE, true);
//
// console.log('data : '+data);
//
// curl.perform();
//
// curl.on('end', function(statusCode, body) {
//     console.log(body);
//
//     this.close();
// });
//
// curl.on('error', curl.close.bind(curl));



