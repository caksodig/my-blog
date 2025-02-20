import { useState } from "react";
import { AppProps } from "next/app";
import { ConfigProvider, App as AntApp } from "antd";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Layout from "@/components/layout/Layout";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  // Create a query client with server-side rendering support
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            staleTime: 5 * 60 * 1000, // 5 minutes
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#1890ff",
            borderRadius: 6,
          },
        }}
      >
        <AntApp>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AntApp>
      </ConfigProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default MyApp;
