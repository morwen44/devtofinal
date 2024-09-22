import "@/styles/globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { UserProvider } from "@/context/UserContext";
import { PostsProvider } from "@/context/PostsContext";

export default function App({ Component, pageProps }) {
  return (
    <PostsProvider>
      <AuthProvider>
        <UserProvider>
          <Component {...pageProps} />
        </UserProvider>
      </AuthProvider>
    </PostsProvider>
  );
}
