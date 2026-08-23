import Link from "next/link";

export function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link href="/" className="brand">
          Systema <span className="text-muted">demo</span>
        </Link>
        <nav className="nav-links">
          <Link href="/problems">Problems</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/u/you">Profile</Link>
          <a href="https://systema-sd.in" target="_blank" rel="noopener noreferrer">
            systema-sd.in ↗
          </a>
        </nav>
      </div>
    </header>
  );
}
