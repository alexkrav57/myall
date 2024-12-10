export const validateItem = (item) => {
  if (!item) throw new Error("Item is required");
  if (!item.id) throw new Error("Item ID is required");
  if (!item.title) throw new Error("Item title is required");
  if (!item.categoryId) throw new Error("Category ID is required");
  return true;
};

export const validateCategory = (category) => {
  if (!category) throw new Error("Category is required");
  if (!category.id) throw new Error("Category ID is required");
  if (!category.name) throw new Error("Category name is required");
  return true;
};

export const validateDragDrop = (result) => {
  if (!result) throw new Error("Drag result is required");
  if (!result.source) throw new Error("Source is required");
  if (!result.destination) throw new Error("Destination is required");
  return true;
};
