import React from 'react';
import s from './style.module.less';
import cN from 'classnames';
import { LinkButton, Button, LinkButtonLocal } from '../../Forms/Button';
import POINT_LEFT_SECTIONCOLOR1 from '../../../assets/pointers/figure_point_left_sectionColor1.svg';
import POINT_LEFT_MOBILE_SECTIONCOLOR1 from '../../../assets/pointers/figure_point_left_mobile_sectionColor1.svg';
import POINT_LEFT_SECTIONCOLOR2 from '../../../assets/pointers/figure_point_left_sectionColor2.svg';
import POINT_LEFT_MOBILE_SECTIONCOLOR2 from '../../../assets/pointers/figure_point_left_mobile_sectionColor2.svg';

export const CTAButtons = ({ children }) => (
  <div className={s.buttons}>{children}</div>
);

export function CTAButtonContainer({ children, className, illustration }) {
  return (
    <div
      className={cN(s.container, className, {
        [s.hasIllustration]: illustration,
      })}
    >
      <div className={s.inner}>
        {children}
        {illustration === 'POINT_LEFT' && (
          <>
            <img
              alt=""
              src={POINT_LEFT_SECTIONCOLOR1}
              className={cN(s.illustrationPointLeft, s.sectionColor1)}
              aria-hidden="true"
            />
            <img
              alt=""
              src={POINT_LEFT_MOBILE_SECTIONCOLOR1}
              className={cN(s.illustrationPointLeftMobile, s.sectionColor1)}
              aria-hidden="true"
            />
            <img
              alt=""
              src={POINT_LEFT_SECTIONCOLOR2}
              className={cN(s.illustrationPointLeft, s.sectionColor2)}
              aria-hidden="true"
            />
            <img
              alt=""
              src={POINT_LEFT_MOBILE_SECTIONCOLOR2}
              className={cN(s.illustrationPointLeftMobile, s.sectionColor2)}
              aria-hidden="true"
            />
          </>
        )}
        {illustration === 'POINT_RIGHT' && (
          <>
            <img
              alt=""
              src={POINT_LEFT_SECTIONCOLOR1}
              className={cN(s.illustrationPointRight, s.sectionColor1)}
              aria-hidden="true"
            />
            <img
              alt=""
              src={POINT_LEFT_SECTIONCOLOR2}
              className={cN(s.illustrationPointRight, s.sectionColor2)}
              aria-hidden="true"
            />
          </>
        )}
      </div>
    </div>
  );
}

export function CTAButton({ children, className, ...other }) {
  return (
    <Button className={cN(s.button, className)} {...other}>
      {children}
    </Button>
  );
}

export function CTALink({ children, className, ...other }) {
  return (
    <LinkButtonLocal className={cN(s.button, className)} {...other}>
      {children}
    </LinkButtonLocal>
  );
}

export function CTALinkExternal({
  children,
  href,
  className,
  onClick,
  ...other
}) {
  return (
    <LinkButton
      target={href.startsWith('#') ? '' : '_blank'}
      className={cN(className, s.button)}
      href={href}
      onClick={() => {
        if (href.startsWith('#')) {
          dispatchEvent(href);
        }
      }}
      {...other}
    >
      {children}
    </LinkButton>
  );
}

function dispatchEvent(id) {
  window.dispatchEvent(new Event(id));
}
