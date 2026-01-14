import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import HomePage from '@/components/pages/HomePage';
import ProjectsPage from '@/components/pages/ProjectsPage';
import ProjectDetailPage from '@/components/pages/ProjectDetailPage';
import StoryPage from '@/components/pages/StoryPage';
import WorkPage from '@/components/pages/WorkPage';
import EducationPage from '@/components/pages/EducationPage';
import TravelPage from '@/components/pages/TravelPage';
import ActivitiesPage from '@/components/pages/ActivitiesPage';
import MusicPage from '@/components/pages/MusicPage';
import MoviesPage from '@/components/pages/MoviesPage';
import BlogPage from '@/components/pages/BlogPage';
import BookPage from '@/components/pages/BookPage';

// Layout component that includes ScrollToTop
function Layout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
        routeMetadata: {
          pageIdentifier: 'home',
        },
      },
      {
        path: "projects",
        element: <ProjectsPage />,
        routeMetadata: {
          pageIdentifier: 'projects',
        },
      },
      {
        path: "projects/:id",
        element: <ProjectDetailPage />,
        routeMetadata: {
          pageIdentifier: 'project-detail',
        },
      },
      {
        path: "story",
        element: <StoryPage />,
        routeMetadata: {
          pageIdentifier: 'story',
        },
      },
      {
        path: "work",
        element: <WorkPage />,
        routeMetadata: {
          pageIdentifier: 'work',
        },
      },
      {
        path: "education",
        element: <EducationPage />,
        routeMetadata: {
          pageIdentifier: 'education',
        },
      },
      {
        path: "travel",
        element: <TravelPage />,
        routeMetadata: {
          pageIdentifier: 'travel',
        },
      },
      {
        path: "activities",
        element: <ActivitiesPage />,
        routeMetadata: {
          pageIdentifier: 'activities',
        },
      },
      {
        path: "music",
        element: <MusicPage />,
        routeMetadata: {
          pageIdentifier: 'music',
        },
      },
      {
        path: "movies",
        element: <MoviesPage />,
        routeMetadata: {
          pageIdentifier: 'movies',
        },
      },
      {
        path: "blog",
        element: <BlogPage />,
        routeMetadata: {
          pageIdentifier: 'blog',
        },
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
