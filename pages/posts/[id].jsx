import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { usePosts } from "@/context/PostsContext";
import MainLayout from "@/layouts/MainLayout";
import Post from "@/components/posts/post";
import Stats from "@/components/posts/stats";
import UserCard from "@/components/userCard";
import Footer from "@/components/footer";
import { addReaction } from "@/utils/api";
import Head from "next/head";

export default function PostDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { getPostById } = usePosts();
  const [post, setPost] = useState(null);
  const [localReactions, setLocalReactions] = useState([]);

  useEffect(() => {
    if (id) {
      const fetchedPost = getPostById(id);
      setPost(fetchedPost);
      setLocalReactions(fetchedPost.reactions || []);
    }
  }, [id, getPostById]);

  const handleAddReaction = async (emoji) => {
    try {
      const result = await addReaction(id, emoji);
      setLocalReactions(result.data.reactions);
    } catch (error) {
      console.error("Error adding reaction:", error);
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <MainLayout>
        <main className="flex flex-col min-h-screen mt-4">
          <div className="flex-grow flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-[2rem_56rem_8rem] gap-4 w-full max-w-[1340px] mx-auto px-4 md:px-0">
              <Stats
                comments={post.comments}
                onAddReaction={handleAddReaction}
                reactions={localReactions}
                className="hidden md:block"
              />
              <Post
                id={post._id}
                date={post.createdAt}
                title={post.title}
                body={post.body}
                image={post.image}
                user={post.user}
                comments={post.comments || []}
                reactions={localReactions}
                onAddReaction={handleAddReaction}
                className="col-span-1"
              />
              <UserCard user={post.user} className="hidden md:block" />
            </div>
          </div>
          <Footer />
        </main>
      </MainLayout>
    </>
  );
}
