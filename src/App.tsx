import React from "react";
import "@progress/kendo-theme-default/dist/all.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "./components/layout";

const queryClient = new QueryClient();
const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout />
    </QueryClientProvider>
  );
};

export default App;
