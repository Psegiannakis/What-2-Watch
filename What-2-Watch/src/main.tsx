import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Heading from "./Heading";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Carousel1 from "./Carousel";

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 1000 * 60 * 10 } },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Heading />
      <Carousel1 />
    </QueryClientProvider>
  </React.StrictMode>
);
