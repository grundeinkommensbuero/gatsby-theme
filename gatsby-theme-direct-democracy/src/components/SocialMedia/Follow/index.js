import React from 'react';
import s from './style.module.less';
import cN from 'classnames';
import SocialMediaButton from '../Button';

export default ({ className, facebookUrl, twitterUrl, instagramUrl }) => (
  <div className={cN(s.followButtons, className)}>
    {facebookUrl && (
      <SocialMediaButton
        icon="Facebook"
        link={facebookUrl}
        label="Folge auf Facebook"
        className={s.button}
      />
    )}
    {twitterUrl && (
      <SocialMediaButton
        icon="Twitter"
        link={twitterUrl}
        label="Folge auf Twitter"
        className={s.button}
      />
    )}
    {instagramUrl && (
      <SocialMediaButton
        icon="Instagram"
        link={instagramUrl}
        label="Folge auf Instagram"
        className={s.button}
      />
    )}
  </div>
);
