import Head from "next/head";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import SocialButton from "../components/sociallogin";
import { loginUser } from "../utils/api";
import { loginSchema } from "../utils/validationSchemas"; 
import { socialLogins } from "../utils/maps";
import { useAuth } from "@/context/AuthContext";
import { useUser } from "@/context/UserContext";

export default function Enter() {
  const router = useRouter();
  const { state } = router.query; 
  const { setIsLoggedIn } = useAuth(); 
  const { fetchUserInfo } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(loginSchema), 
  });

  const [newUser, setNewUser] = useState(false);

  useEffect(() => {
    if (state === "new-user") {
      setNewUser(true);
    } else {
      setNewUser(false);
    }
  }, [state]);

  const onSubmitLogin = async (data) => {
    try {
      const result = await loginUser(data);
      if (result.data.token) {
        localStorage.setItem("token", result.data.token);
        setIsLoggedIn(true); 
        await fetchUserInfo();
        router.push("/"); 
      }
    } catch (error) {
      if (error.message.includes("Invalid email or password")) {
        setError("password", { message: "Invalid email or password" });
      }
    }
  };

  return (
    <> <Head>
    <title>Welcome! - DEV Community</title>
  </Head>
    <main className="bg-white min-h-screen min-w-screen flex justify-center ">
      <div className="pt-6 px-2 lg:w-1/2 max-w-screen-sm">
        <div className="flex flex-col items-center">
          <Link href="/">
            <Image
              src="https://dev-to-uploads.s3.amazonaws.com/uploads/logos/original_logo_0DliJcfsTcciZen38gX9.png"
              alt="Vercel Logo"
              width={60}
              height={48}
            />
          </Link>
          <h1 className="text-3xl font-bold mt-6">Join the DEV Community</h1>
          <p className="text-neutral-700 mt-1 text-center">
            DEV Community is a community of 2,083,186 amazing developers
          </p>
        </div>
        <div className="flex flex-col gap-3 mt-5">
          {socialLogins.map(({ social, logo }) => (
            <SocialButton
              key={social}
              social={social}
              logo={logo}
              newUser={newUser}
            />
          ))}
        </div>

        {newUser ? (
          <Link href="/users/sign_up">
            <button className="mt-3 grid grid-cols-[auto_1fr] border border-neutral-300 rounded-md p-3 text-sm hover:bg-neutral-100 w-full">
              <Image
                src="/socials/email-logo.svg"
                width={24}
                height={24}
                className="mr-2"
                alt="email"
              />
              <p>Sign up with email</p>
            </button>
          </Link>
        ) : (
          <>
            <div className="grid grid-cols-1 items-center mt-6">
              <div className="flex items-center">
                <hr className="flex-1 border-t border-neutral-200" />
                <div className="bg-white px-2 text-sm">OR</div>
                <hr className="flex-1 border-t border-neutral-200" />
              </div>
            </div>
            <form onSubmit={handleSubmit(onSubmitLogin)} className="mt-4">
              <div className="mb-4">
                <label htmlFor="email" className="block ">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email")}
                  className={`mt-2 block w-full p-2 border border-neutral-300 rounded-md focus:outline-none focus:border-2 focus:bg-white focus:border-purple ${
                    errors.email ? "ring-red-500" : ""
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="block ">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  {...register("password")}
                  className={`mt-2 block w-full p-2 border border-neutral-300 rounded-md focus:outline-none focus:border-2 focus:bg-white focus:border-purple ${
                    errors.password ? "ring-red-500" : ""
                  }`}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="flex items-center justify-between mb-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="mr-2 w-4 h-4 rounded-md"
                  />
                  Remember me
                </label>
                <Link href="#" className="text-purple ">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full bg-purple text-white py-3 rounded-md hover:bg-darkpurple transition duration-200"
              >
                Log in
              </button>
            </form>
          </>
        )}

        <div className="flex flex-col items-center">
          <p className="text-sm italic text-neutral-500 mt-7 w-96 text-center">
            By signing in, you are agreeing to our{" "}
            <span className="text-purple ">privacy policy</span>,{" "}
            <span className="text-purple ">terms of use</span>, and{" "}
            <span className="text-purple ">code of conduct</span>.
          </p>
        </div>
        <hr className="border-neutral-200 my-5" />

        <p className="text-center mb-20">
          {newUser ? (
            <>
              <span>Already have an account?</span>{" "}
              <Link
                href="/enter"
                className="text-purple"
                onClick={() => setNewUser(false)}
              >
                Log in.
              </Link>
            </>
          ) : (
            <>
              <span>New to DEV Community?</span>{" "}
              <Link
                href="/enter?state=new-user"
                className="text-purple"
                onClick={() => setNewUser(true)}
              >
                Create account.
              </Link>
            </>
          )}
        </p>
      </div>
    </main></>
  );
}
