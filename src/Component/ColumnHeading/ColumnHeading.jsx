import React from "react";
import "./ColumnHeading.css";
import { FaUserCircle } from "react-icons/fa";

const ColumnHeading = ({ icon, status }) => {
  return (
    <div className="kanban-column-heading">
      <div className="kanban-column-heading__left">
        {icon ? (
          <img
            src={`./icons/${icon}`}
            alt={status}
            className="kanban-column-heading__icon"
          />
        ) : (
          <FaUserCircle />
        )}
        <h2 className="kanban-column-heading__title">{status}</h2>
      </div>
      <div className="kanban-column-heading__right">
        <button className="kanban-column-heading__button">+</button>
        <button className="kanban-column-heading__button">···</button>
      </div>
    </div>
  );
};

export default ColumnHeading;
