import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';
import MainLayout from "@/layouts/MainLayout";
import Head from 'next/head';
export default function SignoutConfirm() {
  const router = useRouter();
  const { setIsLoggedIn } = useAuth(); 

  const handleSignOut = () => {
    
    localStorage.removeItem('token'); 

   
    setIsLoggedIn(false);

   
    router.push('/');
  };

  return (
    <>
    <Head><title>Confirm Signout - DEV Community</title></Head>
    <MainLayout>
      <div className="flex flex-col justify-center items-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">
          Are you sure you want to sign out?
        </h1>
        <button
          onClick={handleSignOut}
          className="bg-purple rounded-md px-4 py-3 text-sm text-white hover:bg-darkpurple w-32"
        >
          Yes, sign out
        </button>
      </div>
    </MainLayout>
    </>
  );
}
