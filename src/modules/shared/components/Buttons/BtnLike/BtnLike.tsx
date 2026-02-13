import React, { useCallback } from 'react';
import './BtnLike.scss';
import classNames from 'classnames';
import { icons } from '../../../../../global-assets/static';
import { useAppDispatch, useAppSelector } from '../../../hooks/redyxTypes';
import { add, remove } from '../../../../../features/favourites';

type BtnLikeProps = {
  buttonSize: 'small' | 'medium';
  productId: string;
};

export const BtnLike: React.FC<BtnLikeProps> = React.memo(
  ({ buttonSize, productId }) => {
    const favourites = useAppSelector(state => state.favourites);
    const dispatch = useAppDispatch();
    const IconLike = icons.like.valuePath;
    const IconLikeFill = icons.likeFill.valuePath;

    const handleFavesButton = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        event.stopPropagation();

        if (!favourites.includes(productId)) {
          dispatch(add(productId));

          return;
        }

        dispatch(remove(productId));
      },
      [dispatch, favourites, productId],
    );

    return (
      <button
        className={classNames('btn-like', {
          'btn-like--is-medium': buttonSize === 'medium',
        })}
        onClick={handleFavesButton}
      >
        <IconLike className="btn-like__image" />
        {favourites.includes(productId) && (
          <IconLikeFill className="btn-like__image btn-like__image--select" />
        )}
      </button>
    );
  },
);

BtnLike.displayName = 'BtnLike';
