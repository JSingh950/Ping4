import { type CSSProperties, useEffect, useMemo, useState } from "react";

type PingStorePageProps = {
  variant?: "blueprint";
};

const productLines = [
  {
    code: "P-01",
    title: "Identity Ring",
    body: "A titanium NFC object for sharing your selected profile, contacts, socials, portfolios, and links in one physical tap.",
  },
  {
    code: "N-02",
    title: "Native NFC",
    body: "Works with every modern iPhone and Android device out of the box. No scanner app is required on the receiving phone.",
  },
  {
    code: "S-03",
    title: "Signal System",
    body: "A free web and mobile platform for turning real-world introductions into a connected digital trail.",
  },
];

const whyNow = [
  {
    title: "Paper Cards Collapse",
    body: "Over 27 billion paper business cards are printed globally each year, and 88% are thrown away within a week. Ping! replaces the disposable exchange with a durable hardware gesture.",
  },
  {
    title: "Digital Noise Is Rising",
    body: "AI has made online interactions feel more synthetic. People are looking for real in-person connection at conferences, coworking spaces, clubs, campuses, and creative events.",
  },
  {
    title: "NFC Is Already Everywhere",
    body: "Modern iOS and Android devices read NFC natively, so one tap can open a curated identity page without asking someone to download an app.",
  },
];

const advantages = [
  {
    label: "Technical Support",
    title: "Built for the moment of meeting.",
    body: "Ping! removes the awkward QR-code pause and the lost-card follow-up loop. The exchange happens through the object already on your hand.",
  },
  {
    label: "Product Quality",
    title: "2.5g titanium. 2mm profile.",
    body: "Ultra-lightweight titanium gives the product the presence of jewelry without turning it into another health tracker or charging routine.",
  },
  {
    label: "Customization",
    title: "Your profile, your signal.",
    body: "Choose the digital trail you want to share: contacts, socials, portfolio links, calendar routes, and personal sites.",
  },
];

const team = [
  {
    name: "Vaness \"Reece\" Gardner",
    role: "Founder & CEO",
    detail:
      "Former AI specialist at Babson College and founder of The Generator, Babson's AI lab that scaled past 1,000 members across MIT, Harvard, venture partners, researchers, students, and local business owners.",
  },
  {
    name: "Gaspard Seuge",
    role: "Co-Founder & CPO",
    detail:
      "HEC Paris educated product architect. Former Growth at MWM AI and AI Engineer at Sorare. Built Ping!'s web and iOS applications and helped drive 300K+ organic impressions.",
  },
];

function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? window.scrollY / scrollable : 0);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return Math.min(Math.max(progress, 0), 1);
}

function useRevealOnScroll() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-visible", "true");
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}

function ScrollRail({ progress }: { progress: number }) {
  return (
    <div className="fixed right-3 top-1/2 z-50 hidden h-[42vh] w-px -translate-y-1/2 bg-white/20 lg:block">
      <div
        className="absolute left-1/2 top-0 w-[3px] -translate-x-1/2 bg-[#d9362f] shadow-[0_0_20px_rgba(217,54,47,0.95)]"
        style={{ height: `${Math.max(progress * 100, 9)}%` }}
      />
      <span className="absolute -left-11 top-0 font-mono text-[9px] uppercase tracking-[0.24em] text-white/45">
        Scroll
      </span>
      <span className="absolute -left-12 bottom-0 font-mono text-[9px] text-[#d9362f]">
        {String(Math.round(progress * 100)).padStart(2, "0")}
      </span>
    </div>
  );
}

function TechnicalRing({ className = "", mirror = false }: { className?: string; mirror?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={`ring-stage relative aspect-square ${className}`}
      style={{ "--ring-mirror": mirror ? "-1" : "1" } as CSSProperties}
    >
      <div className="ring-shadow" />
      <div className="ring-orbit ring-orbit-back" />
      <div className="ring-body">
        <div className="ring-inner" />
        <div className="ring-rim ring-rim-top" />
        <div className="ring-rim ring-rim-bottom" />
        <div className="ring-highlight" />
        <div className="ring-nfc-dot" />
      </div>
      <div className="ring-orbit ring-orbit-front" />
    </div>
  );
}

function PhoneTapVisual() {
  return (
    <div aria-hidden="true" className="relative mx-auto h-[28rem] w-full max-w-[36rem]">
      <div className="absolute left-[8%] top-[12%] h-[68%] w-[38%] border border-white/40 bg-black shadow-[0_34px_80px_rgba(0,0,0,0.8)]">
        <div className="mx-auto mt-5 h-1 w-14 bg-white/25" />
        <div className="mx-8 mt-16 h-px bg-[#d9362f]" />
        <div className="mx-8 mt-5 h-3 bg-white/85" />
        <div className="mx-8 mt-4 h-3 w-2/3 bg-white/45" />
        <div className="absolute bottom-8 left-8 right-8 h-16 border border-white/25" />
      </div>
      <TechnicalRing className="absolute right-[3%] top-[19%] w-[54%]" />
      <div className="absolute left-[46%] top-[46%] h-px w-[30%] bg-[#d9362f] shadow-[0_0_16px_#d9362f]" />
      <div className="absolute bottom-10 right-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#d9362f]">
        NFC native read / active
      </div>
    </div>
  );
}

function ProductCard({
  product,
  index,
  progress,
}: {
  product: (typeof productLines)[number];
  index: number;
  progress: number;
}) {
  const offset = (progress - 0.34) * 46 * (index % 2 === 0 ? 1 : -1);

  return (
    <article
      data-reveal
      className={`group grid min-h-[38rem] border-t border-white/20 bg-black lg:grid-cols-2 ${
        index % 2 === 1 ? "lg:[&_.product-copy]:order-2" : ""
      }`}
    >
      <div className="product-copy flex flex-col justify-between p-6 md:p-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-[#d9362f]">{product.code}</p>
        <div>
          <h3 className="max-w-xl text-5xl font-semibold uppercase leading-[0.9] md:text-7xl">
            {product.title}
          </h3>
          <p className="mt-6 max-w-md text-sm uppercase leading-6 tracking-[0.08em] text-white/58">
            {product.body}
          </p>
        </div>
        <span className="mt-10 h-px w-full bg-white/20" />
      </div>

      <div className="relative min-h-[30rem] overflow-hidden border-t border-white/20 bg-[#eeeeee] lg:border-l lg:border-t-0">
        <div
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 opacity-95 transition-transform duration-700 ease-out"
          style={{ transform: `translate3d(${offset}px,-50%,0)` }}
        >
          {index === 1 ? (
            <PhoneTapVisual />
          ) : (
            <div className="relative mx-auto h-[28rem] max-w-[38rem]">
              <TechnicalRing className="absolute left-[8%] top-[8%] w-[58%]" mirror={index === 2} />
              <TechnicalRing className="absolute right-[2%] top-[22%] w-[38%] opacity-35" mirror={index === 0} />
              <div className="absolute bottom-8 left-10 right-10 h-px bg-black/25" />
              <div className="absolute bottom-12 left-10 font-mono text-[10px] uppercase tracking-[0.24em] text-black/60">
                Titanium / passive NFC / no charge port
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

function CollageField({ progress }: { progress: number }) {
  const shift = (progress - 0.7) * -160;

  return (
    <div data-reveal className="relative min-h-[70vh] overflow-hidden border-y border-white/20 bg-[#efefef] text-black">
      <div
        className="absolute inset-y-0 left-1/2 flex w-[150vw] -translate-x-1/2 items-center justify-center gap-14 opacity-95"
        style={{ transform: `translate3d(calc(-50% + ${shift}px),0,0)` }}
      >
        {Array.from({ length: 7 }).map((_, index) => (
          <TechnicalRing
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            className={`w-[18rem] shrink-0 md:w-[24rem] ${index % 2 === 0 ? "opacity-100" : "opacity-45"}`}
            mirror={index % 2 === 1}
          />
        ))}
      </div>
      <div className="relative z-10 flex min-h-[70vh] flex-col justify-end p-6 md:p-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.36em] text-black/65">Download / Platform</p>
        <h2 className="mt-4 max-w-4xl text-5xl font-semibold uppercase leading-[0.88] md:text-8xl">
          One ring. One profile. No battery ritual.
        </h2>
      </div>
    </div>
  );
}

export function PingStorePage(_: PingStorePageProps) {
  const progress = useScrollProgress();
  useRevealOnScroll();

  const heroTransform = useMemo(() => {
    const y = Math.min(progress * 520, 155);
    const scale = 1 + Math.min(progress * 0.36, 0.16);
    const rotate = Math.min(progress * 18, 7);
    return `translate3d(0, ${y}px, 0) rotate(${rotate}deg) scale(${scale})`;
  }, [progress]);

  return (
    <main className="min-h-screen overflow-x-hidden bg-black font-sans text-white">
      <ScrollRail progress={progress} />

      <style>{`
        .hero-video {
          filter: grayscale(1) contrast(1.18) brightness(0.55);
        }
        .hero-vignette {
          background:
            radial-gradient(circle at 70% 38%, rgba(255,255,255,0.12), transparent 28%),
            linear-gradient(180deg, rgba(0,0,0,0.54), rgba(0,0,0,0.18) 42%, rgba(0,0,0,0.92)),
            linear-gradient(90deg, rgba(0,0,0,0.82), transparent 46%, rgba(0,0,0,0.46));
        }
        .ring-stage {
          --ring-mirror: 1;
          contain: layout paint;
          perspective: 1100px;
          transform: scaleX(var(--ring-mirror));
          transform-style: preserve-3d;
        }
        .ring-body {
          position: absolute;
          inset: 9%;
          border-radius: 9999px;
          transform: rotateX(62deg) rotateZ(-18deg);
          transform-style: preserve-3d;
          background:
            radial-gradient(circle at 36% 24%, rgba(255,255,255,0.8), transparent 11%),
            radial-gradient(circle at 63% 76%, rgba(0,0,0,0.9), transparent 28%),
            conic-gradient(from 210deg, #050505, #f5f5f5 12%, #606060 22%, #070707 37%, #d7d7d7 52%, #1b1b1b 66%, #ededed 78%, #111 100%);
          box-shadow:
            inset 0 0 0 clamp(18px, 3.4vw, 50px) rgba(235,235,235,0.96),
            inset 26px 22px 48px rgba(255,255,255,0.22),
            inset -30px -36px 56px rgba(0,0,0,0.92),
            0 34px 82px rgba(0,0,0,0.78);
        }
        .ring-inner {
          position: absolute;
          inset: 31%;
          border-radius: 9999px;
          background:
            radial-gradient(circle at 44% 30%, rgba(255,255,255,0.16), transparent 34%),
            #020202;
          box-shadow:
            inset 0 0 44px rgba(255,255,255,0.12),
            0 0 0 1px rgba(0,0,0,0.85);
        }
        .ring-rim {
          position: absolute;
          left: 21%;
          right: 21%;
          height: 10%;
          border-radius: 9999px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.92), rgba(0,0,0,0.12), transparent);
          filter: blur(0.2px);
        }
        .ring-rim-top { top: 18%; transform: translateZ(32px); opacity: 0.82; }
        .ring-rim-bottom { bottom: 18%; transform: translateZ(-18px); opacity: 0.34; }
        .ring-highlight {
          position: absolute;
          left: 19%;
          top: 34%;
          width: 62%;
          height: 1px;
          background: rgba(255,255,255,0.62);
          transform: translateZ(46px);
        }
        .ring-nfc-dot {
          position: absolute;
          right: 16%;
          top: 24%;
          width: clamp(7px, 1.2vw, 12px);
          height: clamp(7px, 1.2vw, 12px);
          border-radius: 9999px;
          background: #d9362f;
          box-shadow: 0 0 18px #d9362f;
          transform: translateZ(54px);
        }
        .ring-orbit {
          position: absolute;
          inset: 19%;
          border: 1px solid rgba(255,255,255,0.38);
          border-radius: 9999px;
          transform: rotateX(68deg) rotateZ(-18deg);
        }
        .ring-orbit-back { opacity: 0.24; }
        .ring-orbit-front {
          inset: 13%;
          border-color: rgba(217,54,47,0.72);
          opacity: 0.56;
          transform: rotateX(68deg) rotateZ(-18deg) translateZ(34px);
        }
        .ring-shadow {
          position: absolute;
          left: 12%;
          right: 12%;
          bottom: 6%;
          height: 17%;
          border-radius: 9999px;
          background: radial-gradient(ellipse, rgba(0,0,0,0.68), transparent 70%);
          filter: blur(14px);
        }
        [data-reveal] {
          opacity: 0;
          transform: translateY(56px);
          transition: opacity 900ms ease, transform 900ms cubic-bezier(.2,.75,.1,1);
        }
        [data-reveal][data-visible="true"] {
          opacity: 1;
          transform: translateY(0);
        }
        .ping-marquee {
          animation: ping-marquee 22s linear infinite;
        }
        @keyframes ping-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>

      <header className="fixed left-0 right-0 top-0 z-40 grid grid-cols-[1fr_auto_1fr] items-center border-b border-white/10 bg-black/78 px-5 py-5 text-[10px] uppercase tracking-[0.28em] backdrop-blur md:px-10">
        <a href="#top" className="font-semibold text-white">
          Ping Ring Inc.
        </a>
        <nav className="hidden items-center gap-8 text-white/60 md:flex">
          <a className="transition hover:text-[#d9362f]" href="#products">
            Products
          </a>
          <a className="transition hover:text-[#d9362f]" href="#why">
            Why now
          </a>
          <a className="transition hover:text-[#d9362f]" href="#team">
            Team
          </a>
          <a className="transition hover:text-[#d9362f]" href="#contact">
            Contact
          </a>
        </nav>
        <div className="justify-self-end text-white/60">
          <span className="text-[#d9362f]">ID</span> | NFC
        </div>
      </header>

      <section id="top" className="relative min-h-[145vh] border-b border-white/20 bg-black">
        <div className="sticky top-0 min-h-screen overflow-hidden pt-20">
          <video
            aria-label="Ping ring product motion"
            autoPlay
            className="hero-video absolute inset-0 h-full w-full object-cover"
            loop
            muted
            playsInline
            preload="metadata"
            src="/media/ping-hero.mp4"
          />
          <div className="hero-vignette absolute inset-0" />

          <div className="absolute inset-x-0 top-[10vh] z-0 select-none px-5 md:px-10">
            <h1 className="max-w-full whitespace-nowrap text-center text-[22vw] font-semibold uppercase leading-[0.82] text-white drop-shadow-[0_18px_42px_rgba(0,0,0,0.95)] md:text-[24vw]">
              Ping!
            </h1>
          </div>

          <div className="relative z-10 grid min-h-[calc(100vh-5rem)] grid-rows-[1fr_auto] px-5 pb-8 md:px-10">
            <div className="relative min-h-[50vh] md:min-h-[58vh]">
              <div
                className="absolute inset-x-0 bottom-0 top-[6%] mx-auto flex max-w-6xl items-center justify-center will-change-transform"
                style={{ transform: heroTransform }}
              >
                <TechnicalRing className="w-[min(74vw,48rem)] opacity-95" />
                <TechnicalRing className="absolute right-[4%] top-[2%] hidden w-[min(30vw,18rem)] opacity-[0.26] sm:block" mirror />
                <TechnicalRing className="absolute bottom-[2%] left-[6%] hidden w-[min(22vw,13rem)] opacity-[0.18] sm:block" />
              </div>
            </div>

            <div className="grid gap-6 border-t border-white/20 bg-black/10 pt-6 backdrop-blur-[2px] lg:grid-cols-[0.84fr_1.16fr]">
              <p data-reveal className="max-w-xs text-[10px] uppercase leading-5 tracking-[0.2em] text-white/58">
                Based in real-world connection and working everywhere modern NFC readers already exist.
              </p>
              <div data-reveal className="max-w-3xl justify-self-end text-right">
                <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-[#d9362f]">
                  NFC identity hardware / 2.5g titanium
                </p>
                <p className="mt-4 text-2xl font-medium leading-tight text-white md:text-4xl">
                  Ping! is a titanium NFC ring for identity, portfolios, and bridging an in-person meeting to your digital trail.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid min-h-[50vh] border-b border-white/20 md:grid-cols-[0.86fr_1.14fr]">
        <div data-reveal className="flex items-end border-b border-white/20 p-6 md:border-b-0 md:border-r md:p-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-[#d9362f]">
            Born from text-to-image-to-3D AI workflows
          </p>
        </div>
        <div data-reveal className="flex items-center p-6 md:p-10">
          <h2 className="max-w-4xl text-4xl font-semibold uppercase leading-[0.95] md:text-6xl">
            Not a health tracker. Not a business card. A precise object for the return of human signal.
          </h2>
        </div>
      </section>

      <section id="products">
        <div data-reveal className="grid border-b border-white/20 md:grid-cols-[0.72fr_1.28fr]">
          <div className="p-6 md:p-10">
            <h2 className="text-sm uppercase tracking-[0.32em] text-white/65">Products</h2>
          </div>
          <div className="border-t border-white/20 p-6 md:border-l md:border-t-0 md:p-10">
            <p className="max-w-3xl text-2xl font-medium uppercase leading-tight md:text-4xl">
              A premium hardware gateway to a clean digital identity platform.
            </p>
          </div>
        </div>

        {productLines.map((product, index) => (
          <ProductCard key={product.code} product={product} index={index} progress={progress} />
        ))}
      </section>

      <section id="why" className="border-t border-white/20">
        <div className="grid min-h-screen md:grid-cols-[0.95fr_1.05fr]">
          <div className="sticky top-0 hidden h-screen border-r border-white/20 p-10 md:flex md:flex-col md:justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-[#d9362f]">Why choose Ping!</p>
              <h2 className="mt-5 text-7xl font-semibold uppercase leading-[0.86]">Why now</h2>
            </div>
            <TechnicalRing className="w-[22rem] opacity-70" mirror />
          </div>

          <div>
            {whyNow.map((item, index) => (
              <article
                data-reveal
                key={item.title}
                className="min-h-[56vh] border-b border-white/20 p-6 md:p-10"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-[#d9362f]">
                  0{index + 1} / why now
                </p>
                <h3 className="mt-12 max-w-3xl text-4xl font-semibold uppercase leading-[0.9] md:text-7xl">
                  {item.title}
                </h3>
                <p className="mt-8 max-w-2xl text-sm uppercase leading-7 tracking-[0.08em] text-white/58">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CollageField progress={progress} />

      <section className="border-b border-white/20">
        <div data-reveal className="grid md:grid-cols-[0.7fr_1.3fr]">
          <div className="p-6 md:p-10">
            <h2 className="text-sm uppercase tracking-[0.32em] text-white/65">Why choose</h2>
            <h3 className="mt-3 text-5xl font-semibold uppercase leading-[0.86] md:text-7xl">
              Ping!
            </h3>
          </div>
          <div className="grid border-t border-white/20 md:grid-cols-3 md:border-l md:border-t-0">
            {advantages.map((item) => (
              <article key={item.label} className="min-h-[25rem] border-b border-white/20 p-6 md:border-b-0 md:border-r md:p-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#d9362f]">{item.label}</p>
                <h4 className="mt-12 text-3xl font-semibold uppercase leading-[0.95]">{item.title}</h4>
                <p className="mt-6 text-xs uppercase leading-6 tracking-[0.08em] text-white/56">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="team" className="border-b border-white/20">
        <div data-reveal className="grid min-h-[70vh] md:grid-cols-2">
          <div className="flex flex-col justify-between border-b border-white/20 p-6 md:border-b-0 md:border-r md:p-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-[#d9362f]">Team pedigree</p>
            <h2 className="mt-16 text-5xl font-semibold uppercase leading-[0.86] md:text-8xl">
              Built by AI and product operators.
            </h2>
          </div>
          <div>
            {team.map((person) => (
              <article key={person.name} className="border-b border-white/20 p-6 last:border-b-0 md:p-10">
                <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-[#d9362f]">{person.role}</p>
                <h3 className="mt-6 text-4xl font-semibold uppercase leading-[0.9] md:text-6xl">
                  {person.name}
                </h3>
                <p className="mt-8 max-w-2xl text-sm uppercase leading-7 tracking-[0.08em] text-white/58">
                  {person.detail}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="overflow-hidden border-b border-white/20">
        <div className="ping-marquee flex w-[200%] border-b border-white/20 py-5 font-mono text-[10px] uppercase tracking-[0.32em] text-[#d9362f]">
          <span className="w-1/2">
            Get Ping! / NFC identity ring / real-world connection / 2.5g titanium / native iPhone and Android read /
          </span>
          <span className="w-1/2">
            Get Ping! / NFC identity ring / real-world connection / 2.5g titanium / native iPhone and Android read /
          </span>
        </div>
        <div data-reveal className="grid min-h-[75vh] items-end gap-10 p-6 md:grid-cols-[1.2fr_0.8fr] md:p-10">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-[#d9362f]">Configuration</p>
            <h2 className="mt-6 max-w-5xl text-6xl font-semibold uppercase leading-[0.82] md:text-9xl">
              Tap into signal.
            </h2>
          </div>
          <div className="max-w-md justify-self-end">
            <p className="text-sm uppercase leading-7 tracking-[0.08em] text-white/60">
              Ping! turns the jewelry form factor into a premium gateway for your real-world identity. Share the digital trail you choose without adding another battery-powered device to your life.
            </p>
            <a
              href="https://getping.today"
              className="mt-8 inline-flex border border-[#d9362f] bg-[#d9362f] px-8 py-4 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-black transition hover:bg-black hover:text-[#d9362f]"
            >
              Get Ping!
            </a>
          </div>
        </div>
      </section>

      <footer className="grid gap-8 px-6 py-8 font-mono text-[10px] uppercase tracking-[0.22em] text-white/45 md:grid-cols-3 md:px-10">
        <p>Ping Ring Inc.</p>
        <p>Identity / Portfolios / Physical-to-digital connection</p>
        <p className="md:text-right">NFC native / No health tracking</p>
      </footer>
    </main>
  );
}
