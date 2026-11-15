import Link from 'next/link';

export default function NotFound() {
  return <main className="launch-page wrap"><span className="section-kicker">PAGE NOT FOUND</span><h1>Let’s find your next chapter.</h1><p>The page you’re looking for isn’t here.</p><Link className="text-action" href="/">Return to NoteStack →</Link></main>;
}
