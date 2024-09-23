import Image from "next/image";
import clsx from "clsx";
import MainLayout from "@/layouts/MainLayout";
import NavLeft from "@/components/navBar/navLeft";
import PostsContainer from "@/components/posts/postsContainer";
import Head from "next/head";
import ListCard from "@/components/listCard";
import { usePosts } from "@/context/PostsContext";

export default function Home() {
  const { getAllUniqueTags } = usePosts();
  const uniqueTags = getAllUniqueTags();

  return (
    <>
      <Head>
        <title>DEV Community</title>
      </Head>
      <MainLayout>
        <main className="flex justify-center px-2">
          <div className="grid grid-cols-1 md:grid-cols-[16rem_1fr_22rem] gap-4 max-w-[1340px] w-full">
            <NavLeft />
            <PostsContainer />
            <div className="flex-none">
              <ListCard tags={uniqueTags} />
            </div>
          </div>
        </main>
      </MainLayout>
    </>
  );
}
