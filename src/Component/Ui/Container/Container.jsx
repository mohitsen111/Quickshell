import React from "react";
import "./Container.css";
import Card from "../../Card/Card";
import ColumnHeading from "../../ColumnHeading/ColumnHeading";

const Container = ({ heading, data, iconSrc }) => {
  return (
    <div className="kanban-container">
      <ColumnHeading icon={iconSrc} status={heading} />
      <div className="kanban-container__cards scrollbar">
        {data.map((item) => (
          <Card
            key={item.id}
            taskId={item.id}
            title={item.title}
            tag={item.tag.join(" ")}
            priority={item.priority}
            userId={item.userId}
          />
        ))}
      </div>
    </div>
  );
};

export default Container;
