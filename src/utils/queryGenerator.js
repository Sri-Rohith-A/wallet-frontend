const queryGenerator = (data) => {
  let query = '';
  Object.entries(data).forEach(([key, value]) => {
    query += `${key}=${value}&`;
  });
  return query;
};
export default queryGenerator;
