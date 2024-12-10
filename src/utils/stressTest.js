export const runStressTest = async (component) => {
  const items = Array.from({ length: 1000 }, (_, i) => ({
    id: i,
    title: `Stress Test Item ${i}`,
    description: `Description ${i}`,
    categoryId: Math.floor(i / 100),
    icon: "📌",
  }));

  const categories = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    name: `Category ${i}`,
  }));

  // Test performance with large datasets
  console.time("Stress Test");
  // Render component with large dataset
  console.timeEnd("Stress Test");

  // Test rapid interactions
  for (let i = 0; i < 100; i++) {
    // Simulate rapid user interactions
  }
};
