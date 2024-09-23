import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { usePosts } from "@/context/PostsContext";
import MainLayout from "@/layouts/MainLayout";
import Post from "@/components/posts/post";

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
      <div className="post-detail">
        <Post
          id={post._id}
          date={post.createdAt}
          title={post.title}
          body={post.body}
          image={post.image}
          user={post.user}
          comments={post.comments || []}
        />
      </div>
    </MainLayout>
  );
}
