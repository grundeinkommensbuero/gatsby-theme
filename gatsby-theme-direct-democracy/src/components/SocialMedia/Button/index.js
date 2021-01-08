import React from 'react';
import s from './style.module.less';
import cN from 'classnames';

const icons = {
  Facebook: require('!svg-inline-loader!../../../assets/brands//facebook.svg'),
  Instagram: require('!svg-inline-loader!../../../assets/brands/instagram.svg'),
  Twitter: require('!svg-inline-loader!../../../assets/brands/twitter.svg'),
};

export default ({ link, label, className, icon, iconSize }) => (
  <a
    target="_blank"
    rel="noreferrer"
    href={link}
    aria-label={label}
    className={cN(s.button, className, s['button' + iconSize])}
    dangerouslySetInnerHTML={{ __html: icons[icon] }}
  />
);
