import {LogoIcon} from './logo-icon';

export function Brand({small = false, animated = !small}: {small?: boolean; animated?: boolean}) {
  return <span className={`brand ${small ? 'small' : ''}`}>
    <span className="brand-mark"><LogoIcon size={small ? 20 : 25} animated={animated}/></span>
    <span>notestack<span className="brand-period">.</span></span>
  </span>;
}
