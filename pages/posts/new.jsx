import NavPost from "@/components/navBar/navPost";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { useState } from "react";
import { createPost } from "@/utils/api";
import { yupResolver } from "@hookform/resolvers/yup";
import { postSchema } from "@/utils/validationSchemas";
import router from "next/router";
import { usePosts } from "@/context/PostsContext";
import Head from "next/head";

export default function CreatePost() {
  const { setPosts, setFilteredPosts } = usePosts();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(postSchema),
  });
  const [focusedSection, setFocusedSection] = useState(null);
  const [tags, setTags] = useState([]);

  const onSubmit = async (data) => {
    const postData = { ...data, tags };
    try {
      const result = await createPost(postData);
      console.log("Post created:", result);
      setPosts((prevPosts) => [...prevPosts, result]);
      setFilteredPosts((prevFiltered) => [...prevFiltered, result]);
      router.push("/");
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === " ") {
      event.preventDefault();
      const newTag = event.target.value.trim();
      if (newTag && tags.length < 4) {
        setTags((prevTags) => [...prevTags, newTag]);
        event.target.value = "";
      }
    }
  };

  const removeTag = (tagToRemove) => {
    setTags((prevTags) => prevTags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <>
      <Head>
        <title>New Post - DEV Community</title>
      </Head>
      <NavPost />
      <main className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-[1100px]">
          <div className="col-span-1 md:col-span-2 bg-white border border-neutral-100 rounded-md w-full">
            <form
              className="flex flex-col p-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <input
                type="text"
                placeholder="Add a cover image url"
                className={`p-2 w-56 rounded-md mt-4 text-center focus:outline-none border-2 ${
                  errors.image ? "border-red-500" : "border-neutral-200"
                }`}
                {...register("image")}
              />
              {errors.image && (
                <p className="text-red-500 text-sm">{errors.image.message}</p>
              )}

              <input
                placeholder="New post title..."
                className={`p-2 w-full h-[5rem] rounded-md mt-4 focus:outline-none border-none text-4xl font-bold text-gray-900 ${
                  errors.title ? "border-red-500" : ""
                }`}
                {...register("title")}
                onFocus={() => setFocusedSection("title")}
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title.message}</p>
              )}

              <div className="flex flex-wrap mt-4">
                {tags.map((tag, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-gray-200 rounded-md p-1 mr-2 mb-2"
                  >
                    <span>{tag}</span>
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-1 p-1"
                    >
                      <Image
                        src="/icons/close-icon.svg"
                        width={16}
                        height={16}
                        alt="remove tag"
                      />
                    </button>
                  </div>
                ))}
                <input
                  placeholder="Add up to 4 tags"
                  className="p-2 w-full rounded-md text-sm text-gray-900 focus:outline-none border-none"
                  onKeyDown={handleKeyDown}
                />
              </div>

              <textarea
                placeholder="Write your post content here..."
                className={`p-2 w-full h-[55vh] rounded-md mt-4 text-sm text-gray-900 focus:outline-none border-none ${
                  errors.body ? "border-red-500" : ""
                }`}
                {...register("body")}
                onFocus={() => setFocusedSection("content")}
              />
              {errors.body && (
                <p className="text-red-500 text-sm">{errors.body.message}</p>
              )}

              <div className="flex gap-2 items-center mt-4">
                <button
                  type="submit"
                  className="bg-purple text-white p-2 rounded-md w-24"
                >
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

          {/* Sidebar with tips */}
          <div className="hidden w-full md:w-72 md:grid grid-rows-[6rem_4rem_3rem_auto] gap-4">
            {focusedSection === "title" && (
              <div className="row-start-2">
                <h5 className="font-bold mb-1">Writing a Great Post Title</h5>
                <div className="ps-3 text-neutral-600">
                  <ul>
                    <li>
                      Think of your post title as a super short (but
                      compelling!) description — like an overview of the actual
                      post in one short sentence.
                    </li>
                    <li>
                      Use keywords where appropriate to help ensure people can
                      find your post by search.
                    </li>
                  </ul>
                </div>
              </div>
            )}
            {focusedSection === "tags" && (
              <div className="row-start-3">
                <h5 className="font-bold mb-1">Tagging Guidelines</h5>
                <div className="ps-3 text-neutral-600">
                  <ul>
                    <li>
                      Tags help people find your post - think of them as the
                      topics or categories that best describe your post.
                    </li>
                    <li>
                      Add up to four comma-separated tags per post. Use existing
                      tags whenever possible.
                    </li>
                    <li>
                      Some tags have special posting guidelines - double check
                      to make sure your post complies with them.
                    </li>
                  </ul>
                </div>
              </div>
            )}
            {focusedSection === "content" && (
              <div className="row-start-4">
                <h5 className="font-bold mb-1">Editor Basics</h5>
                <div className="ps-3 text-neutral-600">
                  <ul>
                    <li>
                      Use Markdown to write and format posts. Commonly used
                      syntax.
                    </li>
                    <li>
                      Embed rich content such as Tweets, YouTube videos, etc.
                      Use the complete URL. See a list of supported embeds.
                    </li>
                    <li>
                      In addition to images for the post's content, you can also
                      drag and drop a cover image.
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
