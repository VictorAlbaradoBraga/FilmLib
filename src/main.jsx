import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './layouts/App';
import Home from './pages/Home';
import Movie from './pages/Movie';
import Search from './pages/Search';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: "/", element: <Home/> },
      { path: "/movie/:id", element: <Movie/> },
      { path: "/search", element: <Search/> },

    ],
  },
  { path: '*', element: <div>Erro: Página não encontrada</div> },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
