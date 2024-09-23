import { useState } from "react";
import Image from "next/image";
import Reactions from "./reactions";

export default function Stats({ comments, onAddReaction, reactions }) {
  const [showReactions, setShowReactions] = useState(false);
  const totalReactions = reactions.reduce((sum, r) => sum + r.count, 0);

  const handleMouseEnter = () => {
    setShowReactions(true);
  };

  const handleMouseLeave = () => {
    setShowReactions(false);
  };

  return (
    <div className="flex-col mt-20 gap-4 hidden md:flex relative">
      <div
        className="grid grid-rows-[2rem_1rem] justify-center"
        onMouseEnter={handleMouseEnter}
      >
        <Image
          src="/icons/reactions-icon.svg"
          alt="reactions"
          width={24}
          height={24}
        />
        <span className="text-neutral-600 text-center text-sm">{totalReactions}</span>
      </div>

      {showReactions && (
        <div
          className="absolute left-full top-0 ml-0 bg-white shadow-lg rounded-3xl p-4 z-10"
          onMouseEnter={handleMouseEnter} 
          onMouseLeave={handleMouseLeave} 
        >
          <Reactions reactions={reactions} onAddReaction={onAddReaction} />
        </div>
      )}

      <div className="grid grid-rows-[2rem_1rem] justify-center">
        <Image
          src="/icons/comment.svg"
          alt="comments"
          width={24}
          height={24}
        />
        <span className="text-neutral-600 text-center text-sm">{comments.length}</span>
      </div>
      <div className="grid grid-rows-[2rem_1rem] justify-center">
        <Image
          src="/icons/bookmark.svg"
          alt="bookmarks"
          width={24}
          height={24}
        />
        <span className="text-neutral-600 text-center text-sm">2</span>
      </div>
    </div>
  );
}
