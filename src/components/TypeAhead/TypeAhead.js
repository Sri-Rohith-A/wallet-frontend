import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import styles from './TypeAhead.module.scss';
import { TEXT } from '../../constants/app-constants';
import { PageConstants } from '../../constants/page-constants';
/**
 * @decription A reusable typeahead component with a customizable input field.
 * @version 1.0.0
 * @param {Array} options
 * @param {string} query
 * @param {Function} setQuery
 * @author [Battepati Lokesh Reddy]
 */
const TypeAhead = ({ options, query, setQuery, register }) => {
  const [isActive, setIsActive] = useState(false);
  /**
   * @decription Callback function to handle the input value and set to the query whenever it changes.
   * Handler function for when the user types in the search bar
   * @param {string} query
   */
  const handleChange = (query) => {
    setQuery(query);
  };

  /**
   * @decription Callback function to handle the searchTerm after selecting the option.
   * OnSearch function for when the user clicks on a dropdown option to select the option
   *@param {string} searchTerm
   */
  const onSearch = (searchTerm) => {
    setQuery(searchTerm);
    setIsActive(false);
  };
  return (
    <div>
      <div data-testid='dropdown' className={styles['search-container']}>
        <div className={styles['search-inner']}>
          <input
            type={TEXT}
            value={query}
            {...register}
            onChange={(e) => handleChange(e.target.value)}
            onClick={(e) => setIsActive(!isActive)}
            autoComplete='off'
          />
        </div>
        {isActive && (
          <div className={styles['dropdown']}>
            {options.length ? (
              options.map((user, index) => (
                <div
                  onClick={() => onSearch(`${user}`)}
                  className={styles['dropdown-row']}
                  key={index}
                >
                  {`${user}`}
                </div>
              ))
            ) : query.length > 2 ? (
              <div>{PageConstants.ADD_MONEY_PAGE.NO_DATA_MESSAGE}</div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};
TypeAhead.propTypes = {
  options: PropTypes.array,
  query: PropTypes.string,
  setQuery: PropTypes.func,
  register: PropTypes.object,
};
export default TypeAhead;
