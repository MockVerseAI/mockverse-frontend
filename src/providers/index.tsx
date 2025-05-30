import { ThemeProvider } from "@/providers/theme-provider";
import { SocketProvider } from "@/providers/socket-provider";
import { store, RootState } from "@/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider, useSelector } from "react-redux";
import { Toaster } from "@/components/ui/sonner";
import { isUserAuthenticated } from "@/lib/utils";

const SocketWrapper = ({ children }: { children: React.ReactNode }) => {
  const { user } = useSelector((root: RootState) => root.user);
  const isAuthenticated = isUserAuthenticated() && !!user;

  return (
    <SocketProvider isAuthenticated={isAuthenticated} userId={user?._id}>
      {children}
    </SocketProvider>
  );
};

const Providers = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <SocketWrapper>
            {children}
            <Toaster richColors position="top-center" />
          </SocketWrapper>
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  );
};

export default Providers;
