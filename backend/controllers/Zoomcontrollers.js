const asyncHandler = require('express-async-handler');

require('dotenv').config();
const KJUR = require('jsrsasign');

const {
    createZoomMeeting,
    listZoomMeetings,
    thirdPartyAPICall
} = require('../api/api.js');

const ThirdPartyAPICall = asyncHandler(async (req, res) => {
    const thirdPartyAPI = thirdPartyAPICall();

    if (thirdPartyAPICall === undefined) {
        res.status(400);
        throw new Error('No API Call found');
    } else {
        res.status(201).json({ thirdPartyAPI });
    }
});


const getMsdkSignature = asyncHandler(async (req, res) => {
    const iat = Math.round(new Date().getTime() / 1000) - 30;
    const exp = iat + 60 * 60 * 2;

    const oHeader = { alg: 'HS256', typ: 'JWT' };

    const oPayload = {
        sdkKey: process.env.CLIENT_ID,
        mn: req.body.meetingNumber,
        role: req.body.role,
        iat: iat,
        exp: exp,
        tokenExp: iat + 60 * 60 * 2
    };

    const sHeader = JSON.stringify(oHeader);
    const sPayload = JSON.stringify(oPayload);
    const signature = KJUR.jws.JWS.sign(
        'HS256',
        sHeader,
        sPayload,
        process.env.CLIENT_SECRET
    );

    res.json({
        signature: signature
    });
});

const CreateAppointment = asyncHandler(async (req, res) => {
    const { type } = req.body;

    if (!type) {
        res.status(400);
        throw new Error('Please Fill all the fields');
    } else {
        const { id, password } = await createZoomMeeting(type);

        res.status(201).json({ id, password });
    }
});

const ListMeeting = asyncHandler(async (req, res) => {
    const meetings = await listZoomMeetings();
    if (meetings === undefined) {
        res.status(400);
        throw new Error('No meeting found');
    } else {
        res.status(201).json({ meetings });
    }
});

// ...

module.exports = {
    getMsdkSignature,
    CreateAppointment,
    ListMeeting,
    ThirdPartyAPICall
};
