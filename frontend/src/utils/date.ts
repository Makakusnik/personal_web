export const formatDate = (date: Date | string | undefined) => {
  if (!date) return "";

  const dateObj = new Date(date);
  return dateObj.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
};
