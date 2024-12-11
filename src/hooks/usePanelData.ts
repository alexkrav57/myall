import { useState, useCallback, useEffect } from "react";
import { model, Item, Category } from "../model/model";

export const usePanelData = () => {
  const [items, setItems] = useState<Item[]>(model.getItems());
  const [categories] = useState<Category[]>(model.getCategories());
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<number[]>([1]);

  useEffect(() => {
    const unsubscribe = model.subscribe(() => {
      setItems(model.getItems());
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const addItem = useCallback((item: Omit<Item, "id">) => {
    const newItem = model.addItem(item);
    setTimeout(() => selectItem(newItem.id), 100);
  }, []);

  const selectItem = useCallback((itemId: number) => {
    setSelectedItem(itemId);
  }, []);

  const removeItem = useCallback(
    (itemId: number) => {
      model.removeItem(itemId);
      if (selectedItem === itemId) {
        setSelectedItem(null);
      }
    },
    [selectedItem]
  );

  const toggleCategory = useCallback((categoryId: number) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  }, []);

  const handleDragEnd = useCallback((result: any) => {
    if (!result.destination) return;

    const newCategoryId = parseInt(
      result.destination.droppableId.split("-")[1]
    );
    const itemId = parseInt(result.draggableId.split("item-")[1]);

    model.moveItem(itemId, newCategoryId);
  }, []);

  return {
    categories,
    items,
    selectedItem,
    expandedCategories,
    addItem,
    selectItem,
    removeItem,
    toggleCategory,
    handleDragEnd,
  };
};

export default usePanelData;
