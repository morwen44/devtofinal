import NavPost from "@/components/navBar/navPost";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { useState } from "react";

export default function CreatePost() {
  const { register, handleSubmit } = useForm();
  const [focusedSection, setFocusedSection] = useState(null);

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <NavPost />
      <main className="flex justify-center">
        <div className="grid grid-cols-3 gap-6 w-[1100px]">
          <div className="col-span-2 bg-white border border-neutral-100 rounded-md">
            <form className="flex flex-col p-4" onSubmit={handleSubmit(onSubmit)}>
              <input
                type="text"
                placeholder="Add a cover image url"
                className="p-2 w-56 rounded-md mt-4 text-center focus:outline-none border-2"
                {...register("image")} 
              />
              <input
                placeholder="New post title..."
                className="p-2 w-full h-[5rem] rounded-md mt-4 focus:outline-none border-none text-4xl font-bold text-gray-900"
                {...register("title")}
                onFocus={() => setFocusedSection("title")} 
              />
              <input
                placeholder="Add up to 4 tags"
                className="p-2 w-full rounded-md mt-4 text-sm text-gray-900 focus:outline-none border-none"
                {...register("tags")}
                onFocus={() => setFocusedSection("tags")} 
              />
              <textarea
                placeholder="Write your post content here..."
                className="p-2 w-full h-[55vh] rounded-md mt-4 text-sm text-gray-900 focus:outline-none border-none"
                {...register("body")}
                onFocus={() => setFocusedSection("content")} 
              />
              <div className="flex gap-2 items-center mt-4 ">
                <button type="submit" className="bg-purple text-white p-2 rounded-md w-24">
                  Publish
                </button>
                <button className="hover:bg-ghostpurple hover:text-purple p-2 rounded-md w-24">
                  Save draft
                </button>
                <button className="p-2 hover:bg-ghostpurple rounded-md">
                  <Image
                    src="/icons/post-options.svg"
                    width={24}
                    height={24}
                    alt="post options"
                  />
                </button>
                <button className="hover:bg-ghostpurple hover:text-purple p-2 text-sm rounded-md w-36 text-nowrap">
                  Revert new changes
                </button>
              </div>
            </form>
          </div>
          <div className="w-72 grid grid-rows-[6rem_4rem_3rem_1fr] gap-4">
            {focusedSection === "title" && (
              <div className="row-start-2">
                <h5 className="font-bold mb-1">Writing a Great Post Title</h5>
                <div className="ps-3 text-neutral-600">
                  <li>
                    Think of your post title as a super short (but compelling!)
                    description — like an overview of the actual post in one short
                    sentence.
                  </li>
                  <li>
                    Use keywords where appropriate to help ensure people can find
                    your post by search.
                  </li>
                </div>
              </div>
            )}
            {focusedSection === "tags" && (
              <div className="row-start-3">
                <h5 className="font-bold mb-1">Tagging Guidelines</h5>
                <div className="ps-3 text-neutral-600">
                  <li>
                    Tags help people find your post - think of them as the topics
                    or categories that best describe your post.
                  </li>
                  <li>
                    Add up to four comma-separated tags per post. Use existing
                    tags whenever possible.
                  </li>
                  <li>
                    Some tags have special posting guidelines - double check to
                    make sure your post complies with them.
                  </li>
                </div>
              </div>
            )}
            {focusedSection === "content" && (
              <div className="row-start-4">
                <h5 className="font-bold mb-1">Editor Basics</h5>
                <div className="ps-3 text-neutral-600">
                  <li>
                    Use Markdown to write and format posts. Commonly used syntax
                  </li>
                  <li>
                    Embed rich content such as Tweets, YouTube videos, etc. Use
                    the complete URL. See a list of supported embeds.
                  </li>
                  <li>
                    In addition to images for the post's content, you can also
                    drag and drop a cover image.
                  </li>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
