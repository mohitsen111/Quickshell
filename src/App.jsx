import React, { useEffect, useState } from "react";
import Header from "./Component/Ui/Header/Header";
import "./App.css";
import Container from "./Component/Ui/Container/Container";

function App() {
  const [data, setData] = useState({});
  const [formatedData, setFormatedData] = useState({});
  const [grouping, setGrouping] = useState("status");
  const [ordering, setOrdering] = useState("priority");

  const fetchData = async () => {
    try {
      const res = await fetch(
        "https://api.quicksell.co/v1/internal/frontend-assignment"
      );
      const fetchedData = await res.json();
      setData(fetchedData);
      formatTicketsForKanban(fetchedData.tickets);
    } catch (error) {
      console.error(error);
    }
  };

  const formatTicketsForKanban = (tickets) => {
    let groupedData = {};

    switch (grouping) {
      case "status":
        groupedData = groupByStatus(tickets);
        break;
      case "priority":
        groupedData = groupByPriority(tickets);
        break;
      case "user":
        groupedData = groupByUser(tickets);
        break;
      default:
        groupedData = groupByStatus(tickets);
    }

    for (let key in groupedData) {
      groupedData[key].data = orderTickets(groupedData[key].data);
    }
    setFormatedData(groupedData);
  };

  const groupByStatus = (tickets) => {
    const statusGroups = {
      Backlog: { title: "Backlog", icon: "Backlog.svg", data: [] },
      Todo: { title: "To Do", icon: "To-do.svg", data: [] },
      "In progress": {
        title: "In Progress",
        icon: "in-progress.svg",
        data: [],
      },
      Done: { title: "Done", icon: "Done.svg", data: [] },
      Canceled: { title: "Canceled", icon: "Cancelled.svg", data: [] },
    };

    tickets.forEach((ticket) => {
      if (statusGroups[ticket.status]) {
        statusGroups[ticket.status].data.push(ticket);
      }
    });

    return statusGroups;
  };

  const groupByPriority = (tickets) => {
    const priorityGroups = {
      4: { title: "Urgent", icon: "SVG - Urgent Priority grey.svg", data: [] },
      3: { title: "High", icon: "Img - High Priority.svg", data: [] },
      2: { title: "Medium", icon: "Img - Medium Priority.svg", data: [] },
      1: { title: "Low", icon: "Img - Low Priority.svg", data: [] },
      0: { title: "No Priority", icon: "No-priority.svg", data: [] },
    };

    tickets.forEach((ticket) => {
      priorityGroups[ticket.priority].data.push(ticket);
    });

    return priorityGroups;
  };

  const groupByUser = (tickets) => {
    const userGroups = {};

    const sortedUsers = data.users.sort((a, b) => a.name.localeCompare(b.name));

    sortedUsers.forEach((user) => {
      userGroups[user.id] = { title: user.name, icon: "user.svg", data: [] };
    });

    tickets.forEach((ticket) => {
      if (userGroups[ticket.userId]) {
        userGroups[ticket.userId].data.push(ticket);
      }
    });

    return userGroups;
  };

  const orderTickets = (tickets) => {
    return tickets.sort((a, b) => {
      if (ordering === "priority") {
        return b.priority - a.priority;
      } else if (ordering === "title") {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  };

  const handleGroupingChange = (e) => {
    const newGrouping = e.target.value;
    setGrouping(newGrouping);
    localStorage.setItem("grouping", newGrouping);
  };

  const handleOrderingChange = (e) => {
    const newOrdering = e.target.value;
    setOrdering(newOrdering);
    localStorage.setItem("ordering", newOrdering);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data.tickets) {
      formatTicketsForKanban(data.tickets);
    }
  }, [grouping, ordering]);

  useEffect(() => {
    const storedGrouping = localStorage.getItem("grouping");
    const storedOrdering = localStorage.getItem("ordering");

    if (storedGrouping) {
      setGrouping(storedGrouping);
    }
    if (storedOrdering) {
      setOrdering(storedOrdering);
    }
  }, []);

  return (
    <div className="kanban">
      <Header
        grouping={grouping}
        ordering={ordering}
        onGroupingChange={handleGroupingChange}
        onOrderingChange={handleOrderingChange}
      />
      <div className="kanban-main-container scrollbar">
        <div className="kanban__board scrollbar">
          {Object.entries(formatedData).map(([column, cardList]) => (
            <Container
              key={column}
              heading={cardList.title}
              data={cardList.data}
              iconSrc={cardList.icon}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
