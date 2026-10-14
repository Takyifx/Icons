import { type FormEvent, type SyntheticEvent, useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  ArrowUp,
  Building2,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Hammer,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  ShieldCheck,
  Truck,
  X,
} from 'lucide-react';
import crane1 from './assets/cranes/crane-1.jpeg';
import crane2 from './assets/cranes/crane-2.jpeg';
import crane3 from './assets/cranes/crane-3.jpeg';
import crane4 from './assets/cranes/crane-4.jpeg';
import crane5 from './assets/cranes/crane-5.jpeg';
import crane6 from './assets/cranes/crane-6.jpeg';
import crane7 from './assets/cranes/crane-7.jpeg';

const BUSINESS_NAME = 'Mobile Crane Services';
const WHATSAPP_NUMBER = '233248532224';
const WHATSAPP_LOCAL = '0248532224';
const WHATSAPP_DISPLAY = '+233 24 853 2224';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'About Us', href: '#about' },
  { label: 'Why Choose Us', href: '#why-choose-us' },
  { label: 'Contact', href: '#contact' },
];

const services = [
  {
    title: 'Heavy Load Lifting',
    description:
      'Mobile crane support for lifting heavy materials such as steel, machinery, and concrete, subject to equipment capacity and site conditions.',
    image: crane1,
    tag: 'Heavy Lifting',
  },
  {
    title: 'Construction Work',
    description:
      'Crane support for lifting and positioning building materials during construction projects.',
    image: crane2,
    tag: 'Site Support',
  },
  {
    title: 'Loading and Unloading',
    description:
      'Support for loading and unloading heavy goods, machinery, and materials from suitable transport vehicles.',
    image: crane3,
    tag: 'Freight Handling',
  },
  {
    title: 'Heavy Equipment Relocation',
    description:
      'Safe movement of large machinery and equipment between locations with careful planning and site coordination.',
    image: crane4,
    tag: 'Machine Moves',
  },
  {
    title: 'Road and Bridge Construction',
    description:
      'Crane support for infrastructure work involving beams, structural components, and materials handling.',
    image: crane5,
    tag: 'Infrastructure',
  },
  {
    title: 'Recovery Operations',
    description:
      'Assistance for vehicle or equipment recovery where lifting and controlled movement are needed.',
    image: crane6,
    tag: 'Recovery',
  },
  {
    title: 'Equipment Installation',
    description:
      'Precise crane positioning for equipment installation in industrial, commercial, and construction settings.',
    image: crane7,
    tag: 'Installation',
  },
];

const galleryImages = [
  {
    title: 'Construction Lifting',
    category: 'Construction',
    image: crane1,
  },
  {
    title: 'Heavy Load Move',
    category: 'Heavy Lifting',
    image: crane2,
  },
  {
    title: 'Industrial Equipment',
    category: 'Equipment Handling',
    image: crane3,
  },
  {
    title: 'Transport Loading',
    category: 'Loading and Unloading',
    image: crane4,
  },
  {
    title: 'Infrastructure Support',
    category: 'Road & Bridge',
    image: crane5,
  },
  {
    title: 'Recovery Assistance',
    category: 'Recovery',
    image: crane6,
  },
];

function buildWhatsAppLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<(typeof galleryImages)[number] | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: services[0].title,
    message: '',
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const reduceMotion = useReducedMotion();

  const handleImageError = (event: SyntheticEvent<HTMLImageElement>) => {
    const target = event.currentTarget;
    if (target.dataset.fallbackApplied === 'true') {
      return;
    }
    target.dataset.fallbackApplied = 'true';
    target.src = crane1;
    target.alt = 'Crane service fallback image';
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
    setFormErrors((current) => ({ ...current, [field]: '' }));
  };

  const validateForm = () => {
    const nextErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      nextErrors.name = 'Please enter your name.';
    }

    if (!formData.phone.trim()) {
      nextErrors.phone = 'Please enter a contact number.';
    } else if (formData.phone.replace(/\D/g, '').length < 9) {
      nextErrors.phone = 'Please enter a valid phone number.';
    }

    if (!formData.service.trim()) {
      nextErrors.service = 'Please choose a service.';
    }

    if (!formData.message.trim()) {
      nextErrors.message = 'Please tell us about your lifting requirement.';
    } else if (formData.message.trim().length < 12) {
      nextErrors.message = 'Please provide a few more details about the lifting requirement.';
    }

    setFormErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const message = `Hello, my name is ${formData.name}. I need support for ${formData.service}. My contact number is ${formData.phone}. Project details: ${formData.message}`;
    window.open(buildWhatsAppLink(message), '_blank', 'noopener,noreferrer');
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      setShowBackToTop(window.scrollY > 450);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!selectedImage) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedImage(null);
      }

      if (event.key === 'ArrowRight') {
        goToImage(1);
      }

      if (event.key === 'ArrowLeft') {
        goToImage(-1);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedImage]);

  const goToImage = (direction: number) => {
    if (!selectedImage) return;
    const nextIndex = (galleryImages.findIndex((item) => item.title === selectedImage.title) + direction + galleryImages.length) % galleryImages.length;
    setCurrentImageIndex(nextIndex);
    setSelectedImage(galleryImages[nextIndex]);
  };

  const fadeUp = reduceMotion
    ? undefined
    : {
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0 },
      };

  return (
    <div className="min-h-screen bg-[#F3F5F7] text-[#252B33]">
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled ? 'border-b border-white/10 bg-[#101C2C]/95 shadow-lg' : 'bg-[#101C2C]'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a href="#home" className="flex items-center gap-3 text-white">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#F5B82E]/40 bg-[#203B59] text-[#F5B82E]">
              <Hammer className="h-5 w-5" />
            </div>
            <div>
              <p className="font-display text-base font-bold tracking-wider text-white">{BUSINESS_NAME}</p>
              <p className="text-[10px] uppercase tracking-[0.25em] text-slate-300">Madina, Ghana</p>
            </div>
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="text-sm font-medium text-slate-200 transition hover:text-[#F5B82E]">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a href={`tel:${WHATSAPP_LOCAL}`} className="inline-flex items-center gap-2 text-sm font-semibold text-white transition hover:text-[#F5B82E]">
              <Phone className="h-4 w-4" />
              {WHATSAPP_LOCAL}
            </a>
            <a
              href={buildWhatsAppLink('Hello, I would like to request a crane service.')}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#F5B82E] px-5 py-3 text-sm font-bold text-[#101C2C] transition hover:bg-[#f7c855]"
            >
              Request a Crane
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-700 text-white lg:hidden"
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="border-t border-slate-800 bg-[#101C2C] lg:hidden"
            >
              <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:px-6">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="text-sm font-medium text-slate-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
                <a
                  href={buildWhatsAppLink('Hello, I would like to request a crane service.')}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#F5B82E] px-5 py-3 text-sm font-bold text-[#101C2C]"
                >
                  Request a Crane
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        <section id="home" className="hero-scene relative overflow-hidden bg-[#101C2C]">
          <div className="hero-video-bg absolute inset-0">
            <div className="hero-grid absolute inset-0" />
            <div className="hero-glow hero-glow--gold" />
            <div className="hero-glow hero-glow--blue" />
            <div className="hero-scan" />
          </div>
          <div className="absolute -left-10 top-28 h-52 w-52 rounded-full border border-[#F5B82E]/25" />
          <div className="absolute right-12 top-20 h-32 w-32 rounded-full border border-[#F5B82E]/25" />
          <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:px-8 lg:py-24">
            <motion.div
              initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className="flex flex-col justify-center"
            >
              <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-[#F5B82E]/40 bg-[#203B59] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.26em] text-[#F5B82E]">
                <span className="inline-block h-2 w-2 rounded-full bg-[#F5B82E]" />
                Mobile Crane Services | Madina, Ghana
              </div>

              <motion.h1
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.08 }}
                className="max-w-xl font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl"
              >
                Reliable Crane Services for Every Lift.
              </motion.h1>

              <motion.p
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.18 }}
                className="mt-6 max-w-lg text-lg leading-8 text-slate-200"
              >
                From heavy load lifting to construction support and equipment installation, get in touch with us for your mobile crane service requirements.
              </motion.p>

              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.28 }}
                className="mt-8 flex flex-col gap-4 sm:flex-row"
              >
                <a
                  href={buildWhatsAppLink('Hello, I would like to request a crane service for my project.')}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#F5B82E] px-6 py-3.5 text-base font-bold text-[#101C2C] transition hover:scale-[1.01] hover:bg-[#f7c855]"
                >
                  Request a Crane
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#services"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 px-6 py-3.5 text-base font-semibold text-white transition hover:border-[#F5B82E]/60 hover:text-[#F5B82E]"
                >
                  Explore Our Services
                </a>
              </motion.div>

              <div className="mt-10 flex flex-wrap items-center gap-5 text-sm text-slate-200">
                <div className="inline-flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#F5B82E]" />
                  Construction support
                </div>
                <div className="inline-flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#F5B82E]" />
                  Equipment handling
                </div>
                <div className="inline-flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#F5B82E]" />
                  Project coordination
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, x: 40 }}
              animate={reduceMotion ? undefined : { opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.12 }}
              className="relative"
            >
              <motion.div
                animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
                transition={{ duration: 4.2, ease: 'easeInOut', repeat: Infinity }}
                className="absolute -left-8 top-10 hidden h-28 w-28 rounded-full border-[10px] border-[#F5B82E]/40 lg:block"
              />
              <motion.div
                animate={reduceMotion ? undefined : { y: [0, 10, 0] }}
                transition={{ duration: 5, ease: 'easeInOut', repeat: Infinity }}
                className="absolute -right-6 bottom-10 hidden h-20 w-20 rounded-full border-[7px] border-[#F5B82E]/30 lg:block"
              />
              <motion.div
                whileHover={reduceMotion ? undefined : { scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="hero-media-card overflow-hidden rounded-[2rem] border border-white/10 bg-slate-100 shadow-[0_30px_60px_rgba(0,0,0,0.18)]"
              >
                <div className="relative">
                  <motion.img
                    src={crane1}
                    alt="Mobile crane lifting materials at a construction site"
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    animate={reduceMotion ? undefined : { scale: [1, 1.04, 1] }}
                    transition={{ duration: 9, ease: 'easeInOut', repeat: Infinity }}
                    className="h-[560px] w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b1a2b]/45 via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-5 rounded-2xl border border-white/20 bg-[#101C2C]/70 p-4 backdrop-blur-sm">
                    <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#F5B82E]">On-site support</p>
                    <p className="mt-2 text-xl font-bold text-white">Project-ready lifting</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section id="services" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <motion.div
            initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl text-center"
          >
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#203B59]">Our Crane Services</p>
            <h2 className="mt-4 font-display text-3xl font-extrabold text-[#101C2C] sm:text-4xl">
              Lifting solutions for construction, industrial work, and equipment movement.
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Practical lifting solutions for construction, industrial work, equipment movement, and other heavy lifting requirements.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service, index) => (
              <motion.article
                key={service.title}
                initial={reduceMotion ? false : { opacity: 0, y: 22 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                whileHover={reduceMotion ? undefined : { y: -8, scale: 1.01 }}
                className="group overflow-hidden rounded-[1.6rem] border border-slate-200 bg-white shadow-sm transition hover:border-[#F5B82E]/60"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    loading="lazy"
                    decoding="async"
                    onError={handleImageError}
                    className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-[#101C2C]/80 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#F5B82E] backdrop-blur-sm">
                    {service.tag}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-2xl font-bold text-[#101C2C]">{service.title}</h3>
                  <p className="mt-3 text-base leading-7 text-slate-600">{service.description}</p>
                  <a
                    href={buildWhatsAppLink(`Hello, I need support for ${service.title}. Please tell me more.`)}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-[#203B59] transition hover:text-[#F5B82E]"
                  >
                    Request This Service
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="gallery" className="bg-[#101C2C] py-20 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
              className="mx-auto max-w-3xl text-center"
            >
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#F5B82E]">Our Work in Action</p>
              <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-4xl">
                Explore the lifting and heavy equipment support we can assist with.
              </h2>
              <p className="mt-4 text-lg text-slate-300">
                Explore the different lifting, construction, and equipment-handling applications supported by mobile cranes.
              </p>
            </motion.div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {galleryImages.map((image, index) => (
                <motion.button
                  key={image.title}
                  type="button"
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.45, delay: index * 0.06 }}
                  onClick={() => {
                    setCurrentImageIndex(index);
                    setSelectedImage(image);
                  }}
                  className="group relative overflow-hidden rounded-[1.4rem] border border-slate-700 text-left"
                >
                  <img
                    src={image.image}
                    alt={image.title}
                    loading="lazy"
                    decoding="async"
                    onError={handleImageError}
                    className="h-80 w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101C2C]/90 via-[#101C2C]/15 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <span className="inline-flex rounded-full border border-[#F5B82E]/40 bg-[#203B59]/80 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#F5B82E]">
                      {image.category}
                    </span>
                    <p className="mt-3 text-xl font-bold text-white">{image.title}</p>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <motion.div
              initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
              className="order-2 lg:order-1"
            >
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#203B59]">About the Business</p>
              <h2 className="mt-4 font-display text-3xl font-extrabold text-[#101C2C] sm:text-4xl">
                Reliable lifting support for busy construction and industrial projects.
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                The business provides mobile crane services for lifting heavy loads, construction work, loading and unloading, heavy equipment relocation, road and bridge construction, recovery operations, and equipment installation.
              </p>

              <div className="mt-8 space-y-5 text-slate-700">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F5B82E]/15 text-[#203B59]">
                    <Truck className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-bold text-[#101C2C]">Responsive service coordination</p>
                    <p className="mt-1 text-base">Discuss your lifting location, equipment needs, and project timing.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F5B82E]/15 text-[#203B59]">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-bold text-[#101C2C]">Safety-conscious project support</p>
                    <p className="mt-1 text-base">Talk through lifting requirements and site considerations before work begins.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, x: 28 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="order-1 lg:order-2"
            >
              <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-3 shadow-xl">
                <img
                  src={crane5}
                  alt="Mobile crane working on a construction site"
                  loading="lazy"
                  decoding="async"
                  onError={handleImageError}
                  className="h-[520px] w-full rounded-[1.5rem] object-cover"
                />
                <div className="absolute bottom-8 left-8 rounded-2xl bg-[#101C2C]/85 p-4 text-white backdrop-blur-sm">
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#F5B82E]">Project-ready</p>
                  <p className="mt-2 text-lg font-semibold">Lifting for construction and industrial needs</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="why-choose-us" className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
              className="mx-auto max-w-3xl text-center"
            >
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#203B59]">Why Choose Us</p>
              <h2 className="mt-4 font-display text-3xl font-extrabold text-[#101C2C] sm:text-4xl">
                A straightforward way to arrange crane support for your project.
              </h2>
            </motion.div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {[
                {
                  title: 'Practical lifting support',
                  description: 'Clear communication around lifting needs, site location, and project requirements.',
                  icon: Hammer,
                },
                {
                  title: 'Construction and industrial focus',
                  description: 'Support for building works, equipment relocation, and infrastructure-related lifting tasks.',
                  icon: Building2,
                },
                {
                  title: 'Straightforward enquiry process',
                  description: 'Send your requirements by WhatsApp and discuss availability, timing, and logistics.',
                  icon: MessageCircle,
                },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                    whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.45, delay: index * 0.08 }}
                    className="rounded-[1.7rem] border border-slate-200 bg-[#F3F5F7] p-7"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F5B82E]/15 text-[#203B59]">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-6 font-display text-2xl font-bold text-[#101C2C]">{item.title}</h3>
                    <p className="mt-3 text-base leading-7 text-slate-600">{item.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <motion.div
            initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#203B59]">How to Request a Crane</p>
            <h2 className="mt-4 font-display text-3xl font-extrabold text-[#101C2C] sm:text-4xl">
              A simple three-step enquiry process.
            </h2>
          </motion.div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {[
              { step: '01', title: 'Choose Your Service', description: 'Pick the lifting or support service that matches your project.', icon: Hammer },
              { step: '02', title: 'Send Your Enquiry', description: 'Message us on WhatsApp with your lifting location, requirements, and timeline.', icon: MessageCircle },
              { step: '03', title: 'Discuss Your Requirements', description: 'Talk through the project details and the service details before proceeding.', icon: Phone },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.step}
                  initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  className="relative rounded-[1.6rem] border border-slate-200 bg-white p-8 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#F5B82E] font-display text-lg font-bold text-[#101C2C]">{item.step}</span>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#203B59]/10 text-[#203B59]">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-bold text-[#101C2C]">{item.title}</h3>
                  <p className="mt-3 text-base leading-7 text-slate-600">{item.description}</p>
                  {index < 2 && <div className="absolute -right-4 top-1/2 hidden h-px w-8 bg-[#F5B82E]/70 lg:block" />}
                </motion.div>
              );
            })}
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#101C2C] py-20">
          <div className="absolute inset-0">
            <img
              src={crane7}
              alt="Crane operating at a construction site"
              loading="lazy"
              decoding="async"
              onError={handleImageError}
              className="h-full w-full object-cover opacity-30"
            />
          </div>
          <div className="absolute inset-0 bg-[#101C2C]/65" />
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8"
          >
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#F5B82E]">Planning a Lift?</p>
            <h2 className="mt-5 font-display text-3xl font-extrabold text-white sm:text-5xl">
              Have a Lifting Job in Mind?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-200">
              Tell us what you need to lift, where the work will take place, and when you need the service.
            </p>
            <a
              href={buildWhatsAppLink('Hello, I have a lifting job in mind. Please discuss the project requirements with me.')}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#F5B82E] px-7 py-3.5 text-base font-bold text-[#101C2C] transition hover:bg-[#f7c855]"
            >
              Discuss Your Project on WhatsApp
              <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>
        </section>

        <section id="contact" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <motion.div
              initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#203B59]">Contact</p>
              <h2 className="mt-4 font-display text-3xl font-extrabold text-[#101C2C] sm:text-4xl">
                Request a crane service in Madina, Ghana.
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
                Tell us about your project, the lifting location, required equipment, and your preferred timing. We can discuss your service needs directly through WhatsApp.
              </p>

              <div className="mt-8 space-y-4">
                <a href={`tel:${WHATSAPP_LOCAL}`} className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-[#F5B82E]/60">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F5B82E]/15 text-[#203B59]">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Call</p>
                    <p className="mt-1 text-lg font-bold text-[#101C2C]">{WHATSAPP_LOCAL}</p>
                  </div>
                </a>

                <a
                  href={buildWhatsAppLink('Hello, I would like to discuss a lifting or crane support requirement.')}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-[#F5B82E]/60"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F5B82E]/15 text-[#203B59]">
                    <MessageCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-slate-500">WhatsApp</p>
                    <p className="mt-1 text-lg font-bold text-[#101C2C]">{WHATSAPP_DISPLAY}</p>
                  </div>
                </a>

                <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F5B82E]/15 text-[#203B59]">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Location</p>
                    <p className="mt-1 text-lg font-bold text-[#101C2C]">Madina, Ghana</p>
                  </div>
                </div>
              </div>

              <form className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm" onSubmit={handleSubmit} noValidate>
                <h3 className="font-display text-2xl font-bold text-[#101C2C]">Quick enquiry</h3>
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <div className="md:col-span-1">
                    <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-700">Name</label>
                    <input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={(event) => handleInputChange('name', event.target.value)}
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-[#F5B82E] focus:ring-2 focus:ring-[#F5B82E]/20"
                      placeholder="Your name"
                    />
                    {formErrors.name && <p className="mt-2 text-sm text-red-600">{formErrors.name}</p>}
                  </div>

                  <div className="md:col-span-1">
                    <label htmlFor="phone" className="mb-2 block text-sm font-medium text-slate-700">Phone</label>
                    <input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={(event) => handleInputChange('phone', event.target.value)}
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-[#F5B82E] focus:ring-2 focus:ring-[#F5B82E]/20"
                      placeholder="024 853 2224"
                    />
                    {formErrors.phone && <p className="mt-2 text-sm text-red-600">{formErrors.phone}</p>}
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="service" className="mb-2 block text-sm font-medium text-slate-700">Service</label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={(event) => handleInputChange('service', event.target.value)}
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-[#F5B82E] focus:ring-2 focus:ring-[#F5B82E]/20"
                    >
                      {services.map((service) => (
                        <option key={service.title} value={service.title}>
                          {service.title}
                        </option>
                      ))}
                    </select>
                    {formErrors.service && <p className="mt-2 text-sm text-red-600">{formErrors.service}</p>}
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="message" className="mb-2 block text-sm font-medium text-slate-700">Project details</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={(event) => handleInputChange('message', event.target.value)}
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-[#F5B82E] focus:ring-2 focus:ring-[#F5B82E]/20"
                      placeholder="Tell us the lift location, required crane support, and timing."
                    />
                    {formErrors.message && <p className="mt-2 text-sm text-red-600">{formErrors.message}</p>}
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#F5B82E] px-5 py-3 text-sm font-bold text-[#101C2C] transition hover:bg-[#f7c855] focus:outline-none focus:ring-2 focus:ring-[#F5B82E] focus:ring-offset-2"
                >
                  Send enquiry via WhatsApp
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </motion.div>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, x: 26 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55 }}
              className="overflow-hidden rounded-[2rem] border border-slate-200 bg-[#F3F5F7] p-3 shadow-xl"
            >
              <img
                src={crane4}
                alt="Heavy equipment lifting at a site"
                loading="lazy"
                decoding="async"
                onError={handleImageError}
                className="h-full min-h-[480px] w-full rounded-[1.5rem] object-cover"
              />
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="bg-[#101C2C] text-slate-200">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <p className="font-display text-2xl font-bold text-white">{BUSINESS_NAME}</p>
            <p className="mt-2 text-sm text-slate-300">Mobile crane support for construction, industrial, lifting, and equipment handling needs.</p>
          </div>
          <div className="flex flex-col gap-3 text-sm text-slate-300 sm:flex-row sm:items-center sm:gap-6">
            <a href={`tel:${WHATSAPP_LOCAL}`} className="hover:text-[#F5B82E]">{WHATSAPP_LOCAL}</a>
            <a href={buildWhatsAppLink('Hello, I would like to enquire about your crane services.')} target="_blank" rel="noreferrer" className="hover:text-[#F5B82E]">WhatsApp Enquiry</a>
            <a href="#services" className="hover:text-[#F5B82E]">Services</a>
          </div>
        </div>
      </footer>

      <a
        href={buildWhatsAppLink('Hello, I would like to request a crane service.')}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-5 right-5 z-40 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl ring-4 ring-white/30 transition hover:scale-105"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-7 w-7" />
      </a>

      {showBackToTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-24 right-5 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#101C2C] text-white shadow-lg ring-4 ring-[#F5B82E]/20 transition hover:bg-[#203B59]"
          aria-label="Back to top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#101C2C]/90 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-4xl overflow-hidden rounded-[1.8rem] bg-white"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[#101C2C]/80 text-white"
                aria-label="Close image gallery"
              >
                <X className="h-5 w-5" />
              </button>

              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="max-h-[78vh] w-full object-cover"
              />

              <div className="flex items-center justify-between bg-[#101C2C] px-5 py-4 text-white">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-[#F5B82E]">{selectedImage.category}</p>
                  <p className="mt-2 text-xl font-bold">{selectedImage.title}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => goToImage(-1)}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 hover:bg-white/5"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => goToImage(1)}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 hover:bg-white/5"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
