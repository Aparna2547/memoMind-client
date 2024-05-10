import { useState } from "react";
import { MdOutlineEmail } from "react-icons/md";
import { FaKey } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import Emoji from "../assets/emoji.gif"
import { IoMdEyeOff } from "react-icons/io";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { signIn } from "../apis/user";
import { useNavigate } from "react-router-dom";
import {  useDispatch } from "react-redux";
import { setToken } from "../store/Slice";


const Login = () => {
  const [passwordView, setPasswordView] = useState(false);
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const navigate = useNavigate()
   const dispatch = useDispatch()


 const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
  e.preventDefault()
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  const isValidPass = (password:string) => passwordRegex.test(password)
  const isValidEmail = (email:string) => emailRegex.test(email);
  if(!isValidEmail(email)){
    toast.error("Enter valid email")
    return
  }else if(!isValidPass(password)){
    toast.error("Password must include one uppercase and atleast one number and mininum 8 character")
  }


  const res = await signIn(email,password)
  if(res?.data){
    dispatch(setToken(res.data.token))
    toast.success(res.data.message)
    navigate('/')
  }
 }
  
  return (
    <>
      <div className="flex justify-center items-center bg-violet-400 h-full">
        <div className="">
          <section className="relative block  h-500-px bg-violet-400">
         
          </section>
          <section >
                <div className="container mx-auto px-4 bg-violet-400">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64 min-h-96">
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
                                <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">

                                </div>
                                <div className="w-full lg:w-4/12 px-4 lg:order-1">
                                    <div className="flex justify-center py-10 lg:pt-4 pt-8">
                                    </div>
                                </div>
                            </div>

                            <div className=" mt-12 flex flex-col w-full ">
                              <div className="text-center mb-3">
                                <h1 className="font-extrabold text-[#B51B75] text-3xl">SignIn</h1>
                              </div>
                                <div className="w-full flex justify-center font-bold">
                                
                                        <form action="" onSubmit={handleSubmit}>
                                          <div className="w-full flex border border-gray-700">
                                            <div className="bg-gray-200 p-2"><MdOutlineEmail className="text-3xl"/></div>
                                          
                                          <input type="text" className="w-full border-none" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                                          </div>
                                          <div className="w-full mt-4 flex border border-gray-700">
                                            <div className="bg-gray-200 p-2"><FaKey className="text-2xl"/></div>
                                          
                                          <input type={passwordView ? 'text' : 'password'} className="w-full border-none" value={password} onChange={(e)=>setPassword(e.target.value)} />
                                         
                                          <div className="bg-gray-200 p-2 text-2xl cursor-pointer" onClick={()=>setPasswordView(!passwordView)}>{passwordView ? <FaEye /> : <IoMdEyeOff/>}</div>
                                          </div>

                                          <button type="submit" className="mt-5 p-2 text-center w-full  text-white" style={{backgroundColor:"#B51B75"}}>
                                            SIGNIN
                                          </button>
                                          <div className="flex justify-end mt-2">
                                            <Link to='/signup'>
                                            <h1 className="font-light">Create account</h1>
                                            </Link>
                                          </div>
                                        </form>
                                    
                                </div>


                            </div>

                        </div>
                    </div>
                </div>

            </section>
        </div>
      </div>
    </>
  );
};

export default Login;
