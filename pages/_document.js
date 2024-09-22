import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
      <title>DEV community</title>
      <link rel="icon" href="https://res.cloudinary.com/practicaldev/image/fetch/s--E8ak4Hr1--/c_limit,f_auto,fl_progressive,q_auto,w_32/https://dev-to.s3.us-east-2.amazonaws.com/favicon.ico" type="image/svg+xml" />
      </Head>
      <body className="antialiased bg-[#f5f5f5] text-neutral-900">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
