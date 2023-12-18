const nodemailer=require("nodemailer");
const dotenv=require("dotenv");
dotenv.config();
const Trasport= nodemailer.createTransport({
 service:'gmail',
 auth:{
   user:process.env.nodemailer_user,
   pass:process.env.nodemailer_pass
 },


});
function sendMail(toEmail,subject,content){
    const mailoptions={
        from:'Chatz <chatz.text.app@gmail.com>',
        to: toEmail,
        subject: subject,
        html:content,
    };
    Trasport.sendMail(mailoptions,(error,info)=>{
        if(error){
            console.log("error in sending mail",error);
        }
        else{
            console.log("Email:sent ",info.response);
        }
    });
}
module.exports={sendMail}

