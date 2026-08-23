import {
  BrowserRouter,
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";
import { ArrowUpRight, ChevronLeft, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import "./App.css";

const projects = [
  {
    id: "qubes-firewall",
    index: "01",
    type: "open source",
    title: "The Firewall Race",
    date: "2026",
    short:
      "A readiness signal fired before initialization finished. The bug was intermittent; the fix was not.",
    body:
      "Diagnosed a race condition in qubes-firewall where sd_notify('READY=1') fired before initialization completed, causing unprotected qdb.read() calls to raise InterruptedError. Extended retry protection to every affected call site and added mock-based unit tests with a DummyQubesDB fixture.",
    tags: ["Python", "Linux", "Unit Testing", "Concurrency"],
    href: "https://github.com/QubesOS/qubes-core-agent-linux/pull/644",
    signal: "READY=1",
  },
  {
    id: "synapse32",
    index: "02",
    type: "hardware verification",
    title: "Synapse32 UVM",
    date: "2025—26",
    short: "Directed tests passed. The pipeline still had other ideas.",
    body:
      "Building a full UVM testbench environment in SystemVerilog for the Synapse32 RV32I pipelined processor — complete agent hierarchy, clocking-block interface, and an RV32I reference model. Verified ALU, branch, forwarding, and pipeline flush behavior.",
    tags: ["SystemVerilog", "UVM", "RISC-V", "Coverage"],
    href: "https://github.com/Harshit6-b/synapse32-uvm-verification/tree/uvm_verification",
    signal: "RV32I",
  },
  {
    id: "fpga-tetris",
    index: "03",
    type: "hardware design",
    title: "FPGA Tetris",
    date: "2025",
    short:
      "A whole game rendered by timing counters, logic, and a stubborn VGA cable.",
    body:
      "Designed and implemented a complete VGA graphics pipeline in Verilog on a Xilinx Artix-7 Arty A7-35T FPGA, supporting 640×480 at 60 Hz. Built an interactive Tetris game rendered entirely through hardware-driven VGA output.",
    tags: ["Verilog", "Vivado", "VGA", "Artix-7"],
    href: "https://github.com/Harshit6-b/SRA-FPGA-based-tetris",
    signal: "640×480",
  },
  {
    id: "anti-drone",
    index: "04",
    type: "research / embedded",
    title: "Anti-Drone System",
    date: "2025",
    short:
      "RF sensing, signal analysis, and the security assumptions hiding in navigation.",
    body:
      "Contributed to a UAV detection and countermeasure research project using RF sensing and embedded systems techniques. Evaluated SDR-based signal processing workflows and built Python analysis tools for UAV communication patterns.",
    tags: ["RF Sensing", "Python", "SDR", "Embedded"],
    href: "https://github.com/badboy1606/anti_drone",
    signal: "RF / SDR",
  },
];

const navItems = [
  { label: "lab", to: "/" },
  { label: "projects", to: "/projects" },
  { label: "experience", to: "/experience" },
  { label: "research", to: "/research" },
  { label: "skills", to: "/skills" },
  { label: "contact", to: "/contact" },
];

function Shell({ children }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="site-shell">
      <div className="grain-overlay" aria-hidden="true" />

      <header className="site-header">
        <Link to="/" className="wordmark">
          harshit bhalani
        </Link>

        <button
          className="menu-button"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
        >
          {open ? <X /> : <Menu />}
        </button>

        <nav className={open ? "main-nav open" : "main-nav"}>
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === "/"}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      {children}

      <footer className="site-footer">
        <span>© 2026 / Mumbai, India</span>
        <span>field notes / version 04</span>
        <span style={{ display: "flex", gap: 14 }}>
          <Link className="quiet-link" style={{ margin: 0 }} to="/about">
            about
          </Link>
          <a href="mailto:harshitbhalani6@gmail.com">email ↗</a>
        </span>
      </footer>
    </div>
  );
}

function Home() {
  return (
    <main className="lab-page">
      <p className="lab-kicker">lab log · august 2026</p>

      <section className="intro-block">
        <p>
          I am <strong>Harshit Bhalani</strong>.
        </p>
        <p>
          I architect hardware from the logic up. My work centers on designing
          custom instruction pipelines, managing complex execution hazards, and
          verifying silicon performance.
        </p>
        <p>
          From building multi-stage RISC CPUs in RTL to developing full UVM
          testbenches, I focus on the structural foundations of computing.
        </p>
      </section>

      <section className="log-section">
        <h2>Current quests</h2>
        <p className="section-note">What am I actively working through?</p>
        <ul className="quest-list">
          <li><span>01</span> Pipeline efficiency and complex execution hazards</li>
          <li><span>02</span> Instruction set architecture and custom RISC CPUs</li>
          <li><span>03</span> UVM verification methodologies for pipelined processors</li>
          <li><span>04</span> RTL design, FPGA systems, and hardware-software co-design</li>
        </ul>
      </section>

      <section className="log-section">
        <h2>Latest writing</h2>
        <p className="section-note">Short records from the workbench.</p>

        <div className="writing-list">
          {projects.map((project) => (
            <Link to={`/projects/${project.id}`} className="writing-row" key={project.id}>
              <span className="writing-type">
                {project.type}
                <br />
                {project.date}
              </span>
              <span>
                <strong>{project.title}</strong>
                <small>{project.short}</small>
              </span>
              <ArrowUpRight />
            </Link>
          ))}
        </div>

        <Link className="quiet-link" to="/projects">
          see all project logs →
        </Link>
      </section>

      <section className="log-section split-section">
        <div>
          <h2>Contact</h2>
          <p className="section-note">Places where I might be alive or sane enough to respond.</p>
          <p className="inline-links">
            <a href="mailto:harshitbhalani6@gmail.com">email</a>
            <a href="https://github.com/Harshit6-b" target="_blank" rel="noreferrer">github</a>
            <a href="https://www.linkedin.com/in/harshit-vinod-bhalani-597640323" target="_blank" rel="noreferrer">linkedin</a>
          </p>
        </div>
        <div>
          <h2>Hobbies</h2>
          <p className="section-note">What keeps me away from the waveform viewer?</p>
          <p className="hobby-copy">
            Anime, novels, and movies — especially stories with worlds,
            characters, and systems worth getting lost in.
          </p>
        </div>
      </section>

      <p className="signature">— HB</p>
    </main>
  );
}

function ProjectRow({ project }) {
  return (
    <Link to={`/projects/${project.id}`} className="writing-row">
      <span className="writing-type">
        {project.type}
        <br />
        {project.date}
      </span>
      <span>
        <strong>{project.title}</strong>
        <small>{project.short}</small>
      </span>
      <ArrowUpRight />
    </Link>
  );
}

function Projects() {
  return (
    <Page title="Project logs" kicker="archive / selected work" intro="The work, in short records.">
      <div className="writing-list">
        {projects.map((project) => (
          <ProjectRow project={project} key={project.id} />
        ))}
      </div>
    </Page>
  );
}

function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find((item) => item.id === id) || projects[0];

  return (
    <Page title={project.title} kicker={`${project.type} / ${project.date}`} intro={project.short}>
      <article className="detail-record">
        <p className="mono">signal / {project.signal}</p>
        <p className="detail-copy">{project.body}</p>
        <div className="tag-row">
          {project.tags.map((tag) => (
            <span className="tag" key={tag}>{tag}</span>
          ))}
        </div>
        <div className="detail-actions">
          <a className="button" href={project.href} target="_blank" rel="noreferrer">
            source <ArrowUpRight size={13} />
          </a>
          <Link to="/projects" className="quiet-link">
            <ChevronLeft size={14} /> all logs
          </Link>
        </div>
      </article>
    </Page>
  );
}

function Page({ title, kicker, intro, children }) {
  return (
    <main className="lab-page inner-page">
      <p className="lab-kicker">{kicker}</p>
      <div className="page-heading">
        <h1>{title}</h1>
        <p>{intro}</p>
      </div>
      {children}
    </main>
  );
}

function StandardPage({ type }) {
  const content = {
    experience: [
      "Experience",
      "field work / current and future",
      "One experience is recorded here so far: at CADSL, IIT Bombay, I designed IITB-RISC-26, a 6-stage pipelined RISC CPU in RTL. This page will grow with future internships, research roles, and engineering work.",
    ],
    research: [
      "Research",
      "architecture questions I keep returning to",
      "Pipeline efficiency, instruction set architecture, and hardware verification methodologies. I'm interested in how instruction design, execution hazards, and verification strategy shape the performance and correctness of a processor.",
    ],
    skills: [
      "Skills",
      "materials & training",
      "Digital logic · RTL development · Verilog · SystemVerilog · C/C++ · Python · Vivado · UVM · GNU Radio · ROS 2 · Git",
    ],
    contact: [
      "Contact",
      "correspondence",
      "Looking for opportunities in processor architecture, RTL design, pipeline verification, and hardware-software co-design.",
    ],
  }[type];

  return (
    <Page title={content[0]} kicker={content[1]} intro={content[2]}>
      <div className="simple-record">
        <p>{content[2]}</p>

        {type === "experience" && (
          <ul className="quest-list">
            <li><span>01</span> CADSL / IIT Bombay — RTL Design Intern</li>
            <li><span>+</span> Future experiences to be added</li>
          </ul>
        )}

        {type === "research" && (
          <ul className="quest-list">
            <li><span>01</span> Pipeline efficiency</li>
            <li><span>02</span> Instruction set architecture</li>
            <li><span>03</span> Hardware verification methodologies</li>
          </ul>
        )}

        {type === "skills" && (
          <div className="tag-row">
            {content[2].split(" · ").map((item) => (
              <span className="tag" key={item}>{item}</span>
            ))}
          </div>
        )}

        {type === "contact" && (
          <a className="button" href="mailto:harshitbhalani6@gmail.com">
            email Harshit <ArrowUpRight size={13} />
          </a>
        )}
      </div>
    </Page>
  );
}

function About() {
  return (
    <Page
      title="About"
      kicker="origin story"
      intro="A hardware-focused systems student designing the brain of the machine."
    >
      <div className="simple-record">
        <p>
          I architect hardware from the logic up, with a focus on custom
          instruction pipelines, execution hazards, and verification methodology.
        </p>
        <p className="mono">VJTI / Electronics & Telecommunication / CGPA 9.02 / 10 / graduating 2028</p>
      </div>
    </Page>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Shell>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/experience" element={<StandardPage type="experience" />} />
          <Route path="/research" element={<StandardPage type="research" />} />
          <Route path="/skills" element={<StandardPage type="skills" />} />
          <Route path="/contact" element={<StandardPage type="contact" />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Shell>
    </BrowserRouter>
  );
}

export default App;
