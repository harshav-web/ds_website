import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet, HeadContent, createRootRouteWithContext } from '@tanstack/react-router';
import { Header, Footer } from '@/components/laboratory/shell';
export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
 component: Root,
});
function Root() { const { queryClient } = Route.useRouteContext(); return <QueryClientProvider client={queryClient}><HeadContent/><Header/><Outlet/><Footer/></QueryClientProvider>; }
