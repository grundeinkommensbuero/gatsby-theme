import React, { useState } from 'react';
import Link from 'gatsby-link';

import { OverlayContext } from '../../../context/Overlay';
import { Button } from '../../Forms/Button';

import s from './style.module.less';
import Menu from './Menu';

const firstRequired = r => {
  return r(r.keys()[0]);
};

const Logo = firstRequired(
  require.context('../../../assets/logo', false, /\.(png|jpe?g|svg)$/)
);

const Header = ({ menu, hasOverlay }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className={s.header}>
      <div className={s.inner}>
        <h1 className={s.title}>
          <Link to="/">
            <img
              src={Logo}
              className={s.logo}
              alt="Expedition Grundeinkommen Home"
            />
          </Link>
        </h1>
        {hasOverlay && (
          <OverlayContext.Consumer>
            {({ toggleOverlay }) => (
              <Button
                className={s.ctaButton}
                size="MEDIUM"
                onClick={() => toggleOverlay()}
              >
                Jetzt abstimmen
              </Button>
            )}
          </OverlayContext.Consumer>
        )}
        {/* </Tooltip> */}
        {menu && (
          <nav className={s.nav}>
            <button
              className={s.menuButton}
              onClick={() => toggleMenu()}
              aria-label="Hauptmenü"
              aria-expanded={menuOpen}
              aria-controls="menuHeader"
            >
              <div className={s.menuButtonBars}>
                <div className={s.menuButtonBar} />
                <div className={s.menuButtonBar} />
                <div className={s.menuButtonBar} />
              </div>
            </button>
            <Menu menu={menu} menuOpen={menuOpen} />
          </nav>
        )}
      </div>
    </header>
  );
};

// const logoQuery = graphql`
//   query LogoQuery {
//     site {
//       siteMetadata {
//         author
//       }
//     }
//     avatar: file(absolutePath: { regex: "/avatar.(jpeg|jpg|gif|png)/" }) {
//       childImageSharp {
//         fixed(width: 48, height: 48) {
//           ...GatsbyImageSharpFixed
//         }
//       }
//     }
//   }
// `;

export default Header;
