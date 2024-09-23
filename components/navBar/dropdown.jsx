import { GhostPurpleLink } from "../Links/buttons";
import Link from "next/link";

export default function Dropdown({ user }) {
  return (
    <div className="absolute right-0 mt-2 w-56 p-2 bg-white border border-gray-200 rounded-md shadow-lg z-10">
      <div className="p-3">
        <p className="font-semibold">{user.name}</p>
        <p className="text-sm text-gray-500">@{user.username}</p>
      </div>
      <hr className="my-2" />

      <GhostPurpleLink text="Dashboard" w="full" link="/" align="start" />
      <GhostPurpleLink
        text="Create Post"
        w="full"
        link="posts/new"
        align="start"
      />
      <GhostPurpleLink
        text="Reading list"
        w="full"
        link="/readinglist"
        align="start"
      />
      <GhostPurpleLink
        text="Settings"
        w="full"
        link="/settings"
        align="start"
      />
      <hr className="mt-2" />
      <GhostPurpleLink
        text="Sign out"
        w="full"
        link="/signout_confirm"
        align="start"
      />
    </div>
  );
}
