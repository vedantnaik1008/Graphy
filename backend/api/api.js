require("dotenv").config();
const axios = require("axios");
const btoa = require("btoa");
console.log(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET, process.env.ACCOUNT_ID);


const thirdPartyAPICall = () => {
    try {
        // Make API Call Here
        return 'Third Party API Call';
    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
};

module.exports = {
    thirdPartyAPICall
};

const getAccessToken = async () => {
    try {
        const clientId = process.env.ZOOM_CLIENT_ID;
        const clientSecret = process.env.ZOOM_CLIENT_SECRET;
        const accountID = process.env.ZOOM_ACCOUNT_ID;

        if (!clientId || !clientSecret || !accountID) {
            throw new Error('Missing required environment variables');
        }

        const base64EncodedCredentials = btoa(`${clientId}:${clientSecret}`);

        const resp = await axios({
            method: 'POST',
            url: `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${accountID}`,
            headers: {
                Authorization: `Basic ${base64EncodedCredentials}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        const { access_token } = resp.data;

        return access_token;
    } catch (err) {
        console.error('Error obtaining access token:', err);
        throw err;
    }
};


const listZoomMeetings = async () => {
  try {
    const resp = await axios({
      method: "get",
      url: "https://api.zoom.us/v2/users/me/meetings",
      headers: {
        Authorization: "Bearer " + `${await getAccessToken()} `,
        "Content-Type": "application/json",
      },
    });
    const meetings = resp.data.meetings;

    const newArray = meetings.map((obj) =>
      ["id", "topic"].reduce((newObj, key) => {
        newObj[key] = obj[key];
        return newObj;
      }, {})
    );

    return newArray;
  } catch (err) {
    if (err.status == undefined) {
      console.log("Error : ", err);
    }
  }
};

const createZoomMeeting = async (type) => {
  try {


    const data = JSON.stringify({
      type: type,
    });

    const resp = await axios({
      method: "post",
      url: "https://api.zoom.us/v2/users/me/meetings",
      headers: {
        Authorization: "Bearer " + `${await getAccessToken()} `,
        "Content-Type": "application/json",
      },
      data: data,
    });

    const { id, password } = resp.data;

    return { id, password };
  } catch (err) {
    if (err.status == undefined) {
      console.log("Error : ", err);
    }
  }
};
function generateOTP() {
  var digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}

// ...

module.exports = {
  createZoomMeeting, 
  listZoomMeetings,
  thirdPartyAPICall,
};