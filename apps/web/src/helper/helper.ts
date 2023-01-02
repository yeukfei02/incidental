export const getRootUrl = () => {
  const rootUrl =
    process.env.NODE_ENV && process.env.NODE_ENV !== 'production'
      ? `http://localhost:3333/api`
      : ``;
  return rootUrl;
};
