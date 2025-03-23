import Sidebar from "@/components/structure/Sidebar/Sidebar";

function Layout({ children }) {
  return (
    <>
      {children}
      <Sidebar />
    </>
  );
}

export default Layout;
