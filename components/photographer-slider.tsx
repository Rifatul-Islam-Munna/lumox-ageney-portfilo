"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { LazyMotion, domAnimation, m, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useState } from "react";

type Photographer = {
  name: string;
  image: string;
};

export function PhotographerSlider({
  eyebrow = "We are a team of super professional photographers",
  people,
  title = "Meet photographers",
}: {
  eyebrow?: string;
  people: Photographer[];
  title?: string;
}) {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [perView, setPerView] = useState(1);
  const safePeople = useMemo(() => people.filter(Boolean), [people]);

  useEffect(() => {
    const update = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) setPerView(4);
      else if (window.matchMedia("(min-width: 640px)").matches) setPerView(2);
      else setPerView(1);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  if (!safePeople.length) return null;

  const move = (direction: 1 | -1) => {
    setActive((current) => (current + direction + safePeople.length) % safePeople.length);
  };

  return (
    <section className="bg-white pt-20 text-black" id="photographers">
      <div className="mx-auto flex max-w-[1100px] items-end justify-between gap-6 px-7 pb-12 sm:px-12">
        <div>
          <h2 className="text-[18px] font-black uppercase tracking-[0.12em]">
            {title}
          </h2>
          {eyebrow && (
            <p className="mt-3 inline-block bg-[#ffd018] px-3 py-2 text-[11px] font-black uppercase tracking-[0.1em]">
              {eyebrow}
            </p>
          )}
        </div>
        <div className="flex shrink-0 gap-3">
          <button
            aria-label="Previous photographer"
            className="grid h-11 w-11 place-items-center bg-black text-white transition hover:bg-[#ffd018] hover:text-black"
            onClick={() => move(-1)}
            type="button"
          >
            <ArrowLeft className="h-5 w-5 stroke-[2.8]" />
          </button>
          <button
            aria-label="Next photographer"
            className="grid h-11 w-11 place-items-center bg-black text-white transition hover:bg-[#ffd018] hover:text-black"
            onClick={() => move(1)}
            type="button"
          >
            <ArrowRight className="h-5 w-5 stroke-[2.8]" />
          </button>
        </div>
      </div>

      <LazyMotion features={domAnimation} strict>
        <div className="overflow-hidden">
          <m.div
            animate={reduceMotion ? false : { x: `-${active * (100 / perView)}%` }}
            className="flex"
            initial={false}
            transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
          >
            {[...safePeople, ...safePeople].map((person, index) => (
              <m.article
                className="group relative h-[390px] min-w-full overflow-hidden sm:h-[430px] sm:min-w-[50%] lg:h-[520px] lg:min-w-[25%]"
                initial={reduceMotion ? false : { opacity: 0, y: 34, filter: "blur(8px)" }}
                key={`${person.name}-${index}`}
                viewport={{ once: true, amount: 0.22 }}
                whileHover={reduceMotion ? undefined : { y: -10 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
              >
                <img
                  alt={person.name}
                  className="h-full w-full object-cover grayscale transition duration-700 group-hover:scale-110 group-hover:grayscale-0"
                  loading="lazy"
                  src={person.image}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
                <div className="absolute bottom-10 left-0 right-0 text-center text-white">
                  <h3 className="text-[14px] font-black uppercase tracking-[0.14em]">
                    {person.name}
                  </h3>
                  <div className="mt-4 flex justify-center gap-4 text-[18px] font-black">
                    <a href="#" aria-label={`${person.name} Facebook`}>f</a>
                    <a href="#" aria-label={`${person.name} LinkedIn`}>in</a>
                    <a href="#" aria-label={`${person.name} Twitter`}>t</a>
                  </div>
                </div>
              </m.article>
            ))}
          </m.div>
        </div>
      </LazyMotion>
    </section>
  );
}
