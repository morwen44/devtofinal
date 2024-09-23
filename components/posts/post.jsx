import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { formatDate } from "@/utils/dateformat";
import { addCommentToPost, getCommentsForPost } from "@/utils/api";
import Footer from "../footer";

export default function Post({ id, date, title, body, image, user }) {
  const router = useRouter();
  const { register, handleSubmit, watch, reset } = useForm();
  const [isTextareaFocused, setIsTextareaFocused] = useState(false);
  const [previewContent, setPreviewContent] = useState(null);
  const [localComments, setLocalComments] = useState([]);
  const isPostDetailPage = router.asPath === `/posts/${id}`;

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const comments = await getCommentsForPost(id);
        setLocalComments(comments);
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

  return isPostDetailPage ? (
    <main className="flex flex-col min-h-screen">
      <div className="flex-grow flex justify-center">
        <div className="grid grid-cols-[2rem_45rem_8rem]">
          <div>Reactions</div>
          <div>
            <div className="rounded-md overflow-hidden bg-white border border-neutral-200">
              <div className="relative h-64 w-full">
                <Image
                  src={image}
                  alt={title}
                  layout="fill"
                  objectFit="cover"
                />
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
                    <p className="text-sm text-neutral-600 font-bold">
                      {user.name}
                    </p>
                    <p className="text-sm text-neutral-500 text-xs">
                      Posted on {formatDate(date)}
                    </p>
                  </div>
                </div>
                <div className="ps-8">
                  <h2 className="text-3xl font-bold">{title}</h2>
                  <p className="mt-2">Tags</p>
                  <div className="mt-4">{body}</div>
                </div>
                <hr className="my-8" />
                <div className="bg-white ps-8">
                  <h3 className="font-bold">
                    Top comments <span>({localComments.length}) </span>
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
                  <div>Code of Conduct</div>
                </div>
              </div>
            </div>
            <div className="my-4 bg-white border rounded-md">
              Hello
            </div>
          </div>
          <div>cosas</div>
        </div>

      </div>
      <Footer />
    </main>
  ) : (
    <Link href={`/posts/${id}`}>
      <div className="rounded-md overflow-hidden bg-white border border-neutral-200 cursor-pointer active:border-purple active:border-2">
        <div className="relative h-64 w-[580px]">
          <Image src={image} alt={title} layout="fill" objectFit="cover" />
        </div>
        <div className="grid grid-rows-4 ps-6 mt-4">
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
          <h2 className="text-3xl font-bold">{title}</h2>
          <p>Tags</p>
          {/* Conditionally render comments or prompt */}
          {comments && comments.length > 0 ? (
            <div className="ps-12">{/* Render comments here */}</div>
          ) : (
            <span className="ps-12 text-purple-600 cursor-pointer">
              Add comment
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
