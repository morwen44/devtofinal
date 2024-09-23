import NavBar from "@/components/navBar/navBarTop";

export default function MainLayout({ children }) {
  return (
    <main>
      <NavBar />
      {children}
    </main>
  );
}
