import React, { useEffect, useRef } from "react";
import { Draggable } from "react-beautiful-dnd";
import { motion } from "framer-motion";
import "./ListItem.css";
import PropTypes from "prop-types";

const ListItem = ({ item, index, isSelected, onClick }) => {
  const itemRef = useRef(null);

  useEffect(() => {
    if (isSelected && itemRef.current) {
      itemRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [isSelected]);

  return (
    <Draggable draggableId={`item-${item.id}`} index={index}>
      {(provided, snapshot) => (
        <motion.div
          ref={(el) => {
            itemRef.current = el;
            provided.innerRef(el);
          }}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`list-item ${isSelected ? "selected" : ""} ${
            snapshot.isDragging ? "dragging" : ""
          }`}
          onClick={() => onClick(item)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          <div className="item-icon">{item.icon}</div>
          <div className="item-content">
            <h3 className="item-title">{item.title}</h3>
            {item.description && (
              <p className="item-description">{item.description}</p>
            )}
          </div>
          {isSelected && <div className="selected-indicator" />}
        </motion.div>
      )}
    </Draggable>
  );
};

ListItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    icon: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
  isSelected: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

ListItem.defaultProps = {
  isSelected: false,
};

export default ListItem;
