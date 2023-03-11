import twilio from "twilio";

export const sendSms = async (req, res, next) => {
  var mobileNumbers = req.body.mobileNumbers || [];

  try {
    var arr = [];
    await Promise.all(
      mobileNumbers.map(async (mobile) => {
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const client = twilio(accountSid, authToken);
        var prefix = "+91";
        var number = mobile;
        var result = prefix.concat(number);
        console.log(typeof result);
        try {
          const message = await client.messages.create({
            body: "This is the ship that made the Kessel Run in fourteen parsecs?",
            from: "+15676007690",
            to: result,
          });
          arr.push(message.sid);
        } catch (e) {
          console.error(e);
        }
      })
    );
    return res.status(200).send("Messages send successfully");
  } catch (e) {
    console.error(e);
    return res.status(500).send("Error detected");
  }
};
