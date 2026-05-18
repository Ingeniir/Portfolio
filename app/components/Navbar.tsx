// app/components/Navbar.tsx

const navLinks = [
  { label: "Accueil", href: "#home" },
  { label: "À propos", href: "#about" },
  { label: "Projets", href: "#projects" },
  { label: "Compétences", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white">
      <div className="max-w-5xl px-8 py-5 flex items-center justify-between">
        <a
          href="#home"
          className="text-sm tracking-widest uppercase text-foreground font-medium"
        >
          Hoareau Cédric
        </a>

        <ul className="flex items-center gap-10">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="relative text-sm text-foreground tracking-wide no-underline group"
              >
                {link.label}

                <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-black transition-all duration-300 ease-in-out group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
