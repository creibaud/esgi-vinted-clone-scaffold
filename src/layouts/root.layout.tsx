import { TanStackDevtools } from "@tanstack/react-devtools";
import { FormDevtoolsPanel } from "@tanstack/react-form-devtools";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import { queryClient } from "@/lib/tanstack-query";

interface RootLayoutProps {
    children: React.ReactNode;
}

export function RootLayout({ children }: RootLayoutProps): React.ReactElement {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <TanStackDevtools
                plugins={[
                    {
                        name: "TanStack Query",
                        render: <ReactQueryDevtoolsPanel />,
                    },
                    {
                        name: "TanStack Form",
                        render: <FormDevtoolsPanel />,
                    },
                ]}
            />
        </QueryClientProvider>
    );
}
