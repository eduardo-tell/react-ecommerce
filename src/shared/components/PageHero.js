/** Banner de boas-vindas da home */
export function PageHero() {
  return (
    <section
      className="h-[50vh] p-4 lg:p-0 flex items-center justify-center bg-[#F7F7F9]"
      aria-labelledby="hero-title"
    >
      <div className="text-center animate-[heroIn_1s_ease-out]">
        <h1 id="hero-title" className="text-5xl font-bold leading-tight">
          Bem-vindo à nossa loja online!
        </h1>
        <p className="text-lg mt-4 max-w-2xl mx-auto">
          Descubra uma variedade de produtos incríveis e aproveite nossas ofertas exclusivas.
        </p>
      </div>
    </section>
  );
}
