import { useState } from "react";
import { MdOutlineEmail } from "react-icons/md";
import { FaKey } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import Emoji from "../assets/emoji.gif";
import { IoMdEyeOff } from "react-icons/io";
import { FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { signUp } from "../apis/user";
import OtpForm from "../components/OtpForm";

const Signup = () => {
  const [passwordView, setPasswordView] = useState(false);
  const [confirmPasswordView, setConfirmPasswordView] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [otpForm, setOtpForm] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    const isValidPass = (password: string) => passwordRegex.test(password);
    const isValidEmail = (email: string) => emailRegex.test(email);
    if (name.trim().length == 0) {
      toast.error("Enter valid name");
      return;
    } else if (!isValidEmail(email)) {
      toast.error("Enter valid email");
      return;
    } else if (!isValidPass(password)) {
      toast.error(
        "Password must include one uppercase and atleast one number and mininum 8 character"
      );
      return 
    } else if (password !== cPassword) {
      toast.error("Passwords are not matching");
      return
    }
    const res = await signUp(name, email, password);
    if (res && res.data.status) {
      setOtpForm(true);
    }
  };
  return (
    <div className="flex justify-center items-center bg-violet-400 h-full min-h-[100vh]">
      <div className="">
        <section className="relative block h-500-px bg-violet-400"></section>
        <section>
          <div className="container mx-auto px-4 bg-violet-400">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-10 shadow-xl rounded-lg -mt-64 min-h-64">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    <div className="relative">
                      <img
                        alt="..."
                        src={Emoji}
                        className="shadow-l  rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center"></div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-1">
                    <div className="flex justify-center py-10 lg:pt-4 pt-8"></div>
                  </div>
                </div>
                <div className=" mt-12 flex flex-col w-full ">
                  <div className="text-center mb-3">
                    <h1 className="font-extrabold text-[#B51B75] text-3xl">
                      SignUp
                    </h1>
                  </div>
                  <div className="w-full flex justify-center font-bold mb-4">
                    <form onSubmit={handleSubmit}>
                      <div className="w-full flex border border-gray-700">
                        <div className="bg-gray-200 p-2">
                          <FaUserAlt className="text-3xl" />
                        </div>

                        <input
                          type="text"
                          className="w-full border-none"
                          placeholder="Enter your name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>

                      <div className="w-full mt-2 flex border border-gray-700">
                        <div className="bg-gray-200 p-2">
                          <MdOutlineEmail className="text-3xl" />
                        </div>

                        <input
                          type="text"
                          className="w-full border-none"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>

                      <div className="w-full mt-2 flex border border-gray-700">
                        <div className="bg-gray-200 p-2">
                          <FaKey className="text-2xl" />
                        </div>

                        <input
                          type={passwordView ? "text" : "password"}
                          className="w-full border-none"
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />

                        <div
                          className="bg-gray-200 p-2 text-2xl cursor-pointer"
                          onClick={() => setPasswordView(!passwordView)}
                        >
                          {passwordView ? <FaEye /> : <IoMdEyeOff />}
                        </div>
                      </div>

                      <div className="w-full mt-2 flex border border-gray-700">
                        <div className="bg-gray-200 p-2">
                          <FaKey className="text-2xl" />
                        </div>

                        <input
                          type={confirmPasswordView ? "text" : "password"}
                          className="w-full border-none"
                          placeholder="Re-enter the password"
                          value={cPassword}
                          onChange={(e) => setCPassword(e.target.value)}
                        />

                        <div
                          className="bg-gray-200 p-2 text-2xl cursor-pointer"
                          onClick={() =>
                            setConfirmPasswordView(!confirmPasswordView)
                          }
                        >
                          {confirmPasswordView ? <FaEye /> : <IoMdEyeOff />}
                        </div>
                      </div>
                      <div className="flex justify-end mt-2">
                        <Link to="/">
                          <p className="text-sm font-medium text-blue-950">
                            Already have account
                          </p>
                        </Link>
                      </div>
                      <button
                        type="submit"
                        className="mt-5 p-2 text-center w-full text-white"
                        style={{ backgroundColor: "#B51B75" }}
                      >
                        SIGNUP
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      {otpForm && <OtpForm setOtpForm={setOtpForm} />}
    </div>
  );
};

export default Signup;
