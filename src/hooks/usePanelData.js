import { useState, useEffect, useCallback } from "react";

const usePanelData = () => {
  // Initial categories
  const [categories] = useState([
    { id: 1, name: "Избранное" },
    { id: 2, name: "Мировые новости" },
    { id: 3, name: "Обсуждения" },
    { id: 4, name: "New Items" },
  ]);

  // Items state
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("panelItems");
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            categoryId: 1,
            title: "Гугл",
            description: "google.com",
            url: "https://google.com",
            icon: "👀",
          },
          {
            id: 2,
            categoryId: 1,
            title: "Яндекс",
            description: "yandex.ru",
            url: "https://yandex.ru",
            icon: "🔍",
          },
          {
            id: 3,
            categoryId: 2,
            title: "Иносми",
            description: "inoshmi.ru",
            url: "https://inosmi.ru",
            icon: "🌍",
          },
          {
            id: 4,
            categoryId: 2,
            title: "СтранаUA",
            description: "strana.ua",
            url: "https://strana.today",
            icon: "🇺🇦",
          },
          {
            id: 5,
            categoryId: 3,
            title: "MyAll Chat",
            description: "Misha, Sasha & Alex",
            url: "https://www.facebook.com/messages/t/8699950900038782/",
            icon: "✋",
          },
          {
            id: 6,
            categoryId: 1,
            title: "Chrome Extensions",
            description: "extensions.chrome.com",
            url: "chrome://extensions/",
            icon: "🖥️",
          },
          {
            id: 7,
            categoryId: 3,
            title: "Вопросы (Google Docs)",
            description: "docs.google.com",
            url: "https://docs.google.com/document/d/1PH2g2U36aE7-ddFed7iCIhMJuWVgkCg_NuDcsVU24Fg/edit?usp=sharing",
            icon: "💾",
          },
        ];
  });

  // Save to localStorage when items change
  useEffect(() => {
    localStorage.setItem("panelItems", JSON.stringify(items));
  }, [items]);

  // UI state
  const [selectedItem, setSelectedItem] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState([1]);

  // Methods to manipulate data
  const addItem = (item) => {
    const nextId = Date.now();
    const newItem = { ...item, id: nextId };

    setItems((prev) => [...prev, newItem]);
    // Use the newItem directly instead of searching through items
    if (
      newItem.categoryId &&
      !expandedCategories.includes(newItem.categoryId)
    ) {
      setExpandedCategories((prev) => [...prev, newItem.categoryId]);
    }
    setSelectedItem(nextId);
  };

  const removeItem = (itemId) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const moveItem = (itemId, newCategoryId) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, categoryId: newCategoryId } : item
      )
    );
  };

  const toggleCategory = (categoryId) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const selectItem = useCallback(
    (itemId) => {
      // Find the item and its category
      const item = items.find((item) => item.id === itemId);
      console.log(`==== selectItem(${itemId}): item:${item}`);
      if (item) {
        // Ensure category is expanded
        if (!expandedCategories.includes(item.categoryId)) {
          setExpandedCategories((prev) => [...prev, item.categoryId]);
        }
        // Set selected item
        setSelectedItem(itemId);
      }
    },
    [items, expandedCategories]
  );

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }

    const newCategoryId = parseInt(destination.droppableId.split("-")[1]);
    const itemId = parseInt(draggableId.split("item-")[1]);

    moveItem(itemId, newCategoryId);
  };

  return {
    // Data
    categories,
    items,
    selectedItem,
    expandedCategories,

    // Methods
    addItem,
    removeItem,
    moveItem,
    toggleCategory,
    selectItem,
    handleDragEnd,
  };
};

export default usePanelData;
