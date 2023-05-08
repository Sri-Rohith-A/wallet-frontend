import { NavLink } from 'react-router-dom';
import styles from './Menu.module.scss';
import { ProtectedRouteConstants } from '../../constants/route-constants';
/**
 * @description function to return the sidebar navigation link
 * @version 1.0.0
 * @author [Sai Kishore]
 * @returns Menu
 */

const Menu = () => {
  return (
    <ul className={styles['menu']}>
      {ProtectedRouteConstants.map((value, index) => {
        return (
          <li key={index} className={styles['list']}>
            <NavLink
              to={value.path}
              className={({ isActive }) => (isActive ? styles['active-link'] : styles['link'])}
            >
              <div></div>
              {value.routeName}
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
};
export default Menu;
