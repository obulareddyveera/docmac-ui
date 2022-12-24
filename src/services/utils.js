export const generateKeyEntity = (name = "", index = 0) => {
  return `${name}_${index}_${new Date().getTime()}_${Math.random()}`;
};
