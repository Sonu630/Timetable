import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function ForgotPassword({ Setalert }) {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const sendOtp = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch("http://localhost:4000/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send OTP");
      }

      Setalert("OTP has been sent to your registered email.");
      setTimeout(() => {
        Setalert(null);
      }, 1500);

      setStep(2);
    } catch (err) {
      Setalert(err.message || "Failed to send OTP");
      setTimeout(() => {
        Setalert(null);
      }, 1500);
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch("http://localhost:4000/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Invalid OTP");
      }

      Setalert("OTP verified successfully.");
      setTimeout(() => {
        Setalert(null);
      }, 1500);

      setStep(3);
    } catch (err) {
      Setalert(err.message || "OTP verification failed");
      setTimeout(() => {
        Setalert(null);
      }, 1500);
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch("http://localhost:4000/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          newPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Password reset failed");
      }

      Setalert("Password reset successful. Please login.");
      setTimeout(() => {
        Setalert(null);
      }, 1500);
      navigate("/Userportal/Login");
    } catch (err) {
      Setalert(err.message || "Password reset failed");
      setTimeout(() => {
        Setalert(null);
      }, 1500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 p-4">
      <div className="w-full max-w-md backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8">
        <h1 className="text-4xl font-bold text-white text-center">
          Forgot Password
        </h1>

        <p className="text-gray-300 text-center mt-3 mb-8">
          {step === 1 && "Enter your registered email"}

          {step === 2 && "Enter the OTP sent to your email"}

          {step === 3 && "Create a new password"}
        </p>

        {step === 1 && (
          <form onSubmit={sendOtp} className="space-y-6">
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-300"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-4 rounded-2xl font-semibold"
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={verifyOtp} className="space-y-6">
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="w-full px-4 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-300"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-4 rounded-2xl font-semibold"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={resetPassword} className="space-y-6">
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full px-4 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-300"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-2xl font-semibold"
            >
              {loading ? "Updating..." : "Reset Password"}
            </button>
          </form>
        )}

        <div className="text-center mt-6">
          <Link to="/Userportal/Login" className="text-cyan-300">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
