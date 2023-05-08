import React, { useState } from 'react';
import style from './OverlayModal.module.scss';
import { PropTypes } from 'prop-types';
/**
 * @description function to return a generic Overlay modal, which will display any children component passed to it.
 * @version 1.0.0
 * @author [Hariboobaalan]
 * @param { onClose, children, title }
 * @returns Overlay Modal
 */
export const OverlayModal = ({ onClose, children, title }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };
  return (
    <div className={style['modal-overlay']}>
      <div className={style['modal-content']}>
        <div className={style['header-section']}>
          <h2 className={style['heading']}>{title}</h2>
          <button className={style['modal-close']} onClick={handleClose}>
            X
          </button>
        </div>
        <div className={style['modal-main-section']}>{children}</div>
      </div>
    </div>
  );
};
OverlayModal.propTypes = {
  onClose: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  title: PropTypes.string,
};
