import React, { useCallback } from 'react';
import './CartItem.scss';
import { CircleButton } from '../../../../shared/components/Buttons/CircleButton';
import { icons } from '../../../../../global-assets/static';
import { CartElement } from '../../../../shared/types/CartElement';
import { motion } from 'framer-motion';
import { useAppDispatch } from '../../../../shared/hooks/redyxTypes';
import {
  decrease as decreaseCartItem,
  increase as increaseCartItem,
  remove as removeCartItem,
} from '../../../../../features/cart';

type CartItemProps = {
  product: CartElement;
};

export const CartItem: React.FC<CartItemProps> = React.memo(({ product }) => {
  const dispatch = useAppDispatch();
  const IconCancel = icons.close.valuePath;

  const deleteProduct = useCallback(() => {
    dispatch(removeCartItem(product.id));
  }, [product.id, dispatch]);

  const decreaseProductAmount = useCallback(() => {
    dispatch(decreaseCartItem(product.id));
  }, [product.id, dispatch]);

  const increaseProductAmount = useCallback(() => {
    dispatch(increaseCartItem(product.id));
  }, [product.id, dispatch]);

  return (
    <motion.div
      className="cart-item"
      layout
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -60 }}
      transition={{ duration: 0.3 }}
    >
      <div className="cart-item__content">
        <div className="cart-item__product-info">
          <button className="cart-item__product-info__btn-close">
            <IconCancel
              className="cart-item__product-info__icon"
              onClick={deleteProduct}
            />
          </button>
          <div className="cart-item__product-info__image">
            <img
              src={product.product.image}
              alt={`${product.product.name} image`}
            />
          </div>
          <span className="cart-item__product-info__name">
            {product.product.name}
          </span>
        </div>
        <div className="cart-item__price-info">
          <div className="cart-item__price-info__controls">
            <div className="cart-item__btn-adjust-amount">
              <button
                className="cart-item__btn-adjust-amount--minus"
                onClick={decreaseProductAmount}
                disabled={product.quantity === 1}
              >
                <CircleButton icon={icons.minus.valuePath} />
              </button>
              <div className="cart-item__btn-adjust-amount__amount">
                {product.quantity}
              </div>
              <button
                className="cart-item__btn-adjust-amount--plus"
                onClick={increaseProductAmount}
              >
                <CircleButton icon={icons.plus.valuePath} />
              </button>
            </div>
          </div>
          <div className="cart-item__price-info__price">{`$${product.product.price * product.quantity}`}</div>
        </div>
      </div>
    </motion.div>
  );
});

CartItem.displayName = 'CartItem';
