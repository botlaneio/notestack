'use client';

import {useState} from 'react';
import styles from './real-numbers-lesson.module.css';

export function DepositInterestExplorer() {
  const [months, setMonths] = useState(12);
  const principal = 50000;
  const interest = principal * 0.08 * months / 12;
  const rupees = (value: number) => '₹' + value.toLocaleString('en-IN', {maximumFractionDigits: 2});
  return <section className={styles.explorer}>
    <h3>How does the term affect interest?</h3>
    <label>Term in months <input type="range" min="0" max="24" value={months} onChange={event => setMonths(Number(event.target.value))}/></label>
    <p aria-live="polite">At {months} months, simple interest on ₹50,000 at 8% per year is <strong>{rupees(interest)}</strong>. The balance is {rupees(principal + interest)}.</p>
    <meter aria-label="Interest earned across the two-year illustration" min={0} max={8000} value={interest}/>
    <p>Multiply ₹50,000 by 0.08 and by the term in years. The textbook illustration assumes simple interest and a constant rate.</p>
  </section>;
}
