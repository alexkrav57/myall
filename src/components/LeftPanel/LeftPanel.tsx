import React, { useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import CategoryGroup from "../CategoryGroup/CategoryGroup";
import ListItem from "../ListItem/ListItem";
import { usePanelData } from "../../hooks/usePanelData";
import "./LeftPanel.css";
import {
  openUrl,
  queryCurrentUrl,
  getSiteName,
  getSiteTitle,
} from "../../utils/chromeUtils";

interface Item {
  id: number;
  categoryId: number;
  title: string;
  description: string;
  url: string;
  icon: string;
}

interface Category {
  id: number;
  name: string;
}

const LeftPanel: React.FC = () => {
  const {
    categories,
    items,
    selectedItem,
    expandedCategories,
    toggleCategory,
    selectItem,
    handleDragEnd,
    addItem,
  } = usePanelData();

  const handleGrabUrl = async (): Promise<void> => {
    const url = await queryCurrentUrl();
    const title = await getSiteTitle(url);
    console.log("grabUrl", url);
    addItem({
      categoryId: 4,
      title: title,
      description: getSiteName(url),
      url: url,
      icon: "🆕",
    });
  };

  useEffect(() => {
    console.log("selectedItem", selectedItem);
    if (selectedItem) {
      const found = items.find((item) => item.id === selectedItem);
      if (found) {
        openUrl(found.url);
      } else {
        console.log("selectedItem not found");
      }
    }
  }, [selectedItem, items]);

  return (
    <div className="left-panel">
      <div className="panel-header">
        <img
          src="icons/myall16.png"
          alt="MyAll"
          style={{ width: "48px", height: "24px", paddingRight: "8px" }}
        />
        <h2>MyAll</h2>
        <div className="grab-button-area">
          <button className="grab-url-button" onClick={handleGrabUrl}>
            Grab url
          </button>
        </div>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="categories-container">
          {categories.map((category: Category) => {
            const categoryItems = items
              .filter((item: Item) => item.categoryId === category.id)
              .map((item: Item, index: number) => (
                <ListItem
                  key={item.id}
                  item={item}
                  index={index}
                  isSelected={selectedItem === item.id}
                  onClick={() => selectItem(item.id)}
                />
              ));

            return (
              <CategoryGroup
                key={category.id}
                category={category}
                items={categoryItems}
                isExpanded={expandedCategories.includes(category.id)}
                onToggle={toggleCategory}
              />
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
};

export default LeftPanel;
