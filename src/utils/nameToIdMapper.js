/**
 * @description this function is to map the name to id
 * @version 1.0.0
 * @author [Joel]
 * @return ID
 */
export const nameToIdMapper = (name, namesObject, keyName) => () => {
  return namesObject.find((element) => element[keyName] == name);
};
