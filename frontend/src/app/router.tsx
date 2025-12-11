import AppLayout from './layout';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import { Home } from './Home';
import { About } from './About';
import { Posts } from './Posts';
import { PostLayout } from './Posts/PostLayout';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppLayout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="posts" element={<Posts />} />
      <Route path="posts/:slug" element={<PostLayout />} />
      <Route path="contact" element={<div>Contact page</div>} />
    </Route>,
  ),
);
