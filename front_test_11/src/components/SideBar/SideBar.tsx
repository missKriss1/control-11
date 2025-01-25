import {  useAppSelector } from '../../app/hooks.ts';
import { selectCategory, selectCategoryLoad } from '../../features/categories/CategorySlice.ts';
import { NavLink } from "react-router-dom";
import Category from "../../features/categories/Category.tsx";
import Spinner from '../Spinner/Spinner.tsx';

const SideBar = () => {
  const categories = useAppSelector(selectCategory);
  const loading = useAppSelector(selectCategoryLoad);
  return (
    <>
      {loading ? (
        <Spinner/>
      ): (
        <div className="sidebar bg-light p-4 shadow-sm rounded">
          <h5 className="text-center mb-3">Категории</h5>
          <ul className="list-group">
            {categories.length > 0 ? (
              <>
                <li className="list-group-item">
                  <NavLink to={`/`} className="text-decoration-none text-dark">
                    Все категории
                  </NavLink>
                </li>
                {categories.map((category) => (
                  <Category key={category._id} category={category}/>
                ))}
              </>
            ) : (
              <p className="text-muted text-center">Категории отсутствуют</p>
            )}
          </ul>
        </div>
      )}
    </>

  );
};

export default SideBar;
