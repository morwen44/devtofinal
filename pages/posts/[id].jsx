import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { usePosts } from "@/context/PostsContext";
import MainLayout from "@/layouts/MainLayout";
import Post from "@/components/posts/post";
import Stats from "@/components/posts/stats";
import UserCard from "@/components/userCard";
import Footer from "@/components/footer";

export default function PostDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { getPostById } = usePosts();
  const [post, setPost] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchedPost = getPostById(id);
      setPost(fetchedPost);
    }
  }, [id, getPostById]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <MainLayout>
      <main className="flex flex-col min-h-screen mt-4">
        <div className="flex-grow flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-[2rem_45rem_8rem] gap-4 w-full max-w-[1340px]">
            <Stats comments={post.comments} />
            <Post
              id={post._id}
              date={post.createdAt}
              title={post.title}
              body={post.body}
              image={post.image}
              user={post.user}
              comments={post.comments || []}
              className="col-span-1" 
            />
            <UserCard user={post.user} />
          </div>
        </div>
        <Footer />
      </main>
    </MainLayout>
  );
}
