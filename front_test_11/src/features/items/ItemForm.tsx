import { useEffect, useState } from 'react';
import ButtonLoading from '../../components/ButtonLoading/ButtonLoading.tsx';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectUser } from '../users/userSlice.ts';
import { useNavigate } from 'react-router-dom';
import { addError, addLoading } from './ItemSlice.ts';
import { IItemMutation } from '../../types';
import { addNewItem } from './ItemThunk.ts';
import FileInput from './FileInput.tsx';
import { selectCategory } from '../categories/CategorySlice.ts';
import { fetchAllCategories } from '../categories/CategoryThunk.ts';

const intialState = {
  category: '',
  title: '',
  description: '',
  image: null,
  price: 0,
}


const ItemForm = () => {
  const [itemForm , setItemForm] = useState<IItemMutation>({...intialState})
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser);
  const categories = useAppSelector(selectCategory);
  const navigate = useNavigate();
  const addErrorItem = useAppSelector(addError);
  const addLoadingItem = useAppSelector(addLoading);

  useEffect(() => {
    if (!user) navigate("/register");
    dispatch(fetchAllCategories());
  }, [navigate, user, dispatch]);

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!itemForm.title || !itemForm.description || !itemForm.price || !itemForm.category) {
      alert("Пожалуйста, поле.");
      return;
    }

    if (!itemForm.image) {
      alert("Пожалуйста, добавьте изображение товара.");
      return;
    }

    const formData = new FormData();

    formData.append('title', itemForm.title);
    formData.append('description', itemForm.description);
    formData.append('category', itemForm.category);
    formData.append('price', String(itemForm.price));

    if (itemForm.image) {
      formData.append('image', itemForm.image);
    }

    try {
      await dispatch(addNewItem(formData));
      setItemForm({ ... intialState });
      navigate("/");
    } catch (e) {
      console.error(e);
    }
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setItemForm((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  }

  const onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, files } = e.target;

    if (files) {
      setItemForm((prevState: IItemMutation) => ({
        ...prevState,
        [name]: files[0] || null,
      }));
    }
  };

  const getFieldError = (fieldName: string) => {
    try {
      return addErrorItem?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  return (
    <div>
      <div
        style={{maxWidth: "500px"}}
        className="container mt-5 bg-white p-4 shadow rounded"
      >
        <h3 className="text-center mb-5 mt-2">Добавить товар</h3>

        <form onSubmit={onFormSubmit}>
          <div className="mb-3">
            <input
              type="text"
              name="title"
              id="title"
              value={itemForm.title}
              onChange={onInputChange}
              className={`form-control ${getFieldError("title") ? "is-invalid" : ""}`}
            />
            <label htmlFor="title">Заголовок</label>
            {getFieldError("title") && (
              <div className="invalid-feedback">{getFieldError("title")}</div>
            )}
          </div>

          <div className="mb-3">
            <textarea
              name="description"
              id="description"
              value={itemForm.description}
              onChange={onInputChange}
              className={`form-control ${getFieldError("description") ? "is-invalid" : ""}`}
            />
            <label htmlFor="description">Описание</label>
            {getFieldError("description") && (
              <div className="invalid-feedback">
                {getFieldError("description")}
              </div>
            )}
          </div>

          <div className="mb-3">
            <input
              name="price"
              id="price"
              value={itemForm.price}
              onChange={onInputChange}
              min="0"
              className={`form-control ${getFieldError("price") ? "is-invalid" : ""}`}
            />
            <label htmlFor="price">Цена</label>
            {getFieldError("price") && (
              <div className="invalid-feedback">
                {getFieldError("price")}
              </div>
            )}
          </div>

          <div className="mb-3">
            <select
              name="category"
              id="category"
              value={itemForm.category}
              onChange={onInputChange}
              className={`form-control ${
                getFieldError('category') ? 'is-invalid' : ''
              }`}
            >
              <option value="" disabled>
                Выберите категорию
              </option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.title}
                </option>
              ))}
            </select>
            <label htmlFor="category">Категория</label>
            {getFieldError('category') && (
              <div className="invalid-feedback">
                {getFieldError('category')}
              </div>
            )}
          </div>


          <div className="mb-3">
            <FileInput
              id="image"
              name="image"
              label="Изображение"
              onGetFile={onFileChange}
              file={itemForm.image}
              className={`form-control ${getFieldError("image") ? "is-invalid" : ""}`}
            />

            {getFieldError("image") && (
              <div className="invalid-feedback">{getFieldError("image")}</div>
            )}
          </div>

          <div className="d-flex gap-3 justify-content-center mb-3">
            <ButtonLoading
              isLoading={addLoadingItem}
              isDisabled={addLoadingItem}
              text="Добавить товар"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ItemForm;