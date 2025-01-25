import { NavLink } from "react-router-dom";
import UserMenu from "./UserMenu.tsx";
import AnonymousMenu from "./AnonymousMenu.tsx";
import { useAppSelector } from '../../app/hooks.ts';
import { selectUser } from '../../features/users/userSlice.ts';

const ToolBar = () => {
  const user = useAppSelector(selectUser);

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-primary">
        <div className="container w-75">
          <NavLink to="/">
            <span className="navbar-brand nav-title my-2 pb-2 d-inline-block text-white fs-1">
              Market
            </span>
          </NavLink>
          <div className="ms-auto">
            <ul className="navbar-nav">
              {user ? <UserMenu username={user.username} /> : <AnonymousMenu />}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default ToolBar;
