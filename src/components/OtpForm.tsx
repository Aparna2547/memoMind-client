import { useState } from 'react'
import { toast } from 'sonner';
import { IoMdClose } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { verifyOtp } from '../apis/user';
import {useDispatch} from "react-redux"
import { setToken } from '../store/Slice';

type props = {
    setOtpForm : (data:boolean)=>void
}

const OtpForm = ({setOtpForm}:props) => {

    const [otpValues, setOTPValues] = useState<string[]>(['', '', '', '']);
    const navigate = useNavigate()
    const  dispatch = useDispatch()


    const handleInputChange = (index: number, event: any) => {
        const { value } = event.target;
        if (value.length <= 1 && /^\d*$/.test(value)) {
            const newOTPValues = [...otpValues];
            newOTPValues[index] = value;
            setOTPValues(newOTPValues);
            if (value !== '' && index < 5) {
                const nextInput = document.getElementById(`otp-${index + 1}`) as HTMLInputElement | null;
                if (nextInput) nextInput.focus();
            }
        }
    };

    const handleBackspace = (index: number, event: any) => {
        if (event.key === 'Backspace' && index > 0 && otpValues[index] === '') {
            const newOTPValues = [...otpValues];
            newOTPValues[index - 1] = '';
            setOTPValues(newOTPValues);
            const prevInput = document.getElementById(`otp-${index - 1}`) as HTMLInputElement | null;
            if (prevInput) prevInput.focus();
        }
    };


    const handleOtpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        let otp = otpValues.join('')
        if (otp.length !== 4) {
            toast.error('Enter a valid otp')
        }
        const res = await verifyOtp(otp)
        if(res?.data.status){
            dispatch(setToken(res.data.token));
            toast.success(res.data.message)
            setOtpForm(false)
            navigate('/')
        }

    }

    return (
        <div className='flex w-full justify-center items-center fixed top-0 right-0 left-0 bottom-0 z-50 bg-gray-600 bg-opacity-50 px-6'>

            <div className="relative bg-white px-6 pt-4 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
                <div className='flex justify-end mb-2 text-3xl cursor-pointer' onClick={()=>setOtpForm(false)} ><IoMdClose/></div>
                <div className="mx-auto flex w-full max-w-md flex-col space-y-16">

                    <div className="flex flex-col items-center justify-center text-center space-y-2">
                        <div className="font-semibold text-3xl">
                            <p>Email Verification</p>
                        </div>
                        
                    </div>
                    <div>
                        <form onSubmit={handleOtpSubmit}>
                            <div className="flex flex-col space-y-16">

                                <div className="flex flex-row justify-center text-center px-2">
                                    {otpValues.map((value, index) => (
                                        <input
                                            key={index}
                                            id={`otp-${index}`}
                                            className="m-2 border-b-2 border-gray-600 text-3xl h-16 w-16 px-5 text-center form-control outline-none"
                                            type="text"
                                            maxLength={1}
                                            value={value}
                                            onChange={(event) => handleInputChange(index, event)}
                                            onKeyDown={(event) => handleBackspace(index, event)}
                                        />
                                    ))}
                                </div>
                                <div className="flex flex-col space-y-5">
                                    <div>
                                        <button type='submit' className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-[#B51B75] border-none text-white text-sm shadow-sm">
                                            Verify Account
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default OtpForm