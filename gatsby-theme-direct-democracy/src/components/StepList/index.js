import React from 'react';
import cN from 'classnames';
import s from './style.module.less';

const ICONS = {
  mail: require('../../assets/icons/mail_sectionColor1.svg'),
  stack: require('../../assets/icons/stack.svg'),
  print: require('../../assets/icons/print.svg'),
  send: require('../../assets/icons/send.svg'),
  download: require('../../assets/icons/download.svg'),
};

export function StepList({ children, className }) {
  return <ul className={cN(s.list, className)}>{children}</ul>;
}

export function StepListItem({ icon, children, className }) {
  const iconSrc = ICONS[icon];

  return (
    <li className={cN(className, s.item)}>
      <div className={s.iconContainer}>
        {iconSrc && (
          <img aria-hidden="true" alt="" className={s.icon} src={iconSrc} />
        )}
      </div>
      <div>{children}</div>
    </li>
  );
}
