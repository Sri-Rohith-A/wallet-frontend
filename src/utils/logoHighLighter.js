/**
 * @description this function is to split the logo text into normal and highlighted text
 * @version 1.0.0
 * @author [Abdul Adhil]
 * @param text
 * @return [normalText, highLightedText]
 */

const highLighter = (text) => {
  const normalText = text.slice(0, -2);
  const highLightedText = text.slice(-2);

  return [normalText, highLightedText];
};

export default highLighter;
