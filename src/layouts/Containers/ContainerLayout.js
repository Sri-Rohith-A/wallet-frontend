import style from 'layouts/Containers/ContainerLayout.module.scss';

/**
 * @description this component gives a padding required for a container
 * @version 1.0.0
 * @author [Rakhesh Bowtham]
 */

const ContainerLayout = ({ children }) => {
  return <div className={style['container-layout']}>{children}</div>;
};

export default ContainerLayout;
