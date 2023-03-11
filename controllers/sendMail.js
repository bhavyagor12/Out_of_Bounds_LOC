import nodemailer from "nodemailer";

const sendMail = async (req, res) => {
    let msg = req.body.msg;
    let receiver = req.body.receiver;
    let subject = req.body.subject;
    console.log(msg);
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'shahayush934@gmail.com',
            pass: 'hwstlrppcguqzbrq'
        }
    });
    let info = await transporter.sendMail({
        from: '"Ayush Shah" <shahayush934@gmail.com>', // sender address
        to: "shahayush934@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: msg, // plain text body
        html: "<b>"+msg+"</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);
    res.json(info);
}

export default sendMail;