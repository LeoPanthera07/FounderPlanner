import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { AppShell } from '../layout/AppShell';
import { YearPage }    from '../../features/year/YearPage';
import { MonthPage }   from '../../features/month/MonthPage';
import { WeekPage }    from '../../features/week/WeekPage';
import { DayPage }     from '../../features/day/DayPage';
import { HabitsPage }  from '../../features/habits/HabitsPage';
import { MetricsPage } from '../../features/metrics/MetricsPage';
import { ReviewsPage } from '../../features/reviews/ReviewsPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true,      element: <Navigate to="/day" replace /> },
      { path: 'year',     element: <YearPage />    },
      { path: 'month',    element: <MonthPage />   },
      { path: 'week',     element: <WeekPage />    },
      { path: 'day',      element: <DayPage />     },
      { path: 'habits',   element: <HabitsPage />  },
      { path: 'metrics',  element: <MetricsPage /> },
      { path: 'reviews',  element: <ReviewsPage /> },
    ],
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;
