import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpUser } from "../../utils/api";
import { signUpSchema } from "../../utils/validationSchemas";
import { useState } from "react";
import Link from "next/link";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpSchema),
    mode: "onChange",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [showLoginButton, setShowLoginButton] = useState(false);

  const onSubmit = async (data) => {
    try {
      //  console.log(data);
      await signUpUser(data);
      // console.log(data);
      setSuccessMessage("Account created successfully!");
      setShowLoginButton(true);
      setTimeout(() => {
        setSuccessMessage("");
        setShowLoginButton(false);
      }, 5000);
    } catch (error) {
      if (error.message.includes("Email already in use")) {
        setError("email", { message: "Email already in use" });
      } else {
        setError("api", {
          message: error.message || "Sign up failed. Please try again.",
        });
      }
    }
  };

  return (
    <main className="bg-white min-h-screen min-w-screen flex justify-center items-center p-4">
      <div className="border border-neutral-100 rounded-md p-8 w-full lg:w-1/2 max-w-screen-sm">
        <h1 className="text-xl font-bold">Create your account</h1>
        <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="profilePic" className="block">
              Profile Image URL
            </label>
            <input
              type="text"
              id="profilePic"
              {...register("profilePic")}
              className="mt-2 block w-full p-2 border border-neutral-300 rounded-md focus:outline-none focus:border-2 focus:bg-white focus:border-purple"
            />
            {errors.profilePic && (
              <span className="text-red-500">{errors.profilePic.message}</span>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="name" className="block">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              {...register("name")}
              className="mt-2 block w-full p-2 border border-neutral-300 rounded-md focus:outline-none focus:border-2 focus:bg-white focus:border-purple"
            />
            {errors.name && (
              <span className="text-red-500">{errors.name.message}</span>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="username" className="block">
              Username <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="username"
              {...register("username")}
              className="mt-2 block w-full p-2 border border-neutral-300 rounded-md focus:outline-none focus:border-2 focus:bg-white focus:border-purple"
            />
            {errors.username && (
              <span className="text-red-500">{errors.username.message}</span>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              {...register("email")}
              className="mt-2 block w-full p-2 border border-neutral-300 rounded-md focus:outline-none focus:border-2 focus:bg-white focus:border-purple"
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              id="password"
              {...register("password")}
              className="mt-2 block w-full p-2 border border-neutral-300 rounded-md focus:outline-none focus:border-2 focus:bg-white focus:border-purple"
            />
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block">
              Password Confirmation <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              id="confirmPassword"
              {...register("confirmPassword")}
              className="mt-2 block w-full p-2 border border-neutral-300 rounded-md focus:outline-none focus:border-2 focus:bg-white focus:border-purple"
            />
            {errors.confirmPassword && (
              <span className="text-red-500">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          {errors.api && <p className="text-red-500">{errors.api.message}</p>}
          {successMessage && (
            <div className="text-green-500 mt-2">{successMessage}</div>
          )}

          <button
            type="submit"
            className="w-24 bg-purple text-white p-2 rounded-md hover:bg-darkpurple"
          >
            Sign up
          </button>
          {showLoginButton && (
            <Link href="/enter">
              <button className="ms-4 w-24 bg-purple text-white p-2 rounded-md hover:bg-darkpurple">
                Log in
              </button>
            </Link>
          )}
        </form>
      </div>
    </main>
  );
}
