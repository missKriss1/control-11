import SideBar from '../../components/SideBar/SideBar.tsx';
import Items from '../../features/items/Items.tsx';
import { useAppDispatch } from '../../app/hooks.ts';
import { useEffect } from 'react';
import { fetchAllCategories } from '../../features/categories/CategoryThunk.ts';
import { useLocation } from 'react-router-dom';
import { fetchItemByCategory, fetchItems } from '../../features/items/ItemThunk.ts';

const Home = () => {
  const dispatch = useAppDispatch();
  const query = useLocation().search;

  useEffect(() => {
    const params = new URLSearchParams(query);
    const category = params.get('category');

    dispatch(fetchAllCategories());

    if (category) {
      dispatch(fetchItemByCategory(category));
    } else {
      dispatch(fetchItems());
    }
  }, [dispatch, query]);
  return (
    <div>
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-3">
            <SideBar/>
          </div>
          <div className="col-md-9">
            <Items/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;