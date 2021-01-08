import React from 'react';
import s from './style.module.less';

const BACKGROUNDS = [
  require('../../../assets/backgrounds/header_01.svg'),
  require('../../../assets/backgrounds/header_02.svg'),
  require('../../../assets/backgrounds/header_03.svg'),
  require('../../../assets/backgrounds/header_04.svg'),
];

export default () => {
  return (
    <img
      alt=""
      className={s.background}
      src={BACKGROUNDS[Math.round((BACKGROUNDS.length - 1) * Math.random())]}
    />
  );
};
