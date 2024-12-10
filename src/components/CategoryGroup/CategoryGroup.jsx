import React from "react";
import PropTypes from "prop-types";
import { Droppable } from "react-beautiful-dnd";
import { motion, AnimatePresence } from "framer-motion";
import "./CategoryGroup.css";

const CategoryGroup = ({ category, items, isExpanded, onToggle }) => {
  return (
    <div className="category-group">
      <motion.div
        className="category-header"
        onClick={() => onToggle(category.id)}
        whileTap={{ scale: 0.9 }}
      >
        <span className={`expand-icon ${isExpanded ? "expanded" : ""}`}>▶</span>
        <h3>{category.name}</h3>
        <span className="item-count">{items.length}</span>
      </motion.div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Droppable droppableId={`category-${category.id}`}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`category-items ${
                    snapshot.isDraggingOver ? "dragging-over" : ""
                  }`}
                >
                  {items}
                  {items.length === 0 && (
                    <div className="empty-category">Drop items here</div>
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

CategoryGroup.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  items: PropTypes.arrayOf(PropTypes.node).isRequired,
  isExpanded: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default CategoryGroup;
