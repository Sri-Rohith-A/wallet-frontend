import OverViewTile from '../../components/OverViewTile/OverViewTile';
import style from './SalesOverview.module.scss';
import { useState } from 'react';

/**
 * @description sales overview container
 * @version 1.0.0
 * @author [Rakhesh Bowtham]
 * @returns sales overview container
 */

const SalesOverview = () => {
  const [selectedCard, setSelectedCard] = useState(0);
  const handleClick = (index) => {
    setSelectedCard(index);
  };
  const data = [
    {
      timeInterval: 'Today',
      ammountSpent: 7450,
    },
    {
      timeInterval: 'This week',
      ammountSpent: 34452,
    },
    {
      timeInterval: 'This month',
      ammountSpent: 113323,
    },
    {
      timeInterval: 'Carry',
      ammountSpent: 19123,
    },
    {
      timeInterval: 'Dup',
      ammountSpent: 123,
    },
  ];
  return (
    <div className={style['card-container']}>
      {data.map((el, index) => (
        <OverViewTile
          key={index}
          timeInterval={el.timeInterval}
          ammountSpent={el.ammountSpent}
          cardIndex={index}
          activeCard={selectedCard}
          handleActiveCard={() => handleClick(index)}
        />
      ))}
    </div>
  );
};
export default SalesOverview;
