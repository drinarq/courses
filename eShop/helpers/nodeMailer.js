const nodeMailer=require('nodemailer');
const env=require('../configuration/environment.js');

function Mailer(userEmail) {

const transporter=nodeMailer.createTransport({
    series:'gmail',
    auth:{
        user:env.email.login,
        pass:env.email.pass
    }
});

const mailOptions={
    from:env.email.login,
    to:userEmail,
    subject:'account on eShop.com',
    text:'Your account on eShop.com deleted.'
};

transporter.sendMail(mailOptions,(err,info)=>{
    if(err){
        console.log(err);
    }
    else {
        console.log('email sent: '+info.response);
    }
});
};

module.exports=Mailer;