import { QueryClient } from '@tanstack/react-query';
import { createRouter, createHashHistory } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
export const getRouter = () => createRouter({ routeTree, history: createHashHistory(), context: { queryClient: new QueryClient() }, scrollRestoration: true });
