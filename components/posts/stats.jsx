import Image from "next/image";

export default function Stats( {comments}) {
    
  return (
    <div className=" flex-col mt-20 gap-4 hidden md:flex">
      <div className="grid grid-rows-[2rem_1rem] justify-center ">
        <Image
          src="/icons/reactions-icon.svg"
          alt="reactions"
          width={24}
          height={24}
        />
        <span className="text-neutral-600 text-center text-sm">12</span>
      </div>
      <div className="grid grid-rows-[2rem_1rem] justify-center">
        {" "}
        <Image
          src="/icons/comment.svg"
          alt="reactions"
          width={24}
          height={24}
        />
        <span className="text-neutral-600 text-center text-sm">{comments.length}</span>
      </div>
      <div className="grid grid-rows-[2rem_1rem] justify-center">
        {" "}
        <Image
          src="/icons/bookmark.svg"
          alt="reactions"
          width={24}
          height={24}
        />
        <span className="text-neutral-600 text-center text-sm">2</span>
      </div>
    </div>
  );
}
