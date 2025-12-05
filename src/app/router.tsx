import AppLayout from './layout';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import { Home } from './Home';
import { About } from './About';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppLayout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="posts" element={<div>Posts page</div>} />
      <Route path="contact" element={<div>Contact page</div>} />
    </Route>,
  ),
);
