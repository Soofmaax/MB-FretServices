import type { FC, ReactNode } from 'react';
import { Link, useParams } from 'react-router-dom';
import { localizeTo } from '../utils/paths';

type Props = {
  to: string; // logical path without language prefix (e.g. 'services', 'contact', 'services/fret-maritime', '' for home)
  className?: string;
  children: ReactNode;
  onClick?: () => void;
  'aria-current'?: 'page' | undefined;
};

const LocalizedLink: FC<Props> = ({ to, className, children, onClick, ...rest }) => {
  const { lng } = useParams();
  const lang = (lng && ['fr', 'en', 'pt'].includes(lng)) ? (lng as 'fr' | 'en' | 'pt') : 'fr';

  // Build localized path according to current language (handles localized slugs)
  const href = localizeTo(to, lang);

  return (
    <Link to={href} className={className} onClick={onClick} {...rest}>
      {children}
    </Link>
  );
};

export default LocalizedLink;