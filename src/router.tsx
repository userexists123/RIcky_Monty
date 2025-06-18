import {
  createRouter,
  createRoute,
  createRootRoute,
} from '@tanstack/react-router';
import CharacterList from './pages/CharacterList';
import CharacterDetails from './pages/CharacterDetails';

const rootRoute = createRootRoute();

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: CharacterList,
  validateSearch: (search: Record<string, unknown>) => {
  let page = 1;
  if (typeof search.page === 'string') {
    const parsed = parseInt(search.page);
    if (!isNaN(parsed)) page = parsed;
  } else if (typeof search.page === 'number') {
    page = search.page;
  }
  return { page };
},
});

const detailsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/character/$id',
  component: CharacterDetails,
});

const routeTree = rootRoute.addChildren([indexRoute, detailsRoute]);

const router = createRouter({ routeTree });

export default router;
