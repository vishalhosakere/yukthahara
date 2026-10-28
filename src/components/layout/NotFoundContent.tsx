import Link from "next/link";

export function NotFoundContent() {
  return (
    <section className="section pagehead notfound">
      <div className="wrap">
        <div className="rule" aria-hidden="true" />
        <p className="eyebrow">
          <span className="en">Error 404</span>
          <span className="kn" lang="kn">
            ದೋಷ 404
          </span>
        </p>
        <h1>
          <span className="en">
            This page <span className="em">isn&apos;t on the menu.</span>
          </span>
          <span className="kn" lang="kn">
            ಈ ಪುಟ <span className="em">ಸಿಗಲಿಲ್ಲ.</span>
          </span>
        </h1>
        <div className="cta">
          <Link className="btn btn--primary" href="/">
            <span className="en">Back home</span>
            <span className="kn" lang="kn">
              ಮುಖಪುಟಕ್ಕೆ
            </span>
          </Link>
          <Link className="btn" href="/menu">
            <span className="en">See the menu</span>
            <span className="kn" lang="kn">
              ಮೆನು ನೋಡಿ
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
