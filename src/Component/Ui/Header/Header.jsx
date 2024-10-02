import React, { useState } from "react";
import "./Header.css";
import { VscClearAll } from "react-icons/vsc";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { MdOutlineArrowDropUp } from "react-icons/md";
const Header = ({ grouping, ordering, onGroupingChange, onOrderingChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="container">
      <div className="dropdown-container">
        <div className="dropdown-header" onClick={toggleDropdown}>
          <VscClearAll className="grid-icon" />
          <span className="label-name">Display</span>
          {isOpen ? (
            <MdOutlineArrowDropDown className="arrow-icon" />
          ) : (
            <MdOutlineArrowDropUp className="arrow-icon" />
          )}
        </div>

        {isOpen && (
          <div className="dropdown-menu">
            <div className="dropdown-group">
              <label className="label-name-dropdown">Grouping</label>
              <select value={grouping} onChange={onGroupingChange}>
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>
            <div className="dropdown-order">
              <label className="label-name-dropdown">Ordering</label>
              <select value={ordering} onChange={onOrderingChange}>
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
