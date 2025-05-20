export const buildImageUrl = (url: string) => {
  return `${import.meta.env.WEB_URL}/images/${url}`;
};
