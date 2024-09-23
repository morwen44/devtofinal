import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import clsx from "clsx";
import Image from "next/image";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { formatDate } from "@/utils/dateformat";
import { addCommentToPost, getCommentsForPost } from "@/utils/api";
import Reactions from "./reactions";

export default function Post({
  id,
  date,
  title,
  body,
  image,
  user,
  comments,
  reactions,
  onAddReaction,
}) {
  const router = useRouter();
  const { register, handleSubmit, watch, reset } = useForm();
  const [isTextareaFocused, setIsTextareaFocused] = useState(false);
  const [previewContent, setPreviewContent] = useState(null);
  const [localComments, setLocalComments] = useState([]);
  const totalReactions = reactions.reduce((sum, r) => sum + r.count, 0);
  const relevance = comments.length + totalReactions;

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const commentsData = await getCommentsForPost(id);
        setLocalComments(commentsData);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [id]);

  const onSubmit = async (data) => {
    try {
      const newComment = await addCommentToPost(id, { body: data.comment });
      setLocalComments((prev) => [...prev, newComment]);
      reset();
      setIsTextareaFocused(false);
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handlePreview = () => {
    const commentData = watch("comment");
    setPreviewContent(commentData);
  };

  const handleFocus = () => {
    setIsTextareaFocused(true);
  };

  const isPostDetailPage = router.asPath === `/posts/${id}`;

  return isPostDetailPage ? (
    <div>
      <div className="rounded-md overflow-hidden bg-white border border-neutral-200">
        <div className="relative h-96 w-full">
          <Image src={image} alt={title} layout="fill" objectFit="cover" />
        </div>
        <div className="mt-4">
          <div className="ps-8 flex items-center gap-2 mt-2">
            <Image
              src={user.profilePic}
              alt={user.name}
              width={40}
              height={40}
              className="rounded-full"
            />
            <div>
              <p className="text-sm text-neutral-600 font-bold">{user.name}</p>
              <p className="text-sm text-neutral-500 text-xs">
                Posted on {formatDate(date)}
              </p>
            </div>
          </div>
          <div className="ps-8 mt-4">
            <Reactions
              reactions={reactions}
              onAddReaction={onAddReaction}
              section="detail"
            />
            <h2 className="text-3xl font-bold">{title}</h2>
            <p className="mt-2">Tags</p>
            <div className="mt-4">{body}</div>
          </div>
          <hr className="my-8" />
          <div className="bg-white ps-8">
            <h3 className="font-bold">
              Top comments <span>({localComments.length})</span>
            </h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex gap-2">
                <Image
                  src={user?.profilePic}
                  alt="User Profile"
                  width={30}
                  height={30}
                  className="rounded-full cursor-pointer w-[30px] h-[30px]"
                />
                <textarea
                  placeholder="Add to the discussion"
                  className={clsx(
                    "p-2 w-full me-8 rounded-md text-sm text-gray-900 focus:outline-none focus:border-purple focus:border-2 border",
                    { hidden: previewContent }
                  )}
                  {...register("comment", { required: true })}
                  onFocus={handleFocus}
                />
                {previewContent && (
                  <div>
                    <p className="text-sm">{previewContent}</p>
                  </div>
                )}
              </div>
              {isTextareaFocused && (
                <div className="flex gap-2 mt-2 ps-9">
                  <button
                    type="submit"
                    className="bg-purple text-white p-2 w-16 text-sm rounded-md hover:bg-darkpurple"
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    onClick={handlePreview}
                    className="bg-neutral-200 text-neutral-500 p-2 text-sm hover:bg-neutral-400 hover:text-neutral-700 rounded-md"
                  >
                    Preview
                  </button>
                </div>
              )}
            </form>

            {localComments.map((comment) => (
              <div
                key={comment.user + comment.createdAt}
                className="flex gap-2 mt-4 me-8"
              >
                <Image
                  src={comment.user?.profilePic}
                  alt="User Profile"
                  width={30}
                  height={30}
                  className="rounded-full cursor-pointer w-[30px] h-[30px]"
                />
                <div className="flex flex-col w-full border rounded-md border-neutral-100 p-4">
                  <div className="flex gap-2 flex-row">
                    <span className="text-sm font-bold">
                      {comment.user.username}
                    </span>
                    <span className="text-sm">
                      {formatDate(comment.createdAt)}
                    </span>
                  </div>
                  <p className="text-sm">{comment.body}</p>
                </div>
              </div>
            ))}
            
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Link href={`/posts/${id}`}>
      <div className="rounded-md overflow-hidden bg-white border border-neutral-200 cursor-pointer active:border-purple active:border-2">
        <div className="relative h-64 w-[580px] ">
          <Image src={image} alt={title} layout="fill" objectFit="cover" />
        </div>
        <div className="grid grid-rows-[auto_auto_auto_auto] ps-6 mt-4">
          <div className="flex items-center gap-2 mt-2">
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
          <h2 className="text-3xl mt-4 font-bold">{title}</h2>
          <p className="mt-3">Tags</p>
          <div className="grid grid-cols-[auto_1fr_auto] items-center my-4 gap-4">
            <Reactions
              reactions={reactions}
              onAddReaction={onAddReaction}
              section="home"
            />

            <div className="flex mx-auto items-center">
              <p className="text-sm text-neutral-600 ml-10">
                {totalReactions}{" "}
                {totalReactions === 1 ? "reaction" : "reactions"}
              </p>
              <button className="text-purple-600 text-sm flex gap-2 items-center hover:bg-neutral-100 p-2 rounded-md">
                <Image
                  src="/icons/comment.svg"
                  alt="reactions"
                  width={18}
                  height={18}
                />
                Add comment
              </button>
            </div>
            <button className="me-8">
              <Image
                src="/icons/bookmark.svg"
                alt="bookmark"
                width={18}
                height={18}
              />
            </button>
          </div>

          {localComments && localComments.length > 0 ? (
            <div
              key={localComments[0].user + localComments[0].createdAt}
              className="flex gap-2 mt-4 mb-4 me-8"
            >
              <Image
                src={localComments[0].user?.profilePic}
                alt="User Profile"
                width={30}
                height={30}
                className="rounded-full cursor-pointer w-[30px] h-[30px]"
              />
              <div className="flex flex-col w-full border rounded-md border-neutral-100 p-4">
                <div className="flex gap-2 flex-row">
                  <span className="text-sm font-bold">
                    {localComments[0].user.username}
                  </span>
                  <span className="text-sm">
                    {formatDate(localComments[0].createdAt)}
                  </span>
                </div>
                <p className="text-sm">{localComments[0].body}</p>
              </div>
            </div>
          ) : (
            <span className="ps-12 text-purple-600 mb-4">Add comment</span>
          )}
        </div>
      </div>
    </Link>
  );
}
