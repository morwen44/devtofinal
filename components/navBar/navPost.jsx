import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function NavPost() {
  return (
    <nav className=" h-14 p-2">
      <div className="flex justify-between items-center max-w-[1340px] mx-auto">
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
          <div className="w-full flex items-center justify-end gap-2">
            <button className="hover:bg-ghostpurple hover:text-purple p-2 rounded-md">
              Edit
            </button>
            <button className="hover:bg-ghostpurple hover:text-purple p-2 rounded-md">
              Preview
            </button>
          </div>
        </div>
        <div className="flex justify-end">
          <Link href="/">
            <button className="hover:bg-ghostpurple p-1 rounded-md">
              <Image
                src="/icons/close-icon.svg"
                width={24}
                height={24}
                alt="close"
              />
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
