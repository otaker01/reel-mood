import {
  TMDB_API_TERMS,
  TMDB_LOGO_SHORT,
  TMDB_NOTICE,
  TMDB_SITE,
  TMDB_TERMS,
} from "../lib/tmdbAttribution";

const LINK =
  "text-ember hover:text-white underline underline-offset-2 decoration-ember/50 hover:decoration-white transition-colors";

export default function Policies() {
  return (
    <div className="min-h-screen pt-20 max-w-3xl mx-auto px-4 sm:px-6 pb-16 min-w-0 w-full">
      <div className="pt-10 pb-10">
        <p className="text-flame text-sm font-medium mb-3">Legal</p>
        <h1 className="font-display text-4xl sm:text-5xl font-semibold text-white leading-tight">
          Policies
        </h1>
        <p className="text-smoke text-lg mt-3 leading-relaxed">
          How MoovieMatch works, how we handle data on this device, and how we credit The Movie
          Database (TMDB).
        </p>
      </div>

      <div className="space-y-12 text-smoke text-[15px] leading-relaxed">
        <section>
          <h2 className="font-display text-2xl font-semibold text-white mb-3">About this product</h2>
          <p>
            MoovieMatch is a free movie discovery website. It is not a commercial product. We do not
            charge for access, we do not offer paid plans or premium features, we do not run
            advertising, and we do not earn revenue from this site.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold text-white mb-3">TMDB attribution</h2>
          <p className="mb-4">
            Movie titles, overviews, ratings, credits, trailers, and images shown in MoovieMatch are
            provided by{" "}
            <a href={TMDB_SITE} target="_blank" rel="noopener noreferrer" className={LINK}>
              The Movie Database (TMDB)
            </a>. MoovieMatch is an independent project. It is not operated by TMDB, and TMDB does not
            endorse, certify, or otherwise approve this website.
          </p>
          <div className="border border-rim rounded-2xl bg-card px-5 py-5 flex flex-col gap-4">
            <a
              href={TMDB_SITE}
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit opacity-90 hover:opacity-100 transition-opacity"
              aria-label="The Movie Database"
            >
              <img src={TMDB_LOGO_SHORT} alt="The Movie Database" className="h-5 w-auto" />
            </a>
            <p className="text-white/85">{TMDB_NOTICE}</p>
          </div>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold text-white mb-3">Content</h2>
          <p>
            MoovieMatch does not own the movie metadata or artwork displayed here. That material is
            supplied by TMDB for personal, non-commercial discovery. Use of the TMDB APIs is governed
            by TMDB&apos;s{" "}
            <a href={TMDB_API_TERMS} target="_blank" rel="noopener noreferrer" className={LINK}>
              API Terms of Use
            </a>{" "}
            and{" "}
            <a href={TMDB_TERMS} target="_blank" rel="noopener noreferrer" className={LINK}>
              Terms of Use
            </a>
            , not by this page.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold text-white mb-3">Privacy</h2>
          <p>
            MoovieMatch does not require an account. Titles you save stay on this device in your
            browser so your watchlist can persist between visits. We do not sell this information.
            We do not collect payment data because there are no paid features. The app requests movie
            data from TMDB so it can show titles; TMDB&apos;s own terms and privacy practices apply
            to that service.
          </p>
        </section>
      </div>
    </div>
  );
}
