import { AppConstants, FOR, TO } from 'constants/app-constants';
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
  capitalizeFirstLettersInText: (string) => {
    let words = string?.split(' ');
    words = words.map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });
    return words.join(' ');
  },
  toSnakeCase: (sentence) => {
    const words = sentence?.split(' ');
    const lowerCaseWords = words.map((word) => word.toLowerCase());
    const snakeCaseSentence = lowerCaseWords.join('_');
    return snakeCaseSentence;
  },
  toKebabCase: (sentence) => {
    const words = sentence?.split(' ');
    const lowerCaseWords = words.map((word) => word.toLowerCase());
    const kebabCaseSentence = lowerCaseWords.join('-');
    return kebabCaseSentence;
  },
  reportFilter: (duration, fromDate, toDate, location) => {
    return (
      <>
        {`${AppConstants.REPORTS_PAGE.REPORT_FILTER_MESSAGE}`}
        <strong> {duration}</strong>
        {` (${fromDate} ${TO} ${toDate}) ${FOR} `}
        <strong>{location}</strong>
      </>
    );
  },
  hyphenToCapital: (str) => {
    return str
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  },
};
