"use client";

import Image from "next/image";
import { CSSProperties, useEffect, useState } from "react";
import { getBaseUrl } from "./lib/site";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

const experiences = [
  {
    role: "Software Engineer Intern",
    company: "CVS Health",
    period: "May 2025 - Present",
    details:
      "Contributed to frontend and backend development for an internal platform, focusing on API testing, data integration, UI improvements, and technical documentation.",
  },
  {
    role: "Spark! Software Special Initiatives Intern",
    company: "BU Spark!",
    period: "2024 - Present",
    details:
      "Supported software engineering projects for external clients by preparing code, scoping technical work, conducting research, and managing project deliverables.",
  },
  {
    role: "Website Manager",
    company: "Student-Made, Boston University",
    period: "2025-2026",
    details:
      "Managed and updated an online store website by maintaining product listings, improving site organization, and supporting a smooth customer shopping experience.",
  },
];

const projects = [
  {
    title: "AloAngels",
    description:
      "Built a responsive React and TypeScript platform that connects early-stage businesses and startups with relevant venture capitalists. After launch, the platform reached active users in 54+ countries and gained its first paying customer within 72 hours.",
  },
  {
    title: "Involvemint",
    description:
      "",
  },
  {
    title: "PM Ready",
    description:
      "Lead the software team in developing a web application that provides resources, mentorship, and community support for aspiring product managers.",
  },
];

const skills = [
  "TypeScript",
  "JavaScript",
  "Python",
  "Angular",
  "Java",
  "React",
  "Next.js",
  "Node.js",
  "Tailwind CSS",
  "PostgreSQL",
  "C++",
];

const experienceShots = [
  "/shots/exp-01.svg",
  "/shots/exp-02.svg",
  "/shots/exp-03.svg",
  "/shots/exp-04.svg",
  "/shots/exp-05.svg",
  "/shots/exp-06.svg",
];

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [scrollRatio, setScrollRatio] = useState(0);
  const [sectionProgress, setSectionProgress] = useState({
    about: 0,
    experience: 0,
    projects: 0,
    skills: 0,
    contact: 0,
  });

  useEffect(() => {
    const getSectionProgress = (id: string) => {
      const element = document.getElementById(id);
      if (!element) {
        return 0;
      }

      const rect = element.getBoundingClientRect();
      const viewport = window.innerHeight;
      const total = rect.height + viewport;
      const traveled = viewport - rect.top;

      return clamp(traveled / total, 0, 1);
    };

    const onScroll = () => {
      const current = window.scrollY;
      setScrollY(current);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollRatio(max > 0 ? current / max : 0);
      setSectionProgress({
        about: getSectionProgress("about"),
        experience: getSectionProgress("experience"),
        projects: getSectionProgress("projects"),
        skills: getSectionProgress("skills"),
        contact: getSectionProgress("contact"),
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-scroll]"));
    if (!elements.length) {
      return;
    }

    const update = () => {
      const viewport = window.innerHeight;

      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const progress = clamp((viewport - rect.top) / (viewport + rect.height), 0, 1);
        element.style.setProperty("--scroll-progress", progress.toFixed(3));
        element.style.setProperty("--scroll-shift", `${((1 - progress) * 34).toFixed(2)}px`);
      });
    };

    const onTick = () => window.requestAnimationFrame(update);

    update();
    window.addEventListener("scroll", onTick, { passive: true });
    window.addEventListener("resize", onTick);

    return () => {
      window.removeEventListener("scroll", onTick);
      window.removeEventListener("resize", onTick);
    };
  }, []);

  const orbOneStyle: CSSProperties = {
    transform: `translate3d(-50%, ${scrollY * 0.16}px, 0)`,
  };
  const orbTwoStyle: CSSProperties = {
    transform: `translate3d(35%, ${scrollY * -0.22}px, 0)`,
  };
  const heroAsideStyle: CSSProperties = {
    transform: `translateY(${scrollY * -0.09}px)`,
  };
  const boundedSlowOffset = (scrollRatio - 0.5) * 38;
  const boundedFastOffset = (scrollRatio - 0.5) * 58;
  const trackStyle: CSSProperties = {
    transform: `scaleX(${Math.max(scrollRatio, 0.04)})`,
  };
  const sectionParallaxSlow: CSSProperties = {
    transform: `translateY(${boundedSlowOffset}px)`,
  };
  const sectionParallaxFast: CSSProperties = {
    transform: `translateY(${boundedFastOffset}px)`,
  };
  const experienceHeadStyle: CSSProperties = {
    transform: `translateY(${(sectionProgress.experience - 0.5) * -56}px)`,
  };
  const projectsHeadStyle: CSSProperties = {
    transform: `translateY(${(sectionProgress.projects - 0.5) * -62}px)`,
  };
  const skillsHeadStyle: CSSProperties = {
    transform: `translateY(${(sectionProgress.skills - 0.5) * -46}px)`,
  };
  const experienceLayerStyle: CSSProperties = {
    transform: `translateY(${(sectionProgress.experience - 0.5) * 84}px)`,
  };
  const projectsLayerStyle: CSSProperties = {
    transform: `translateY(${(sectionProgress.projects - 0.5) * -78}px)`,
  };
  const skillsLayerStyle: CSSProperties = {
    transform: `translateY(${(sectionProgress.skills - 0.5) * 62}px)`,
  };
  const aboutLayerStyle: CSSProperties = {
    transform: `translateY(${(sectionProgress.about - 0.5) * -52}px)`,
  };
  const contactLayerStyle: CSSProperties = {
    transform: `translateY(${(sectionProgress.contact - 0.5) * 52}px)`,
  };
  const siteUrl = getBaseUrl();
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Samantha Pang",
    jobTitle: "Software Engineer",
    url: siteUrl,
    email: "mailto:samanthap8675@gmail.com",
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Boston University",
    },
    sameAs: ["https://www.linkedin.com/in/samantha-pang-08a607221/"],
  };
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Samantha Pang Portfolio",
    url: siteUrl,
  };

  return (
    <div className="portfolio">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <div className="texture" />
      <div className="orb orb-one" style={orbOneStyle} />
      <div className="orb orb-two" style={orbTwoStyle} />
      <div className="scroll-track" style={trackStyle} />

      <header className="topbar">
        <p className="wordmark">Samantha Pang</p>
        <nav>
          <a href="#about">About</a>
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
          <a href="/Samantha_Pang_Resume.pdf" target="_blank" rel="noopener noreferrer">Resume</a>
        </nav>
      </header>

      <main>
        <section className="hero reveal is-visible">
          <div className="hero-copy" data-scroll="text">
            <p className="eyebrow" data-scroll="text">Software Engineer</p>
            <h1 data-scroll="text">
              I build software
            </h1>
            <p className="lead" data-scroll="text">
              A library of my work, thoughts, and ongoing experiments
            </p>
            <button className="ghost-button" data-scroll="text"><a href="#contact">Contact Me</a></button>
          </div>

          <aside className="hero-aside" data-scroll="object" style={heroAsideStyle}>
            <div className="mini-cube cube-one" aria-hidden>
              <span className="mini-face front" />
              <span className="mini-face back" />
              <span className="mini-face left" />
              <span className="mini-face right" />
              <span className="mini-face top" />
              <span className="mini-face bottom" />
            </div>
            <div className="mini-cube cube-two" aria-hidden>
              <span className="mini-face front" />
              <span className="mini-face back" />
              <span className="mini-face left" />
              <span className="mini-face right" />
              <span className="mini-face top" />
              <span className="mini-face bottom" />
            </div>
          </aside>

        </section>

        <section id="about" className="section reveal">
          <div className="section-parallax-lines" style={aboutLayerStyle} aria-hidden />
          <p className="section-label" data-scroll="text">About</p>
          <h2 data-scroll="text">This is me</h2>
          <p data-scroll="text">
            Hello! I'm Samantha, a current senior at Boston University studying Computer Science with a minor in innovation and entrepreneurship. I'm originally from New York. A lot of my work and experience revolves around full stack development. I have experience in both frontend and backend development, as well as experience in data engineering, data analytics, genAI engineering and design work. My biggest passions lies in the intersection of technology and business. 
          </p>
        </section>

        <section id="experience" className="section reveal" data-motif="experience">
          <div className="section-parallax-lines" style={experienceLayerStyle} aria-hidden />
          <div className="section-head" style={{ ...sectionParallaxSlow, ...experienceHeadStyle }}>
            <p className="section-label" data-scroll="text">Experience</p>
            <h2 data-scroll="text">Roles & Experiences</h2>
          </div>
          <div className="scroll-layout">
            <div className="motif-column" aria-hidden>
              <div className="sticky-motif" data-scroll="object">
                <div className="photo-marquee">
                  <div className="photo-track">
                    {[...experienceShots, ...experienceShots].map((shot, index) => (
                      <div className="photo-frame" key={`${shot}-${index}`}>
                        <Image src={shot} alt="Experience snapshot" width={480} height={280} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flow-content">
              {experiences.map((item, index) => {
                const visibility = clamp(sectionProgress.experience * 1.45 - index * 0.26, 0, 1);
                const timelineStyle: CSSProperties = {
                  opacity: 1,
                  transform: `translateY(${(1 - visibility) * 44}px)`,
                };

                return (
                  <article key={item.role + item.company} className="timeline-item" style={timelineStyle}>
                    <p className="timeline-meta">{item.period}</p>
                    <h3>
                      {item.role} <span className="company-name">· {item.company}</span>
                    </h3>
                    <p>{item.details}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="projects" className="section reveal" data-motif="projects">
          <div className="section-parallax-lines alt" style={projectsLayerStyle} aria-hidden />
          <div className="section-head" style={{ ...sectionParallaxFast, ...projectsHeadStyle }}>
            <p className="section-label" data-scroll="text">Projects</p>
            <h2 data-scroll="text">Things I've Built</h2>
          </div>
          <div className="project-grid">
            {projects.map((project, index) => {
              const visibility = clamp(sectionProgress.projects * 1.5 - index * 0.23, 0, 1);
              const cardStyle: CSSProperties = {
                opacity: 0.24 + visibility * 0.76,
                transform: `translateY(${(1 - visibility) * 52}px)`,
              };

              return (
                <article key={project.title} className="project-card" style={cardStyle}>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </article>
              );
            })}
          </div>
        </section>

        <section id="skills" className="section reveal" data-motif="skills">
          <div className="section-parallax-lines" style={skillsLayerStyle} aria-hidden />
          <p className="section-label" data-scroll="text">Skills</p>
          <br></br>
          <h2 style={skillsHeadStyle}>Languages and tools I use confidently.</h2>
          <div className="skills-wrap">
            {skills.map((skill, index) => {
              const offset = (index % 4) * 6;
              const speed = 0.4 + (index % 5) * 0.18;
              const skillStyle: CSSProperties = {
                transform: `translateY(${(scrollY * 0.03 * speed + offset) % 30}px)`,
              };

              return (
                <span key={skill} className="skill-chip" style={skillStyle}>
                  {skill}
                </span>
              );
            })}
          </div>
        </section>

        <section id="contact" className="section reveal">
          <div className="section-parallax-lines alt" style={contactLayerStyle} aria-hidden />
          <p className="section-label" data-scroll="text">Contact</p>
          <h2 data-scroll="text">Let's connect!</h2>
          <p data-scroll="text">
            Always happy to collaboration, project ideas, coffee chats, or just a hello!
          </p>
          <div className="contact-actions" data-scroll="text">
            <a className="ghost-button" href="mailto:samanthap8675@gmail.com">
              samanthap8675@gmail.com
            </a>
            <a
              className="ghost-button"
              href="https://www.linkedin.com/in/samantha-pang-08a607221/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
