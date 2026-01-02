const getExcerpt = (text, limit = 30) => {
  if (!text) return "";
  return text.length > limit ? text.slice(0, limit) + "..." : text;
};

export default getExcerpt;
