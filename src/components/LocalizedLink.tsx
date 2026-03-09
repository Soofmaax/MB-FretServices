import type { FC, ReactNode } from 'react';
import { Link, useParams } from 'react-router-dom';
import { localizeTo, type Lang } from '../utils/paths';

type Props = {
  to: string; // logical path without language prefix (e.g. 'services', 'contact', 'services/fret-maritime', '' for home)
  className?: string;
  children: ReactNode;
  onClick?: () => void;
  state?: unknown;
  'aria-current'?: 'page' | undefined;
};

const SUP_LANGS: Lang[] = ['fr', 'en', 'pt'];

const LocalizedLink: FC<Props> = ({ to, className, children, onClick, state, ...rest }) => {
  const { lng } = useParams();
  const lang = (lng && SUP_LANGS.includes(lng as Lang)) ? (lng as Lang) : 'fr';

  // Build localized path according to current language (handles localized slugs)
  const href = localizeTo(to, lang);

  return (
    <Link to={href} state={state} className={className} onClick={onClick} {...rest}>
      {children}
    </Link>
  );
};

export default LocalizedLink;