import Image from "next/image";
import clsx from "clsx";
import MainLayout from "@/layouts/MainLayout";
import NavLeft from "@/components/navBar/navLeft";
import PostsContainer from "@/components/posts/postsContainer";

import Head from "next/head";
export default function Home() {
  return (
    <>
      <Head>
        <title>DEV Community</title>
      </Head>
      <MainLayout>
      <main className="flex justify-center px-2">
      <div className="grid grid-cols-1 md:grid-cols-[16rem_1fr_23rem] gap-2 max-w-[1340px] w-full">
            <NavLeft />
            <PostsContainer />
          </div>
        </main>
      </MainLayout>
    </>
  );
}
