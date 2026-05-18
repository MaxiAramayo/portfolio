import type { PortfolioContent } from "../lib/types";

export default function Footer({ t }: { t: PortfolioContent }) {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-l">
          <div className="footer-brand">
            <svg viewBox="0 0 28 28" width="20" height="20">
              <path d="M3 24 L3 4 L14 18 L25 4 L25 24" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
            <span>Maximiliano Aramayo Lazo</span>
          </div>
          <span className="meta">{t.footer.colofon}</span>
        </div>
        <div className="footer-r">
          <span className="meta">{t.footer.built}</span>
          <span className="meta">{t.footer.year}</span>
        </div>
      </div>
    </footer>
  );
}
