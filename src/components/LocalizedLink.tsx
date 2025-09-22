import type { FC, ReactNode } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

type Props = {
  to: string; // path without language prefix, e.g. 'services', '/contact'
  className?: string;
  children: ReactNode;
  onClick?: () => void;
  'aria-current'?: 'page' | undefined;
};

const normalize = (p: string): string => {
  if (!p) return '';
  return p.replace(/^\/+/, ''); // remove leading slashes
};

const LocalizedLink: FC<Props> = ({ to, className, children, onClick, ...rest }) => {
  const { lng } = useParams();
  const location = useLocation();
  const lang = lng && ['fr', 'en', 'pt'].includes(lng) ? lng : 'fr';

  const target = normalize(to);
  const full = `/${lang}${target ? `/${target}` : ''}`;

  // Preserve search/hash if link points to same path segment? Keep simple: no search/hash by default.
  return (
    <Link to={full} className={className} onClick={onClick} {...rest}>
      {children}
    </Link>
  );
};

export default LocalizedLink;