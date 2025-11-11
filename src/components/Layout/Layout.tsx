import { ThemeProvider } from "@/Context/ThemeProvider";
import Header from "./Header";
import Home from "@/pages/Home";
import { Toaster } from "../ui/sonner";
import { useTheme } from "@/Hooks/useTheme";


const LayoutContent = () => {
  const { theme } = useTheme(); // Listen to actual theme changes

  return (
    <div className="w-full max-w-full min-h-screen">
      <Header />
      <div className="min-h-[60vh] w-full flex mt-12">
        <Home />
      </div>
      <Toaster
        richColors
        theme={theme as "light" | "dark" | "system"}
        closeButton={false}
      />
    </div>
  );
};

const Layout = () => {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <LayoutContent />
    </ThemeProvider>
  );
};

export default Layout;
