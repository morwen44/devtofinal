import NavLink from "./navLink";
import { mainNavLinks, otherLinks, socialNavLinks } from "@/utils/maps";
import SocialButton from "../sociallogin";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function NavLeft() {
    const { isLoggedIn } = useAuth();

  return (
    <>
      <div className="flex flex-col w-60 gap-4 pt-4">
         {!isLoggedIn && ( 
          <div className="bg-white rounded-md p-4 flex flex-col border border-neutral-200 ">
            <h5 className="mb-4 font-bold text-xl">
              DEV Community is a community of 2,083,186 amazing developers
            </h5>
            <p className="mb-4 text-neutral-600">
              We're a place where coders share, stay up-to-date and grow their careers.
            </p>
            <Link href="/enter?state=new-user">
              <button className="mb-1 w-[90%] mx-auto rounded-md border border-purple p-2 text-purple hover:bg-purple hover:text-white hover:underline">
                Create account
              </button>
            </Link>
            <Link href="/enter">
              <button className="w-[90%] mx-auto rounded-md hover:bg-ghostpurple hover:text-darkpurple hover:underline p-2">
                Log in
              </button>
            </Link>
          </div>
        )}
        <ul>
          {mainNavLinks.map((link, index) => (
            <NavLink key={index} section={link.section} icon={link.icon} />
          ))}
        </ul>
        <p className="ms-4 font-bold">Other</p>
        <ul>
          {otherLinks.map((link, index) => (
            <NavLink key={index} section={link.section} icon={link.icon} />
          ))}
        </ul>

        <ul className="flex justify-around ">
          {socialNavLinks.map((link, index) => (
            <SocialButton
              key={index}
              social={link.social}
              logo={link.logo}
              isLeftNav={true}
            />
          ))}
        </ul>
        <div className="bg-white rounded-md p-4 flex flex-col gap-3 border border-neutral-200 ">
          <div className="flex justify-between items-center">
            <span className="text-sm text-neutral-600">
              💎 DEV Diamond Sponsors
            </span>
            <Image
              src="/icons/dots-icon.svg"
              alt="more"
              width={24}
              height={24}
            />
          </div>
          <h5 className="font-bold text-md text-neutral-700">
            Thank you to our Diamond Sponsor Neon
          </h5>
          <Image
            src="https://res.cloudinary.com/practicaldev/image/fetch/s--GPRPp7Ba--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_100%2Cw_350/https://billboards.forem.tools/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbGNDIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--81f4f05c27808f68c1e91590ff950026157d3fd0/Screenshot%25202024-07-19%2520at%252012.04.24%25E2%2580%25AFPM.png"
            alt="card"
            width={208}
            height={80}
            className="rounded-md"
          />
          <p className="mb-4 text-neutral-600 italic">
            Neon is the official database partner of DEV
          </p>
          <p className=" text-neutral-600 ">Happy Coding! 💜</p>
        </div>
        <div className="bg-white rounded-md p-4 flex flex-col gap-3 border border-neutral-200 ">
          <div className="flex justify-between items-center">
            <span className="text-sm text-neutral-600">DEV Community</span>
            <Image
              src="/icons/dots-icon.svg"
              alt="more"
              width={24}
              height={24}
            />
          </div>
          <h5 className="font-bold text-md text-neutral-700">
            Thank you to our Diamond Sponsor Neon
          </h5>
          <Image
            src="https://res.cloudinary.com/practicaldev/image/fetch/s--GPRPp7Ba--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_100%2Cw_350/https://billboards.forem.tools/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbGNDIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--81f4f05c27808f68c1e91590ff950026157d3fd0/Screenshot%25202024-07-19%2520at%252012.04.24%25E2%2580%25AFPM.png"
            alt="card"
            width={208}
            height={80}
            className="rounded-md"
          />

          <p className=" text-neutral-600 font-bold ">
            <span className="text-purple hover:text-darkpurple underline cursor-pointer">
              Fill out this survey
            </span>{" "}
            and help us moderate our community by becoming a tag moderator here
            at DEV.
          </p>
        </div>
        <footer className="text-neutral-500 text-sm">
          <p className="mb-3">
            <span className="text-purple">DEV Community</span> A constructive
            and inclusive social network for software developers. With you every
            step of your journey.
          </p>
          <p className="mb-3">
            Built on <span className="text-purple">Forem</span> — the
            <span className="text-purple"> open source</span> software that
            powers <span className="text-purple">DEV</span> and other inclusive
            communities.
          </p>
          <p className="mb-3">
            Made with love and 
            <span className="text-purple"> Ruby on Rails</span>. DEV Community ©
            2016 - 2024.
          </p>
        </footer>
      </div>
    </>
  );
}
