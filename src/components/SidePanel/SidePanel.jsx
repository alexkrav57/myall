import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import CategoryGroup from "../CategoryGroup/CategoryGroup";
import ListItem from "../ListItem/ListItem";

const SidePanel = () => {
  const [categories] = useState([
    { id: 1, name: "Important" },
    { id: 2, name: "Reading List" },
  ]);

  const [items, setItems] = useState([
    {
      id: 1,
      categoryId: 1,
      title: "First Item",
      description: "This is a description",
      icon: "📌",
    },
    {
      id: 2,
      categoryId: 1,
      title: "Second Item",
      description: "Another description",
      icon: "📝",
    },
  ]);

  const [selectedItem, setSelectedItem] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState([1]);

  const handleItemClick = (item) => {
    setSelectedItem(item.id);
  };

  const handleToggle = (categoryId) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    const newCategoryId = parseInt(destination.droppableId.split("-")[1]);
    const itemId = parseInt(draggableId.split("-")[1]);

    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, categoryId: newCategoryId } : item
      )
    );
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="side-panel">
        {categories.map((category) => {
          const categoryItems = items
            .filter((item) => item.categoryId === category.id)
            .map((item, index) => (
              <ListItem
                key={item.id}
                item={item}
                index={index}
                isSelected={selectedItem === item.id}
                onClick={handleItemClick}
              />
            ));

          return (
            <CategoryGroup
              key={category.id}
              category={category}
              items={categoryItems}
              isExpanded={expandedCategories.includes(category.id)}
              onToggle={handleToggle}
            />
          );
        })}
      </div>
    </DragDropContext>
  );
};

export default SidePanel;
