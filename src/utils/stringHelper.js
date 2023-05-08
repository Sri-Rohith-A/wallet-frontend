import React from 'react';

/**
 * @description functions to modify strings
 * @version 1.0.0
 * @author [Sai Kishore]
 */
export const StringHelper = {
  capitalize: (word) => {
    return word.toUpperCase();
  },
  capitalizeFirstLetter: (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  },
  boldDoubleQuotes: (sentence) => {
    const regex = /"([^"]+)"/g;
    const doubleQuote = sentence.match(regex) || [];
    const boldWord = doubleQuote ? doubleQuote.map((match) => match.replace(/"/g, '')) : [];
    const parts = sentence.split(regex);
    return (
      <>
        {parts.map((part, index) => {
          if (boldWord.includes(part)) {
            return <strong key={index}>&quot;{part}&quot;</strong>;
          } else {
            return part;
          }
        })}
      </>
    );
  },
  toLower: (word) => {
    return word.toLowerCase();
  },
};
