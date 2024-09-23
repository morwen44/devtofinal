import Image from "next/image";

export default function UserCard({ user }) {
  return (
    <div className="bg-white gap-4 w-64 h-40 rounded-md border hidden md:block">
      <div className="flex p-4 rounded-md  gap-2">
        <Image
          src={user.profilePic}
          alt={user.name}
          width={40}
          height={40}
          className="rounded-full w-12 h-12"
        />
        <div>
          <h4 className="text-lg font-semibold">{user.name}</h4>
          <p className="text-neutral-500 text-sm">{user.username}</p>
        </div>
      </div>
      <div className="flex justify-center">
        <button className="bg-purple w-full rounded-md p-2 text-white hover:bg-darkpurple mx-3">Follow</button>
      </div>
    </div>
  );
}
