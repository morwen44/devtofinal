import Image from "next/image";
import clsx from "clsx";
import MainLayout from "@/layouts/MainLayout";
import NavLeft from "@/components/navBar/navLeft";
import PostsContainer from "@/components/posts/postsContainer";
export default function Home() {

  

  return (
    <MainLayout>
      <main className="flex justify-around">
        <div className="grid grid-cols-[auto_auto_auto] gap-4 max-w-[1340px]">
          <NavLeft />
          <PostsContainer/>
         
        </div>
      </main>
    </MainLayout>
  );
}
