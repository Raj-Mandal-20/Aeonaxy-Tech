import navLogo from "../../images/mail-verify.png";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";

const VerifyEmail = () => {
  return (
    <>
      <Navbar/>
      <div className="p-10"></div>
      <div className="flex flex-col gap-4 items-center p-10 text-center">
        <div className="text-3xl"> Please Verify your email... </div>
        <div> <img src={navLogo}/></div>
        <div className="text-gray-400">  Please Verify your email address. We've sent a conformation email to:</div>
        <div className="text-xl"> account@reinfo.design</div>
        <div className="text-gray-400"> Click the conformation link in that email to begin using Dribble.</div>
        <div className="text-gray-400"> Didn't receive the email? Check Your Spam folder, it may have been caught by a filter. If you still don't see it, you can <a href="#" className="text-[#F7418F]  font-bold"> resend the confirmation email.</a></div>
        <div className="text-gray-400"> Wrong email address? <a href="#" className="text-[#F7418F]  font-bold"> Change it.</a></div>
      </div>
      <div className="p-10"></div>

      <Footer/>
    </>
  );
};

export default VerifyEmail;
