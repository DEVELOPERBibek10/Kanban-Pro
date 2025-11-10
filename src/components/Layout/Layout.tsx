import { ThemeProvider } from "@/Context/ThemeProvider";
import Header from "./Header";
import Home from "@/pages/Home";
import { Toaster } from "../ui/sonner";

const Layout = () => {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="w-full max-w-full min-h-screen">
        <Header />
        <div className="min-h-[60vh] w-full flex mt-12">
          <Home />
        </div>
        <Toaster closeButton={false} />
      </div>
    </ThemeProvider>
  );
};

export default Layout;
