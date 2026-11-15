import {Layers} from 'lucide-react';

export function Brand({small = false}: {small?: boolean}) {
  return <span className={`brand ${small ? 'small' : ''}`}>
    <span className="brand-mark"><Layers size={small ? 20 : 25} strokeWidth={2}/></span>
    <span>notestack<span className="brand-period">.</span></span>
  </span>;
}
