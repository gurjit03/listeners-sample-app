const BASEPATH = 'http://localhost:3000/api';

export const createCustomAPIPath = (additionalPath) => {
  return BASEPATH +'/' + additionalPath;
};
