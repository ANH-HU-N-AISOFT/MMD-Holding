export const getTotalPages = (totalRecords: number, recordsPerPage: number): number => {
  return Math.ceil(totalRecords / recordsPerPage);
};
