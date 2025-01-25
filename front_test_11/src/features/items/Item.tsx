import { Link } from "react-router-dom";
import React from "react";
import { apiUrl } from "../../globalConstants.ts";
import { IItem } from '../../types';

interface Props {
  item: IItem;
}

const Item: React.FC<Props> = ({ item }) => {
  return (
    <div
      className="w-75 p-3 mb-4 row d-flex shadow rounded border-0"
      style={{ maxWidth: "700px" }}
    >
      <div
        className={
          item.image
            ? "col-sm-12 col-md-6 col-lg-6 col-xl-6"
            : "col-sm-12 col-md-6 col-lg-6 col-xl-6 d-flex align-items-center justify-content-center text-primary"
        }
        style={{ minWidth: "200px" }}
      >
        {item.image ? (
          <img
            src={item.image ? `${apiUrl}/${item.image}` : undefined}
            alt={item.title}
            className="w-100 h-auto mb-3 rounded col-6"
            style={{ maxWidth: "300px" }}
          />
        ) : (
          <i className="bi bi-chat-left-text-fill fs-1 text-primary"></i>
        )}
      </div>
      <div
        className={"col-sm-12 col-md-6 col-lg-6 col-xl-6 d-flex flex-column"}
      >
        <h5 className="fw-semibold my-auto fs-3 fs-sm-6 mb-4">
          {item.title}
        </h5>

        <span className={"mb-2 d-inline-block fs-4 fw-bold"}>
          {item.price}
        </span>

        <div className="mt-auto mb-3">
          <Link to={`/items/${item._id}`} className="btn btn-primary">
            <i className="bi bi-arrow-right-circle me-2"></i> Просмотреть товар
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Item;
