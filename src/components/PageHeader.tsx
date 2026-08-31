import RoofDivider from "./RoofDivider";

export default function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <section className="bg-teal-900">
      <div className="max-w-6xl mx-auto px-[5%] pt-14 sm:pt-16 pb-12 sm:pb-14">
        <p className="text-sage-light text-[13px] tracking-[0.08em] uppercase font-semibold mb-4">
          {eyebrow}
        </p>
        <h1 className="font-serif font-medium text-[36px] sm:text-[46px] leading-[1.1] text-cream mb-4 max-w-2xl">
          {title}
        </h1>
        {intro && (
          <p className="text-[15.5px] leading-relaxed text-[#D7E6E4] max-w-xl">
            {intro}
          </p>
        )}
      </div>
      <RoofDivider />
    </section>
  );
}
