import React, { useContext } from 'react';
import './Modal.scss';
import { TranslationContext } from '../../../../../i18next/shared/TranslationContext';
import { createPortal } from 'react-dom';
import { useAppDispatch } from '../../../hooks/redyxTypes';
import { clear as clearCart } from '../../../../../features/cart';

type ModalProps = {
  handleModal?: (arg: boolean) => void;
  message: string;
  type: 'cartModal' | 'productsModal';
};

export const Modal: React.FC<ModalProps> = React.memo(
  ({ message, type, handleModal }) => {
    const modalRoot = document.getElementById('modal-root');

    const { notifMessage, btnsTitle } = useContext(TranslationContext);
    const dispatch = useAppDispatch();

    if (!modalRoot) {
      return null;
    }

    const handleConfirm = () => {
      if (!handleModal) {
        return;
      }

      dispatch(clearCart());

      handleModal(false);
    };

    const reload = () => {
      window.location.reload();
    };

    return createPortal(
      <div className="cart-modal">
        <div className="cart-modal__overlay">
          <div className="modal">
            <div className="modal__header">
              <span className="modal__title">{notifMessage.notif}</span>
            </div>
            <div className="modal__body" style={{ whiteSpace: 'pre-line' }}>
              {message}
            </div>
            <div className="modal__footer">
              {type === 'cartModal' && handleModal ? (
                <>
                  <button className="modal__btn" onClick={handleConfirm}>
                    {btnsTitle.confirm}
                  </button>
                  <button
                    className="modal__btn"
                    onClick={() => handleModal(false)}
                  >
                    {btnsTitle.deny}
                  </button>
                </>
              ) : (
                <button
                  className="modal__btn modal__btn--reload"
                  onClick={reload}
                >
                  {btnsTitle.reload}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>,
      modalRoot,
    );
  },
);

Modal.displayName = 'Modal';
