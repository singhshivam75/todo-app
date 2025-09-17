export const getPagination = (page, limit) => {
  const pageNumber = Math.max(1, parseInt(page) || 1);
  const pageSize = Math.max(1, parseInt(limit) || 10);
  const offset = (pageNumber - 1) * pageSize;

  return { limit: pageSize, offset, pageNumber, pageSize };
};

export const getPagingData = ( data, pageNumber, pageSize) => {
  const { count: totalItems, rows: tasks } = data;
  const totalPages = Math.ceil(totalItems / pageSize);

  return {
    currentPage: pageNumber,
    totalPages,
    totalTasks: totalItems,
    tasks,
  }
}