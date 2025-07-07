import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import "./index.css";
import { router } from "./Router";
import { ThemeProvider } from "./Components/theme-provider";
import { Toaster } from "./Components/ui/sonner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <Toaster />
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);
