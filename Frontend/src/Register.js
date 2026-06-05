import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { Link, useNavigate } from "react-router-dom";

export default function Register({ Setalert }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    role: "student",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      Setalert("Passwords do not match");
      setTimeout(() => {
  Setalert(null);
}, 1500);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:4000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }

      Setalert("Registration successful");
      setTimeout(() => {
  Setalert(null);
}, 1500);

      navigate("/Userportal/Login");
    } catch (err) {
      Setalert(err.message);
      setTimeout(() => {
  Setalert(null);
}, 1500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-lg backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white">Create Account</h1>

          <p className="text-gray-300 mt-3">Join the platform today</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-300"
          />

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full px-4 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-300"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-300"
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full px-4 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-300"
          />


          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-500 hover:bg-cyan-600 transition-all duration-300 text-white py-4 rounded-2xl font-semibold text-lg"
          >
            {loading ? "Creating..." : "Register"}
          </button>

          <p className="text-center text-gray-300">
            Already have an account?{" "}
            <Link
              to="/Userportal/Login"
              className="text-cyan-300 font-semibold"
            >
              Login
            </Link>
          </p>
          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-500" />
            <span className="px-3 text-gray-300">OR</span>
            <hr className="flex-grow border-gray-500" />
          </div>
          <div className="flex justify-center mt-4">
            <GoogleLogin
              onSuccess={async (credentialResponse) => {
                try {
                  const response = await fetch(
                    "http://localhost:4000/google-login",
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        credential: credentialResponse.credential,
                      }),
                    },
                  );

                  const data = await response.json();

                  localStorage.setItem("token", data.token);

                  localStorage.setItem("role", data.role);

                  localStorage.setItem("username", data.username);

                  Setalert("Google Sign Up Successful");
                  setTimeout(() => {
  Setalert(null);
}, 1500);

                  const roleRoutes = {
                    student: "/Student",
                    professor: "/Professor",
                    admin: "/Admin",
                  };

                  navigate(roleRoutes[data.role]);
                } catch (err) {
                  Setalert("Google Registration Failed");
                  setTimeout(() => {
  Setalert(null);
}, 1500);
                }
              }}
              onError={() => {
                Setalert("Google Registration Failed");
                setTimeout(() => {
  Setalert(null);
}, 1500);
              }}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
