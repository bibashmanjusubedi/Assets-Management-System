import { FormEvent, useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router";
import axios from "axios";
import { LoaderIcon } from "lucide-react";
import { toast } from "sonner";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
const [loading, setLoading] = useState(false);
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
setLoading(true);
    const data = new FormData(e.currentTarget);
    const formData = {
      email: data.get("email"),
      password: data.get("password"),
    };

    try {
      const response = await axios.post(
        "https://asset-management-system-2y9g.onrender.com/api/user/login/",
        JSON.stringify(formData),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response?.data?.token) {
        localStorage.setItem("token", JSON.stringify(response.data.token));
        localStorage.setItem("user", JSON.stringify(response.data.user));
        toast("Login Successful")

        navigate("/");
      }

      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error(error);
      window.alert("Login Failed");
    } finally{
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex h-screen w-full items-center justify-center bg-gray-100">
        <div className="flex w-[80%] max-w-5xl h-[70%] bg-white shadow-2xl rounded-2xl overflow-hidden">
          {/* Left Panel */}
          <div className="w-1/2 bg-teal-500 text-white flex flex-col justify-center items-center p-10 rounded-tr-lg rounded-br-full transition-all duration-700 ease-in-out ">
            <h2 className="text-3xl font-bold mb-4">Hello, Welcome!</h2>
            <p className="mb-6">Don't have an account?</p>
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="border border-white px-6 py-2 rounded-full font-semibold hover:bg-white hover:text-blue-500 transition"
            >
              Login
            </button>
          </div>

          {/* Right Panel (Login Form) */}
          <div className="w-1/2 p-10 flex flex-col justify-center">
            <h1 className="text-2xl font-semibold mb-6 text-center">Login</h1>
            <div className="space-y-6">
              <InputComp
                label="Email"
                type="email"
                name="email"
                placeholder="Enter email"
              />
              <div className="relative">
                <InputComp
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter password"
                />
                <span
                  className="absolute right-3 top-[38px] cursor-pointer text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
              <button
                disabled={loading}
                type="submit"
                className="bg-teal-500 space-x-4 text-white py-2 rounded font-semibold w-full hover:bg-white hover:border-2 hover:border-teal-400 hover:text-blue-500 transition"
              >
              {loading&& <LoaderIcon className="animate-spin" />} Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

type InputProps = {
  label: string;
  type?: string;
  name: string;
  placeholder?: string;
};

function InputComp({
  label,
  type = "text",
  name,
  placeholder = "",
  ...rest
}: InputProps) {
  return (
    <div className="flex flex-col w-full">
      <label className="mb-1 font-medium text-sm">{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className="border border-gray-400 rounded p-2 focus:outline-none focus:ring-1 focus:ring-teal-500"
        {...rest}
      />
    </div>
  );
}
