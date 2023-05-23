import Button from 'components/Button/Button';
import { AppConstants } from 'constants/app-constants';
import style from './ConfirmationBox.module.scss';
import PropTypes from 'prop-types';
import { ConfirmationModal } from 'components/ConfirmationModal/ConfirmationMadal';
/**
 * @description this function will render the confirmation box
 * @version 1.0.0
 * @author [Sai Kishore]
 */
const ConfirmationBox = ({ title, desc, close, click }) => {
  return (
    <div className={style['confirmation-box']}>
      <ConfirmationModal onClose={close} title={title}>
        <p className={style['desc']}>{desc}</p>
        <Button
          color={AppConstants.BUTTON.COLOR.SECONDARY}
          size={AppConstants.BUTTON.SIZE.XS}
          border={AppConstants.BUTTON.SHAPE.ROUND}
          label={AppConstants.CONFIRMATION_BOX.NO_BUTTON}
          click={close}
        />
        <Button
          color={AppConstants.BUTTON.COLOR.PRIMARY}
          size={AppConstants.BUTTON.SIZE.XS}
          border={AppConstants.BUTTON.SHAPE.ROUND}
          label={AppConstants.CONFIRMATION_BOX.YES_BUTTON}
          click={click}
        />
      </ConfirmationModal>
    </div>
  );
};
ConfirmationBox.prototype = {
  title: PropTypes.string,
  desc: PropTypes.string,
  close: PropTypes.func,
  click: PropTypes.func,
};
export default ConfirmationBox;
