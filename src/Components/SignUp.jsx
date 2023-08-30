import { NavLink } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import { useState } from "react";
import app from "../Firebase/Firebase";
import swal from "sweetalert";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  getAuth,
} from "firebase/auth";
const auth = getAuth(app);
const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [sentOtp, setSentOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    password: "",
  });

  const generateRecapctha = () => {
    window.recaptaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {},
      },
      auth
    );
  };

  const requestOtp = () => {
    setLoading(true);
    generateRecapctha();

    let appVerfier = window.recaptaVerifier;
    signInWithPhoneNumber(auth, `+91${form.mobile}`, appVerfier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        swal({
          text: "OTP sent",
          icon: "sucess",
          buttons: false,
          timer: 1000,
        });
        setSentOtp(true);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      {sentOtp ? (
        <div className="flex justify-center  items-center flex-col mt-28 login">
          <h1 className="text-lg mb-5 font-semibold text-white  cursor-pointer">
            Enter OTP
          </h1>
          <input
            onChange={(e) => setOtp(e.target.value)}
            value={otp}
            placeholder="Enter Mobile No"
            className=" bg-gray-100  rounded-md px-5 py-2 focus:border border-violet-600 focus:outline-none text-black placeholder:text-gray-600 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px]"
          />
          <button className=" capitalize px-10 py-2 rounded-md text-white  mt-4 bg-emerald-700 hover:bg-emerald-300  font-medium  ">
            {loading ? (
              <TailSpin height={26} color="#030324" width={57} />
            ) : (
              "Confirm OTP"
            )}
          </button>
        </div>
      ) : (
        <div>
          <div className="flex justify-center login">
            <div className="h-[90%] w-full md:w-3/4 m-4">
              <div className="text-xl cursor-pointer flex flex-col justify-center items-center mt-5 md:mt-0">
                <h1 className="font-semibold text-3xl text-gray-700 m-2  capitalize">
                  Sign Up
                </h1>
                <div className="flex">
                  <ion-icon
                    name="logo-google"
                    className="py-2 rounded px-4 border-2 m-1 cursor-pointer border-violet-600 text-white bg-violet-600 hover:bg-white hover:text-violet-600 text-2xl"
                  ></ion-icon>
                  <ion-icon
                    name="logo-facebook"
                    className="py-2 rounded px-4 border-2 m-1 cursor-pointer border-blue-500 bg-blue-500 text-white hover:bg-white hover:text-blue-500 text-2xl"
                  ></ion-icon>
                </div>
                <div className="text-gray-700 font-semibold"> or </div>
              </div>
              <div className="flex flex-col justify-center items-center mt-10 md:mt-4 space-y-6 md:space-y-8">
                <div className="">
                  <input
                    type="text"
                    placeholder="Enter Your Name"
                    className=" bg-gray-100 rounded-lg px-5 py-2 focus:border border-violet-600 focus:outline-none text-black placeholder:text-gray-600 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px]"
                    value={form.name}
                    onChange={(e) => {
                      setForm({ ...form, name: e.target.value });
                    }}
                  />
                </div>
                <div className="">
                  <input
                    type="number"
                    placeholder="Mobile No"
                    className=" bg-gray-100 rounded-lg px-5 py-2 focus:border border-violet-600 focus:outline-none text-black placeholder:text-gray-600 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px]"
                    value={form.mobile}
                    onChange={(e) => {
                      setForm({ ...form, mobile: e.target.value });
                    }}
                  />
                </div>
                <div className="">
                  <input
                    type="password"
                    placeholder="Password"
                    className=" bg-gray-100 rounded-lg px-5 py-2 focus:border border-violet-600 focus:outline-none text-black placeholder:text-gray-600 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px]"
                    value={form.password}
                    onChange={(e) => {
                      setForm({ ...form, password: e.target.value });
                    }}
                  />
                </div>
                <div className="flex space-x-2 -ml-28 md:-ml-40  lg:-ml-52">
                  <input
                    className=""
                    type="checkbox"
                    id="checkbox"
                    name="checkbox"
                  />
                  <h3 className="text-sm font-semibold text-gray-400 -mt-1 cursor-pointer">
                    Remember Me
                  </h3>
                </div>
              </div>
              <div className="text-center mt-7">
                <button
                  onClick={requestOtp}
                  className=" capitalize h-11  w-36 py-2 rounded-md text-white bg-violet-500 hover:bg-violet-600  font-medium "
                >
                  {loading ? (
                    <TailSpin height={26} color="#fff" width={125} />
                  ) : (
                    <div className="text-lg"> Request OTP</div>
                  )}
                </button>
              </div>
              <div className="text-center my-6 flex flex-col">
                <NavLink path to="/login">
                  <a
                    href="#"
                    className="text-sm font-bold text-gray-400 hover:text-violet-500 m-1"
                  >
                    Already a User? Login
                  </a>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className=" mt-7" id="recaptcha-container"></div>
    </div>
  );
};

export default SignUp;
