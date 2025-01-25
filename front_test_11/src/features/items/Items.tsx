
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectItem } from './ItemSlice.ts';
import { useEffect } from 'react';
import { fetchItems } from './ItemThunk.ts';
import { IItem } from '../../types';
import Item from './Item.tsx';

const Items = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectItem);

  useEffect(() => {
    dispatch(fetchItems())
  }, [dispatch]);
  return (
    <div>
      <div className="d-flex flex-column align-items-center mt-5">
        <>
          {items.map((item: IItem) => (
            <Item item={item} key={item._id}/>
          ))}
        </>
      </div>
    </div>
  );
};

export default Items;