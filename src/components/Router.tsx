import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
} from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';

import HomePage from '@/components/pages/HomePage';
import ProjectsPage from '@/components/pages/ProjectsPage';
import ProjectDetailPage from '@/components/pages/ProjectDetailPage';
import StoryPage from '@/components/pages/StoryPage';
import WorkPage from '@/components/pages/WorkPage';
import EducationPage from '@/components/pages/EducationPage';
import TravelPage from '@/components/pages/TravelPage';
import MusicPage from '@/components/pages/MusicPage';
import MoviesPage from '@/components/pages/MoviesPage';
import RouteGradePage from '@/components/pages/RouteGradePage';

function Layout() {
  return (
    <div className="grain">
      <ScrollToTop />
      <Outlet />
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'projects', element: <ProjectsPage /> },
      { path: 'projects/:id', element: <ProjectDetailPage /> },
      { path: 'story', element: <StoryPage /> },
      { path: 'work', element: <WorkPage /> },
      { path: 'education', element: <EducationPage /> },
      { path: 'travel', element: <TravelPage /> },
      { path: 'routegrade', element: <RouteGradePage /> },
      { path: 'music', element: <MusicPage /> },
      { path: 'movies', element: <MoviesPage /> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
