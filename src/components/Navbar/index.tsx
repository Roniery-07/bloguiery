import { Link } from 'react-router-dom';
import { ArrowRight, Moon } from 'lucide-react';
import { Button } from '../Button';

export const Navbar = () => {
  return (
    <div className="p-2 w-full min-h-12 max-h-12 fixed top-0 flex ">
      <div className="m-auto flex justify-center items-center-safe gap-32 ">
        <h1 className="text-xl">
          <Link to="/" className="text-text!">
            bloguiery
          </Link>
        </h1>
        <ul className="list-none flex gap-8">
          <li>
            <Link
              to="/about"
              className="group flex items-center gap-1 text-text! transition-all duration-300 hover:translate-x-2"
            >
              <span className="opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                <ArrowRight size={15} />
              </span>
              <span>about</span>
            </Link>
          </li>
          <li>
            <Link
              to="/posts"
              className="group flex items-center gap-1 text-text! transition-all duration-300 hover:translate-x-2"
            >
              <span className="opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                <ArrowRight size={15} />
              </span>
              <span>posts</span>
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="group flex items-center gap-1 text-text! transition-all duration-300 hover:translate-x-2"
            >
              <span className="opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                <ArrowRight size={15} />
              </span>
              <span>contact</span>
            </Link>
          </li>
        </ul>
        <Button>
          <Moon className="size-4" />
        </Button>
      </div>
    </div>
  );
};
