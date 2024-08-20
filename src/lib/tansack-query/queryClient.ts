import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 60 * 1000, // Get latest data every 1 minute
    },
  },
});

export const invalidateQueries = (queryKeys: string[]) => {
  queryKeys.map(key => {
    queryClient.invalidateQueries({ queryKey: [key] });
  });
};

export default queryClient;
