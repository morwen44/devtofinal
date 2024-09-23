import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useUser } from "@/context/UserContext";
import Dropdown from "./dropdown";
import { usePosts } from "@/context/PostsContext";
import NavLink from "./navLink";
import { mainNavLinks, otherLinks, socialNavLinks } from "@/utils/maps";
import SocialButton from "../sociallogin";


export default function NavBarTop() {
  const { isLoggedIn } = useAuth();
  const { user } = useUser();
  const { handleSearchChange } = usePosts();
  const [menuVisible, setMenuVisible] = useState(false);
  const [hamburgerVisible, setHamburgerVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const toggleHamburger = () => {
    setHamburgerVisible(!hamburgerVisible);
  };

  return (
    <nav className="bg-white shadow-sm h-14 p-2 min-w-min">
      <div className="flex justify-between items-center max-w-[1340px] mx-auto">
        <div className="sm:block md:hidden">
          <button
            onClick={toggleHamburger}
            className="p-2 hover:bg-ghostpurple rounded-md"
          >
            <div className="w-7 h-7">
              <Image
                src="/icons/hamburger-icon.svg"
                alt="Menu"
                width={40}
                height={40}
                layout="fixed"
              />
            </div>
          </button>
        </div>

        <div className="flex items-center w-[46rem]">
          <Link href="/">
            <Image
              src="https://dev-to-uploads.s3.amazonaws.com/uploads/logos/original_logo_0DliJcfsTcciZen38gX9.png"
              alt="DEV Community Logo"
              width={50}
              height={40}
              className="me-2"
            />
          </Link>
          <div className="w-full flex items-center relative">
            <input
              className=" ms-2 p-1 h-[40px] w-full lg:ps-12 ps-3 pr-10 border text-neutral-800 border-neutral-300 rounded-md focus:outline-none focus:border-2 focus:bg-white focus:border-purple hidden md:block"
              placeholder="Search..."
              onChange={handleSearchChange}
            />
            <button className="hover:bg-ghostpurple p-2 rounded-md absolute top-1/2 transform -translate-y-1/2 w-10 h-10  sm:right-2 md:left-2">
              <Image
                src="/icons/search-icon.svg"
                alt="search icon"
                width={24}
                height={24}
              />
            </button>
            <span className="my-auto text-xs absolute text-neutral-400 right-3 hidden md:flex">
              Powered by{" "}
              <Image
                src="/icons/algolia-icon.svg"
                alt="Algolia logo"
                width={10}
                height={10}
                className="mx-1"
              />{" "}
              Algolia
            </span>
          </div>
        </div>

        <div className="flex gap-4 items-center relative">
          {isLoggedIn ? (
            <>
              <Link href="/posts/new">
                <button className="text-purple border border-purple py-2 px-3 w-auto rounded-md text-nowrap hover:bg-purple hover:text-white hover:underline hidden md:block">
                  Create Post
                </button>
              </Link>
              <Image
                src="/icons/notification-icon.svg"
                alt="Notifications"
                width={24}
                height={24}
              />
              <div className="relative">
                <Image
                  src={user?.profilePic}
                  alt="User Profile"
                  width={30}
                  height={30}
                  className="rounded-full cursor-pointer"
                  onClick={toggleMenu}
                />
                {menuVisible && <Dropdown user={user} />}
              </div>
            </>
          ) : (
            <>
              <Link href="/enter">
                <button className="hover:bg-ghostpurple hover:text-darkpurple p-2 w-20 rounded-md hover:underline text-neutral-700">
                  Log in
                </button>
              </Link>
              <Link href="/enter?state=new-user">
                <button className="text-purple border border-purple py-2 px-3 w-auto rounded-md text-nowrap hover:bg-purple hover:text-white hover:underline">
                  Create Account
                </button>
              </Link>
            </>
          )}
        </div>
      </div>

      {hamburgerVisible && (
        <div className="fixed top-0 left-0 w-64 h-full bg-white shadow-md z-50 overflow-y-auto">
         
          <button
            onClick={() => setHamburgerVisible(false)}
            className="absolute top-3 right-2 p-2"
          >
            <Image src="/icons/close-icon.svg" alt="close" width={24} height={24}></Image>
          </button>
          {!isLoggedIn && (
            <div className="bg-white rounded-md p-4 flex flex-col mt-2">
              <h5 className="text-lg font-bold">DEV Community</h5>
              <hr className="my-2"/>
              <h5 className="mb-4 font-bold text-lg">
                DEV Community is a community of 2,083,186 amazing developers
              </h5>
              <p className="mb-4 text-neutral-600">
                We're a place where coders share, stay up-to-date and grow their
                careers.
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
          
          <ul className="p-4">
            {mainNavLinks.map((link, index) => (
              <NavLink key={index} section={link.section} icon={link.icon} />
            ))}
          </ul>

          <p className="ms-4 font-bold">Other</p>
          <ul className="p-4">
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

        </div>
      )}
    </nav>
  );
}
