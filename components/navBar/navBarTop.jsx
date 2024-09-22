import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useUser } from "@/context/UserContext";

export default function NavBarTop() {
  const { isLoggedIn } = useAuth();
  const { user } = useUser();
  

  return (
    <nav className="bg-white shadow-sm h-14 p-2">
      <div className="flex justify-between items-center max-w-[1340px] mx-auto">
        <div className="flex items-center w-[46rem]">
          <Image
            src="https://dev-to-uploads.s3.amazonaws.com/uploads/logos/original_logo_0DliJcfsTcciZen38gX9.png"
            alt="DEV Community Logo"
            width={50}
            height={40}
            className="me-2"
          />
          <div className="w-full flex items-center relative">
            <input
              className="p-1 h-[40px] w-full lg:ps-12 ps-3 pr-10 border text-neutral-800 border-neutral-300 rounded-md focus:outline-none focus:border-2 focus:bg-white focus:border-purple hidden md:block"
              placeholder="Search..."
            />
            <button
              className="hover:bg-ghostpurple p-2 rounded-md absolute top-1/2 transform -translate-y-1/2 w-10 h-10 flex justify-center items-center sm:right-2 md:left-2"
            >
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
        <div className="flex gap-4">
          {isLoggedIn ? (
            <>
              <Link href="/posts/createpost">
                <button className="text-purple border border-purple py-2 px-3 w-auto rounded-md text-nowrap hover:bg-purple hover:text-white hover:underline hidden md:block">
                  Create Post
                </button>
              </Link>
              <Image
                src="/icons/notification-icon.svg" 
                alt="Some Image"
                width={24}
                height={24}
              />
              <Image
                src="/path/to/profile/pic.jpg"
                alt="User Profile"
                width={24}
                height={24}
                className="rounded-full"
              />
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
    </nav>
  );
}
