import Link from "next/link";

export function GhostPurpleLink({ text, link, w, align }) {
  return (
    <Link href={link}>
      <button
        className={`text-${align} rounded-md block px-4 py-2 text-sm text-gray-800 hover:bg-ghostpurple hover:underline hover:text-purple w-${w}`}
      >
        {text}
      </button>
    </Link>
  );
}


export function PurpleButton({ text, link, w }) {
    return (
      <Link href={link}>
        <button
          className={`bg-purple rounded-md block px-4 py-2 text-sm text-white hover:bg-darkpurple  w-${w}`}
        >
          {text}
        </button>
      </Link>
    );
  }