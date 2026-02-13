import React, { useContext } from 'react';
import './BtnAdd.scss';
import { NotifDispatchContext } from '../../../reducer/NotificationReduce';
import { Product } from '../../../types/Product';
import '../../../../../i18next';
import { TranslationContext } from '../../../../../i18next/shared/TranslationContext';
import classNames from 'classnames';
import { ProductListContext } from '../../../context/ProductListContext';
import { useAppDispatch, useAppSelector } from '../../../hooks/redyxTypes';
import {
  add as addCartItem,
  remove as removeCartItem,
} from '../../../../../features/cart';

type BtnAddProps = {
  selectedProductID: string;
};

export const BtnAdd: React.FC<BtnAddProps> = ({ selectedProductID }) => {
  const notifDispatch = useContext(NotifDispatchContext);
  const { cartList } = useAppSelector(state => state.cart);
  const dispatch = useAppDispatch();
  const { productList } = useContext(ProductListContext);
  const { btnsTitle, additionalText } = useContext(TranslationContext);

  const product: Product = productList.filter(
    p => p.itemId === selectedProductID,
  )[0];

  const isAdded: boolean = cartList.some(item => item.id === selectedProductID);

  const addToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (!product) {
      return;
    }

    if (isAdded) {
      dispatch(removeCartItem(selectedProductID));

      return;
    }

    try {
      dispatch(
        addCartItem({
          id: product.itemId,
          quantity: 1,
          product: {
            name: product.name,
            image: product.image,
            price: product.price,
          },
        }),
      );
      notifDispatch({
        type: 'addProduct',
        payload: `${cartList.length + 1} ${additionalText.itemsInCart}`,
      });
    } finally {
      setTimeout(() => notifDispatch({ type: 'cancel' }), 4000);
    }
  };

  return (
    <button
      onClick={addToCart}
      className={classNames('btn-add', {
        'btn-add--added': isAdded,
      })}
    >
      {isAdded ? btnsTitle.added : btnsTitle.add}
    </button>
  );
};
