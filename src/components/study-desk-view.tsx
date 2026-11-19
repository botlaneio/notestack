'use client';

import Link from 'next/link';
import {useEffect, useRef} from 'react';
import {mountStudyDesk} from './study-desk';
import './study-desk.css';

export default function StudyDesk() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (root.current) return mountStudyDesk(root.current);
  }, []);

  return <div className="study-desk" ref={root}>
    <header>
      <div className="shell spread">
        <button type="button" className="plain brand" data-action="home"><span className="mark" aria-hidden="true">✦</span>Notestack</button>
        <nav className="actions" aria-label="Main">
          <button type="button" className="plain" data-action="home">Study desk</button>
          <button type="button" className="plain" data-action="progress">Progress</button>
          <Link href="/shop/" className="plain nav-link">Study packs</Link>
          <Link href="/account/" className="plain nav-link">Account</Link>
          <button type="button" className="primary" data-action="new">+ New deck</button>
        </nav>
      </div>
    </header>
    <main className="shell" id="study-desk-content" tabIndex={-1}>
      <h1>Study desk</h1>
    </main>
    <footer className="shell desk-footer">
      <small id="storage">Saved in this browser</small>
      <nav className="actions" aria-label="Guided lessons">
        <Link href="/learn/maths/">Maths</Link>
        <Link href="/learn/science/">Science</Link>
        <Link href="/learn/social-science/">Social Science</Link>
      </nav>
    </footer>
    <dialog id="editor" aria-labelledby="editor-title">
      <form id="deck-form">
        <div className="spread"><h2 id="editor-title">New deck</h2><button type="button" data-action="close">Close</button></div>
        <label>Deck title<input name="title" required maxLength={100}/></label>
        <label>Subject<input name="subject" maxLength={40} placeholder="e.g. History"/></label>
        <div id="rows"/>
        <div className="actions"><button type="button" data-action="add">+ Add card</button><button className="primary" type="submit">Save deck</button></div>
        <p id="error" role="alert"/>
      </form>
    </dialog>
  </div>;
}
