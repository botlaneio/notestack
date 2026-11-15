export const PRICE=600;
export const BUNDLE_PRICE=1500;
export const IDS=['mathematics','science','social-science'];
export function normaliseBag(value){return Array.isArray(value)?IDS.filter(id=>value.includes(id)):[]}
export function addPack(bag,id){return normaliseBag([...normaliseBag(bag),id])}
export function priceBag(bag){const items=normaliseBag(bag);const subtotal=items.length*PRICE;const total=items.length===3?BUNDLE_PRICE:subtotal;return {count:items.length,subtotal,total,saving:subtotal-total}}
