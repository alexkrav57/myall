export const mockItems = [
  {
    id: 1,
    title: "Test Item 1",
    description: "Description 1",
    categoryId: 1,
    icon: "📌",
  },
  {
    id: 2,
    title: "Test Item 2",
    description: "Description 2",
    categoryId: 1,
    icon: "📝",
  },
  // Add more test items...
];

export const mockCategories = [
  { id: 1, name: "Important" },
  { id: 2, name: "Personal" },
  // Add more test categories...
];

export const simulateDragAndDrop = async (source, destination) => {
  return {
    source,
    destination,
    type: "DEFAULT",
  };
};
