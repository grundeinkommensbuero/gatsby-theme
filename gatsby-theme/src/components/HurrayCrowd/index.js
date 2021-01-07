import React from 'react';
import Flowers from '../../assets/hurray/flowers.svg';
import Hat from '../../assets/hurray/hat.svg';
import Crowd1 from '../../assets/hurray/crowd1_sectionColor1.svg';
import Crowd2 from '../../assets/hurray/crowd2_sectionColor1.svg';
import Crowd1Red from '../../assets/hurray/crowd1_sectionColor2.svg';
import Crowd2Red from '../../assets/hurray/crowd2_sectionColor2.svg';
import s from './style.module.less';

export const HurrayCrowd = ({ color }) => (
  <div className={s.savedStage}>
    <img src={Flowers} className={s.savedStageFlowers} alt="" />
    <img src={Hat} className={s.savedStageHat} alt="" />
    {color === 'RED' ? (
      <>
        <img src={Crowd1Red} className={s.savedStageCrowd1} alt="" />
        <img src={Crowd2Red} className={s.savedStageCrowd2} alt="" />
      </>
    ) : (
      <>
        <img src={Crowd1} className={s.savedStageCrowd1} alt="" />
        <img src={Crowd2} className={s.savedStageCrowd2} alt="" />
      </>
    )}
  </div>
);
