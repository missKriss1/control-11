import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectUser } from '../users/userSlice.ts';
import { selectOneItem } from './ItemSlice.ts';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchItemById } from './ItemThunk.ts';
import { apiUrl } from '../../globalConstants.ts';

const DetailedItem = () => {
  const user = useAppSelector(selectUser);
  const item = useAppSelector(selectOneItem);

  const dispatch = useAppDispatch();
  const {itemId} = useParams();

  useEffect(() => {
    if(itemId){
      dispatch(fetchItemById(itemId))

    }
  }, [dispatch, itemId]);

  console.log(item)

  return (
    <div className="container mt-5">
      <div className="my-5 shadow-lg rounded-lg bg-light">
        <div className="p-4 rounded-lg border-0">
          <div className="d-flex flex-column">
            <span className='text-center'>Продавец:
               <h3 className="text-center text-primary">{user?.displayName}</h3>
            </span>
            <hr className="my-4"/>
            <span className='text-center'>Номер телефона:
               <h5 className="fw-semibold fs-4 text-muted text-center mb-4">{user?.phone}</h5>
            </span>
            <div className="row d-flex mt-3">
              <div className="col-lg-6 col-md-12 d-flex align-items-center justify-content-center">
                {item?.image ? (
                  <img
                    src={`${apiUrl}/${item?.image}`}
                    alt={item?.title}
                    className="w-50 h-auto mb-4 rounded shadow-lg"
                  />
                ) : (
                  <div className="d-flex justify-content-center align-items-center w-100">
                    <i className="bi bi-image-alt fs-1 text-muted"></i>
                    <p className="text-muted fs-4 ms-3">Изображение отсутствует</p>
                  </div>
                )}
              </div>

              <div className="col-lg-6 col-md-12 d-flex flex-column">
                <h4 className="fw-bold fs-3 mb-3">{item?.title}</h4>
                <p className="flex-grow-1 text-muted mb-4">{item?.description}</p>
                <p className="text-secondary fw-semibold fs-5">
                  <strong>Категория:</strong> {item?.category.title}
                </p>
                <div className="mt-auto text-end">
                  <button className="btn btn-primary px-4 py-2">Купить</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

};

export default DetailedItem;