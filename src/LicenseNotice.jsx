/**
 * Texas license disclosures shown in every footer.
 * 22 TAC 531.18 requires the Consumer Protection Notice link on the homepage,
 * labeled "Texas Real Estate Commission Consumer Protection Notice" in at least 10-point type.
 */
export default function LicenseNotice() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-8 text-sm leading-6 text-slate-500 sm:px-6 lg:px-8">
      <p>
        Andres Aviles is a licensed Texas real estate sales agent, TREC #0680266, sponsored by AXEN Realty.
      </p>
      <p className="mt-1">
        <a
          href="https://www.trec.texas.gov/sites/default/files/pdf-forms/CN%201-5_0.pdf"
          target="_blank"
          rel="noreferrer"
          className="underline transition hover:text-slate-900"
        >
          Texas Real Estate Commission Consumer Protection Notice
        </a>
      </p>
    </div>
  );
}
