import Filter from "@/components/posts/filters";
import { filters } from "@/utils/maps";
import { usePosts } from "@/context/PostsContext";
import Post from "./post";

export default function PostsContainer() {
  const { filteredPosts, loading } = usePosts();
  if (loading) return <p>Loading posts...</p>;

  return (
    <div className="pt-4 w-[580px]">
      <div className="flex ">
        {filters.map((filter, index) => (
          <Filter key={index} filter={filter} />
        ))}
      </div>
      <div className="pt-2">
        {filteredPosts.map((post) => (
          <Post
            key={post._id}
            id={post._id}
            date={post.createdAt}
            title={post.title}
            body={post.body}
            image={post.image}
            user={post.user}
            comments={post.comments || []}
          />
        ))}
      </div>
    </div>
  );
}
