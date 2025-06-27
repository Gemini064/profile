import React, { useState, useMemo, useCallback, memo, useEffect } from "react";
import { ExternalLink, XIcon } from "lucide-react";
import { Parallax, ParallaxBanner } from "react-scroll-parallax";
import { DesignWorks } from "../data/designWorks";

const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= breakpoint);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, [breakpoint]);

  return isMobile;
};

type WorkType = {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  technologies: string[];
  featured: boolean;
};

const DesignsSection: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <section
      id="works"
      className="relative overflow-hidden min-h-screen bg-gradient-to-"
    >
      <ParallaxBanner
        className="relative md:h-screen h-[350px] bg-fixed bg-cover bg-center aspect-[2/1]"
        layers={[
          {
            image: "/scene.jpg",
            speed: isMobile ? -10 : -40,
            shouldAlwaysCompleteAnimation: true,
          },
          {
            image: "/scene.png",
            speed: isMobile ? -5 : -20,
            shouldAlwaysCompleteAnimation: true,
          },
        ]}
      >
        <div className="absolute inset-0 flex items-center justify-center z-10 mb-20">
          <Parallax
            scale={isMobile ? [1, 1.4] : [1, 1.8]}
            shouldAlwaysCompleteAnimation={true}
          >
            <h1 className="text-4xl sm:text-6xl md:text-8xl text-white font-bold text-center px-4">
              Design Storybook
            </h1>
          </Parallax>
        </div>

        <Parallax
          className="absolute w-[300px] h-[300px] md:w-[900px] md:h-[900px] -bottom-10 md:-bottom-60"
          opacity={[0.5, 1]}
          translateX={isMobile ? [-40, 0] : [-50, 0]}
          shouldAlwaysCompleteAnimation={true}
        >
          <img src="/cloud.png" alt="Cloud" className="w-full h-full" />
        </Parallax>

        <Parallax
          className="absolute w-[300px] h-[300px] md:w-[900px] md:h-[900px] -bottom-10 md:-bottom-60 right-0"
          opacity={[0.5, 1]}
          translateX={isMobile ? [40, 0] : [50, 0]}
          shouldAlwaysCompleteAnimation={true}
        >
          <img src="/cloud.png" alt="Cloud" className="w-full h-full" />
        </Parallax>
      </ParallaxBanner>

      <div>
        {DesignWorks.map((work, index) => (
          <MemoizedStoryScene key={work.id} work={work} index={index} />
        ))}
      </div>
    </section>
  );
};

const StoryScene: React.FC<{ work: WorkType; index: number }> = ({
  work,
  index,
}) => {
  const isMobile = useIsMobile();
  const [isDesignModalOpen, setIsDesignModalOpen] = useState(false);
  const isEven = useMemo(() => index % 2 === 0, [index]);

  const openModal = useCallback(() => setIsDesignModalOpen(true), []);
  const closeModal = useCallback(() => setIsDesignModalOpen(false), []);

  return (
    <section id="designs">
      <ParallaxBanner
        className="relative md:h-screen h-[780px] bg-cover bg-center bg-fixed aspect-[2/1] place-content-center"
        layers={[
          {
            image: work.image,
            speed: isMobile ? -20 : -40,
            shouldAlwaysCompleteAnimation: true,
          },
          {
            image: work.image,
            speed: isMobile ? -10 : -20,
            shouldAlwaysCompleteAnimation: true,
          },
        ]}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/80 to-black/40 backdrop-blur-lg" />

        <div
          className={`flex flex-col mx-auto max-w-7xl px-4 ${
            isEven ? "md:flex-row" : "md:flex-row-reverse"
          } gap-8 md:gap-16 min-h-[70vh] py-12 md:py-0`}
        >
          <div className="w-full md:w-1/3 h-64 md:h-auto overflow-hidden">
            <ParallaxBanner className="relative h-full">
              <ParallaxBanner
                className="bg-cover w-full h-full aspect-[2/1]"
                layers={[
                  {
                    image: `${work.image}`,
                    speed: isEven ? (isMobile ? -10 : -20) : isMobile ? 10 : 20,
                    shouldAlwaysCompleteAnimation: true,
                  },
                ]}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

              {work.featured && (
                <div className="absolute top-6 right-6 px-4 py-2 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 text-sm font-bold rounded-full shadow-lg">
                  Featured Story
                </div>
              )}
            </ParallaxBanner>
          </div>

          <Parallax
            className="w-full md:w-1/2 flex flex-col justify-center p-4 md:p-12"
            speed={isMobile ? 1 : -10}
            shouldAlwaysCompleteAnimation={true}
          >
            <div>
              <span className="text-sm font-medium text-accent-400 uppercase tracking-widest">
                Chapter {index + 1} • {work.category}
              </span>
              <h3 className="text-2xl md:text-4xl font-bold gradient-text mt-4 mb-6">
                {work.title}
              </h3>
              <p className="text-slate-200 text-base md:text-lg leading-relaxed mb-6 md:mb-8">
                {work.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
              {work.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 bg-slate-700/50 text-slate-200 text-xs md:text-sm rounded-full hover:bg-amber-500 hover:text-slate-900 transition-all duration-300"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div>
              <button
                onClick={openModal}
                className="inline-flex cursor-pointer items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-medium rounded-full hover:from-primary-800 hover:to-secondary-800 transition-all duration-300 group shadow-lg"
              >
                <span>View Design</span>
                <ExternalLink className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </button>
            </div>
          </Parallax>
        </div>

        {isDesignModalOpen && <DesignModal work={work} onClose={closeModal} />}
      </ParallaxBanner>
    </section>
  );
};

const DesignModal: React.FC<{ work: WorkType; onClose: () => void }> = memo(
  ({ work, onClose }) => (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/50 backdrop-blur-lg"
      onClick={onClose}
    >
      <div
        className="relative max-w-6xl w-full max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-amber-400 transition-colors cursor-pointer"
        >
          <XIcon className="w-8 h-8" />
        </button>

        <div className="overflow-hidden rounded-xl border-4 border-white/20 shadow-2xl">
          <img
            src={work.image}
            alt={`Full view of ${work.title}`}
            className="w-full h-auto object-contain max-h-[80vh]"
            loading="lazy"
          />
        </div>

        <div className="mt-4 text-center text-white">
          <p className="text-lg font-semibold">{work.title}</p>
        </div>
      </div>
    </div>
  )
);

const MemoizedStoryScene = memo(StoryScene);

export default DesignsSection;
