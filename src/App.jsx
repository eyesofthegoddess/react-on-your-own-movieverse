import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './style.css';
import SearchPage from './SearchPage';
import MovieDetail from './MovieDetail';

function LandingHome() {
  return (
    <>
      <section id="intro" className="main">
        <div className="spotlight">
          <div className="content">
            <header className="major">
              <h2>Welcome to Movieverse</h2>
            </header>
            <p>We'd like to invite you to use our functional movie search. We hope it makes your movie watching plan go smoothly. Take your time and look around for your favorites.</p>
          </div>
          <span className="image"><img src="/assets/clipart85751.png" alt="Movieverse Illustration" /></span>
        </div>
      </section>

      <section id="first" className="main special">
        <header className="major">
          <h2>Why Movieverse</h2>
        </header>
        <ul className="features">
          <li>
            <h3>Easy to Use</h3>
            <p>Quick, simple process of click and search.</p>
          </li>
          <li>
            <h3>Totally Free</h3>
            <p>No payment or fees requested anytime.</p>
          </li>
          <li>
            <h3>Several Options</h3>
            <p>Search by name, series, episodes or year.</p>
          </li>
        </ul>
      </section>
    </>
  );
}

function App() {
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  return (
    <Router>
      <div id="wrapper">
        <header id="header" className="alt">
          <h1>
            <svg className="title-logo left" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 11h16v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"></path>
              <path d="M4 11V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4"></path>
              <path d="m4 7 4 4"></path><path d="m8 5 4 4"></path><path d="m12 5 4 4"></path><path d="m16 5 4 4"></path>
            </svg>
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Movieverse</Link>
            <svg className="title-logo right" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 11h16v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"></path>
              <path d="M4 11V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4"></path>
              <path d="m4 7 4 4"></path><path d="m8 5 4 4"></path><path d="m12 5 4 4"></path><path d="m16 5 4 4"></path>
            </svg>
          </h1>
          <p>Easiest way to search for movies to watch.</p>
        </header>

        <nav id="nav">
          <ul>
            <li>
              <Link to="/" onClick={() => {
                setIsPageLoading(true);
                setTimeout(() => setIsPageLoading(false), 600);
              }}>Welcome</Link>
            </li>
            <li>
              <Link to="/search" className="nav-search-btn" onClick={() => {
                setIsPageLoading(true);
                setTimeout(() => setIsPageLoading(false), 600);
              }}>Lets Search</Link>
            </li>
            <li>
              <a href="#join" onClick={(e) => { e.preventDefault(); setIsJoinModalOpen(true); }}>Join Now</a>
            </li>
          </ul>
        </nav>

        <div id="main" style={{ position: 'relative' }}>
                    {isPageLoading && (
            <div className="page-route-loader-mask">
              <div className="spinner"></div>
              <p>Optimizing cinematic streams...</p>
            </div>
          )}
          <Routes>
            <Route path="/" element={<LandingHome />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/movie/:id" element={<MovieDetail onBack={() => window.history.back()} />} />
          </Routes>

          <section id="cta" className="main special">
            <header className="major">
              <h2>Join Now</h2>
              <p>Get started for free and continue for free.</p>
              <button className="primary" onClick={() => setIsJoinModalOpen(true)}>Create Free Account</button>
            </header>
          </section>
        </div>

        <footer id="footer">
          <section>
            <h2>Thank You For Visiting Us</h2>
            <p>We hope you had a great time and found what you were looking for. Please feel free to stop back anytime to do another search.</p>
          </section>
          <section>
            <h2>Contact Us</h2>
            <dl className="alt">
              <dt>Address</dt><dd>1234 Nowhere Road • Walla Walla, WA 99999 • USA</dd>
              <dt>Phone</dt><dd>(000) 000-0000 ex 0000</dd>
              <dt>Email</dt><dd><a href="mailto:information@unknown.com">information@unknown.com</a></dd>
            </dl>
            <div className="social-links-container">
              <h3>Follow Us</h3>
              <div className="social-icons-row">
                <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>
                <a href="https://x.com" target="_blank" rel="noreferrer" aria-label="Twitter X">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z" /><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" /></svg></a>
                <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg></a>
              </div>
            </div>
          </section>
          <p className="copyright">&copy; Movieverse <span>2026</span>.</p>
        </footer>

        {isJoinModalOpen && (
          <div className="modal-backdrop-overlay" onClick={() => setIsJoinModalOpen(false)}>
            <div className="modal-content-card" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close-x" onClick={() => setIsJoinModalOpen(false)}>&times;</button>
              <div className="modal-icon-header">
                <svg viewBox="0 0 24 24" fill="none" stroke="url(#modalPopcornGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <defs><linearGradient id="modalPopcornGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#e37682" /><stop offset="100%" stopColor="#5f4d93" /></linearGradient></defs>
                  <path d="M6 7a3 3 0 0 1 3-3 3 3 0 0 1 5.45 1 3 3 0 0 1 3.55 3" /><path d="M19 8l-1.5 13H6.5L5 8Z" /><line x1="9" y1="8" x2="9.5" y2="21" /><line x1="12" y1="8" x2="12" y2="21" /><line x1="15" y1="8" x2="14.5" y2="21" />
                </svg>
              </div>
              <div className="modal-text-group">
                <h2>Join Movieverse</h2>
                <p>Create your personal profile vault to save your favorite watchlists, track search filtering preferences, and get movie alerts.</p>
              </div>
              <form onSubmit={(e) => { e.preventDefault(); alert("Welcome to the Movieverse family! Account generated successfully."); setIsJoinModalOpen(false); }}>
                <div className="form-group-field"><label>Full Name</label><input type="text" placeholder="John Doe" required /></div>
                <div className="form-group-field"><label>Email Address</label><input type="email" placeholder="john@example.com" required /></div>
                <div className="form-group-field"><label>Password</label><input type="password" placeholder="••••••••" minLength="6" required /></div>
                <button type="submit" className="primary text-full-width">Complete Registration</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
