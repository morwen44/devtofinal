import Image from "next/image";
import { formatDate } from "@/utils/dateformat";

export default function Post({ date, title, body, image, user }) {
  return (
    <div className="rounded-md overflow-hidden bg-white border border-neutral-200">
      <div className="relative h-64 w-[580px]">
        <Image
          src={image}
          alt={title}
          layout="fill"
          objectFit="cover"
          className=""
        />
      </div>
      <div className="grid grid-rows-4 ps-6 mt-4">
        <div className="flex items-center gap-2 mt-2 ">
          <Image
            src={user.profilePic}
            alt={user.name}
            width={40}
            height={40}
            className="rounded-full"
          />
          <div>
            <p className="text-sm text-neutral-600">{user.name}</p>
            <p className="text-sm text-neutral-500">{formatDate(date)}</p>
          </div>
        </div>
        <div className="ps-12">
          <h2 className="text-3xl font-bold">{title}</h2>
          <p>tags</p>
        </div>
        <div className="ps-12">reactions</div>
        <div className="ps-12"><p>{body}</p></div>
      </div>
    </div>
  );
}
