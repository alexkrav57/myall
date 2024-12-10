export const measurePerformance = (operation) => {
  const start = performance.now();
  return () => {
    const end = performance.now();
    console.log(`${operation} took ${end - start}ms`);
  };
};
