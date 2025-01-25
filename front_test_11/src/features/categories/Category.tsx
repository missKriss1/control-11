import { ICategory } from '../../types';
import React from 'react';
import { NavLink } from 'react-router-dom';

interface Props{
  category: ICategory
}
const Category: React.FC <Props> = ({category}) => {
  return (
    <li className="list-group-item">
      <NavLink to={`?category=${category._id}`} className="text-decoration-none text-dark">
        {category.title}
      </NavLink>
    </li>
  );
};

export default Category;