import { ThemeProvider } from "@/Context/ThemeProvider";
import Header from "./Header";
import Home from "@/pages/Home";

const Layout = () => {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="max-w-full min-h-screen">
        <Header />
        <div className="min-h-[70vh] w-full flex mt-12">
          <Home />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Layout;
