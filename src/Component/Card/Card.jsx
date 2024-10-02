import React from "react";
import "./Card.css";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaCircle } from "react-icons/fa";

const Card = ({ taskId, title, tag, priority, userId }) => {
  const priorityColors = ["#61bd4f", "#f2d600", "#ff9f1a", "#eb5a46"];

  return (
    <div className="kanban-card">
      <div className="kanban-card__header">
        <span className="kanban-card__id">{taskId}</span>
        <FaRegCircleUser className="kanban-card__user-icon" />
      </div>
      <h3 className="kanban-card__title">{title}</h3>
      <div className="kanban-card__footer">
        <span
          className="kanban-card__priority"
          style={{ backgroundColor: priorityColors[priority - 1] }}
        ></span>
        <span className="kanban-card__tag">
          <FaCircle className="kanban-card__tag-icon" />
          {tag}
        </span>
      </div>
    </div>
  );
};

export default Card;
