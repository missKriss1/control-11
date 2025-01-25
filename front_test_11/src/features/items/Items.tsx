
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectItem, selectLoadItem } from './ItemSlice.ts';
import { useEffect } from 'react';
import { fetchItems } from './ItemThunk.ts';
import { IItem } from '../../types';
import Item from './Item.tsx';
import Spinner from '../../components/Spinner/Spinner.tsx';

const Items = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectItem);
  const loading = useAppSelector(selectLoadItem);

  useEffect(() => {
    dispatch(fetchItems())
  }, [dispatch]);
  return (
    <div>
      {loading ? (
        <Spinner/>
      ): (
        <div className="d-flex flex-column align-items-center mt-5">
          <>
            {items.map((item: IItem) => (
              <Item item={item} key={item._id}/>
            ))}
          </>
        </div>
      )}
    </div>
  );
};

export default Items;