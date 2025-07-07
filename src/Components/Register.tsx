import { api } from "@/lib/api";
// import axios from "axios";
import { FormEvent, useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router";

export default function NewUsers() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const formData = {
      username: data.get("username"),
      email: data.get("email"),
      password: data.get("password"),
      password2: data.get("password2"),
      first_name: data.get("first_name"),
      last_name: data.get("last_name"),
      phone_number: data.get("phone_number"),
      address: data.get("address"),
    };
    console.log("form data", formData);
    try {
      const response = await api.post(
        "/user/register/",
        JSON.stringify(formData),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      window.alert("Registration Successfull");
      // navigate("/login");
    } catch (error) {
      console.log(error);
      window.alert("Registration Failed");
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-background text-foreground">
      <div className="w-6/5 max-w-6xl flex shadow-2xl rounded-xl bg-card/50  text-card-foreground overflow-hidden items-center justify-center ">
        <div className="flex items-start">
          <button
            onClick={() => navigate("/")}
            className="mr-4 p-2 rounded-full bg-white shadow"
          >
            <IoArrowBack className="text-2xl text-black-500 font-light " />
          </button>
        </div>
        {/* Right Form Section */}
        <div className="w-2/3 bg-card text-card-foreground p-10 flex flex-col justify-center ">
          <h1 className="text-3xl font-bold text-center mb-6 underline">
            Create NewUsers
          </h1>
          <form onSubmit={handleSubmit} className="space-y-3">
            <InputComp
              label="UserName"
              type="text"
              name="username"
              placeholder="Enter username"
            />
            <InputComp
              label="Email"
              type="email"
              name="email"
              placeholder="Enter email"
            />
            <InputComp
              label="First Name"
              type="text"
              name="first_name"
              placeholder="Enter first name"
            />
            <InputComp
              label="Last Name"
              type="text"
              name="last_name"
              placeholder="Enter last name"
            />
            <InputComp
              label="Address"
              type="text"
              name="address"
              placeholder="Enter address"
            />
            <InputComp
              label="Phone Number"
              type="number"
              name="phone_number"
              placeholder="Enter phone number"
            />

            <div className="relative">
              <InputComp
                label="Password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter password"
              />
              <span
                className="absolute right-4 top-2/3 -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>

            <div className="relative">
              <InputComp
                label="Retype Password"
                type={showPassword2 ? "text" : "password"}
                name="password2"
                placeholder="Retype password"
              />
              <span
                className="absolute right-4 top-2/3 -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword2(!showPassword2)}
              >
                {showPassword2 ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>

            <button
              type="submit"
              className=" font-semibold  bg-teal-500 text-white py-2 rounded  w-full hover:bg-white hover:border-2 hover:border-teal-500 hover:text-blue-500 transition"
            >
              Register
            </button>

            <p className="text-center text-sm mt-4">
              Already have an account?{" "}
              <button
                type="button"
                className="text-teal-500 hover:underline"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            </p>
          </form>
        </div>

        {/* Left Purple Gradient Panel */}
        {/* <div className="w-1/2 bg-teal-500 text-white flex flex-col justify-center items-center p-10 rounded-l-[80%] rounded-tl-full  transition-all duration-700 ease-in-out">
          <h2 className="text-4xl font-bold mb-6">Welcome!</h2>
          <p className="text-lg text-center leading-6">
            Join us and enjoy seamless experience. Let's get you registered!
          </p>
          <p className="mb-6 mt-20">Already have an account?</p>
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="border border-white px-6 py-2 rounded-full font-semibold hover:bg-white hover:text-blue-500 transition"
          >
            Login
          </button>
        </div> */}
      </div>
    </div>
  );
}

function InputComp({
  label = "text",
  type = "text",
  placeholder = "text",
  ...rest
}) {
  return (
    <div className="flex flex-col">
      <label className="font-medium mb-1">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="border border-gray-400 rounded-md p-2 text-foreground focus:outline-none focus:ring-1 focus:ring-teal-500"
        {...rest}
      />
    </div>
  );
}
