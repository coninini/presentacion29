import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  LayoutDashboard, 
  Database, 
  ShieldCheck, 
  Users, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight,
  TrendingUp,
  Scale,
  BrainCircuit,
  Globe,
  Settings,
  MessagesSquare,
  PackageSearch
} from 'lucide-react';

// --- SLIDE DATA ---
const slides = [
  {
    id: 'intro',
    type: 'title',
    title: 'SICD',
    subtitle: 'Modernización del Sistema de Inventario',
    context: 'Sección 01 — Propuesta Estratégica',
    footer: 'Distribuidora de Artículos de Aseo B2B'
  },
  {
    id: 'context',
    title: '1. Contexto Actual: Empresa Pinval',
    icon: <Globe className="w-8 h-8 text-brand-primary" />,
    items: [
      'Empresa dedicada a la venta de artículos de aseo.',
      'Funciona como intermediario entre proveedores y negocios.',
      'Cuenta con sistema de ventas (POS) para facturación.',
      'Gestión de inventario realizada mediante planillas Excel.'
    ]
  },
  {
    id: 'problems',
    title: '1.1. Problemática Principal',
    icon: <AlertTriangle className="w-8 h-8 text-red-500/80" />,
    items: [
      { label: 'Dependencia manual', text: 'Uso exclusivo de Excel para controlar ingresos, salidas y stock.' },
      { label: 'Desfase de información', text: 'Inconsistencia y retraso entre las ventas del POS y el stock real en bodega.' },
      { label: 'Riesgo de errores', text: 'Alta probabilidad de errores humanos al registrar productos.' },
      { label: 'Impacto', text: 'Pérdida de eficiencia operativa en la toma de decisiones por falta de datos en vivo.' }
    ]
  },
  {
    id: 'profile',
    title: '1.2. Nuestro Perfil: ¿Por qué fuimos contratados?',
    icon: <Users className="w-8 h-8 text-brand-primary" />,
    items: [
      { label: 'Modernización', text: 'Reemplazar planillas estáticas por un sistema web centralizado.', status: 'success' },
      { label: 'Desarrollo a Medida', text: 'Herramientas diseñadas para las reglas operativas B2B de Pinval.', status: 'success' },
      { label: 'Gobernanza y Calidad', text: 'Garantizar que cada movimiento cuente con respaldo en tiempo real.', status: 'success' }
    ]
  },
  {
    id: 'business-layer',
    type: 'divider',
    title: '2. Capa de Negocio',
    subtitle: '¿Por qué este proyecto es vital para la empresa hoy?'
  },
  {
    id: 'business-model',
    title: '2.1. Modelo de Negocio',
    icon: <TrendingUp className="w-8 h-8 text-brand-primary" />,
    items: [
      'Venta de productos de aseo especializados.',
      'Relación estratégica con proveedores (compra mayorista).',
      'Distribución a clientes finales y empresas (B2B).',
      'Principal fuente de ingresos: Ventas B2B.',
      'Canales de venta actuales: WhatsApp.'
    ]
  },
  {
    id: 'needs',
    title: '2.3. Necesidades Clave',
    icon: <CheckCircle2 className="w-8 h-8 text-brand-primary" />,
    items: [
      'Mejor control granular del inventario.',
      'Información centralizada y 100% actualizada.',
      'Reducción drástica de errores en el manejo de datos.',
      'Mayor eficiencia en los procesos de reposición.'
    ]
  },
  {
    id: 'risks',
    title: '2.4. Riesgos Identificados',
    icon: <AlertTriangle className="w-8 h-8 text-brand-accent/80" />,
    items: [
      'Errores críticos en el control de stock real.',
      'Tomar decisiones basadas en información desactualizada.',
      'Dependencia de procesos manuales vulnerables.',
      'Pérdida o inconsistencia de datos históricos.'
    ]
  },
  {
    id: 'improvement',
    title: '2.5. Oportunidad de Mejora',
    icon: <ArrowRight className="w-8 h-8 text-brand-primary" />,
    items: [
      'Implementación de un sistema de inventario dedicado.',
      'Integración nativa de datos de ventas e inventario.',
      'Automatización de flujos operativos habituales.',
      'Mejora en la transparencia y control de la gestión.'
    ]
  },
  {
    id: 'proposal',
    title: '3. Propuesta Tecnológica',
    icon: <LayoutDashboard className="w-8 h-8 text-brand-primary" />,
    items: [
      'Sistema de inventario centralizado (Cloud) en tiempo real.',
      'Dashboard interactivo para gestión y reportes avanzados.',
      'Automatización de pedidos vía WhatsApp con validación de stock.',
      'Trazabilidad completa: Desde la venta hasta la entrega final.',
      'Stack robusto: React, Node.js, PostgreSQL.',
      'Eliminación definitiva de planillas Excel como fuente de verdad.'
    ]
  },
  {
    id: 'impact',
    title: '3.1. Impacto en Productividad',
    icon: <TrendingUp className="w-8 h-8 text-brand-primary" />,
    items: [
      { label: 'Ahorro de Tiempo', text: 'Eliminación de digitación manual y retrabajo en planillas.' },
      { label: 'Decisiones Ágiles', text: 'Stock consolidado accesible instantáneamente para gerencia.' },
      { label: 'Reducción de Pérdidas', text: 'Trazabilidad estricta que evita descuadraturas.' },
      { label: 'Enfoque en el Core', text: 'Más tiempo dedicado a clientes y menos a cuadrar números.' }
    ]
  },
  {
    id: 'roles',
    title: '3.2. Estructura del Equipo',
    type: 'grid',
    items: [
      { role: 'Product Owner', name: 'Jorge Manriquez' },
      { role: 'Analista de BD', name: 'Santiago Mora' },
      { role: 'Gobernanza de Datos', name: 'Constanza Arce' },
      { role: 'Ingeniero QA', name: 'Josue Campusano' }
    ]
  },
  {
    id: 'legal',
    title: '4. Marco Legal (Chile)',
    icon: <Scale className="w-8 h-8 text-brand-primary" />,
    content: (
      <div className="space-y-8">
        <p className="text-text-muted text-sm uppercase tracking-widest leading-loose">Cumplimiento preventivo de normativas de protección de datos:</p>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bento-card border-brand-primary/20 bg-white">
            <span className="chip mb-3">Normativa 01</span>
            <h4 className="text-text-main font-bold text-xl mb-3 font-display">Ley 21.719</h4>
            <p className="text-sm text-text-muted leading-relaxed font-light italic">Regula la protección de datos personales y su recolección transparente.</p>
          </div>
          <div className="bento-card border-brand-primary/20 bg-white">
            <span className="chip mb-3">Normativa 02</span>
            <h4 className="text-text-main font-bold text-xl mb-3 font-display">Ley 21.663</h4>
            <p className="text-sm text-text-muted leading-relaxed font-light italic">Establece obligaciones de ciberseguridad y responsabilidad en el manejo.</p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'data-policy',
    title: '4.1. Políticas de Datos',
    icon: <ShieldCheck className="w-8 h-8 text-brand-primary" />,
    items: [
      'Control de acceso estricto a la información sensible.',
      'Sistema SICD como única fuente de verdad (Excel secundario).',
      'Registro obligatorio de toda modificación (Auditoría).',
      'Acceso restringido por roles (Admin, Usuario).'
    ]
  },
  {
    id: 'data-quality',
    title: '4.2. Calidad de Datos',
    icon: <CheckCircle2 className="w-8 h-8 text-brand-primary" />,
    items: [
      'Datos completos, normalizados y actualizados.',
      'Reducción drástica de errores mediante validaciones de entrada.',
      'Consistencia de información entre departamentos.',
      'Integridad referencial en toda la base de datos.'
    ]
  },
  {
    id: 'security',
    title: '4.3. Seguridad de la Información',
    icon: <ShieldCheck className="w-8 h-8 text-brand-primary" />,
    items: [
      'Esquemas de respaldo automático (Backup Cloud).',
      'Prevención de pérdida o manipulación indebida.',
      'Cifrado de datos en tránsito y reposo.',
      'Protocolos de recuperación ante desastres.'
    ]
  },
  {
    id: 'ethics',
    title: '4.4. Compromiso Ético',
    icon: <BrainCircuit className="w-8 h-8 text-brand-primary" />,
    items: [
      { label: 'Transparencia', text: 'Reportes que reflejan la realidad financiera del negocio.' },
      { label: 'Confidencialidad', text: 'Protección absoluta de precios y base de clientes B2B.' },
      { label: 'Inclusión Digital', text: 'Interfaces intuitivas para operarios con diversa formación.' },
      { label: 'Bienestar', text: 'Foco en eficiencia operativa, no en presión laboral.' }
    ]
  },
  {
    id: 'backend-stack',
    title: '5. Herramientas: Backend & BD',
    content: (
      <div className="grid gap-6">
        <div className="bento-card flex gap-8 items-start hover:border-brand-primary/40 group">
          <div className="p-5 bg-brand-primary/5 rounded-2xl border border-brand-primary/10 group-hover:bg-brand-primary group-hover:text-white transition-all duration-500">
            <Database className="w-8 h-8" />
          </div>
          <div>
            <h4 className="text-2xl font-bold mb-2 text-text-main">PostgreSQL</h4>
            <p className="text-sm text-text-muted leading-relaxed font-light">Garantiza integridad transaccional (ACID). Fundamental para la precisión absoluta del stock físico vs digital.</p>
          </div>
        </div>
        <div className="bento-card flex gap-8 items-start hover:border-brand-primary/40 group">
          <div className="p-5 bg-brand-primary/5 rounded-2xl border border-brand-primary/10 group-hover:bg-brand-primary group-hover:text-white transition-all duration-500">
            <Settings className="w-8 h-8" />
          </div>
          <div>
            <h4 className="text-2xl font-bold mb-2 text-text-main">Node.js</h4>
            <p className="text-sm text-text-muted leading-relaxed font-light">Arquitectura asíncrona ideal para ráfagas de solicitudes simultáneas en periodos de alta demanda operativa.</p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'frontend-stack',
    title: '6. Herramientas: Frontend & QA',
    content: (
      <div className="grid gap-6">
        <div className="bento-card flex gap-8 items-start hover:border-brand-primary/40 group">
          <div className="p-5 bg-brand-primary/5 rounded-2xl border border-brand-primary/10 group-hover:bg-brand-primary group-hover:text-white transition-all duration-500">
            <MessagesSquare className="w-8 h-8" />
          </div>
          <div>
            <h4 className="text-2xl font-bold mb-2 text-text-main">React + TypeScript</h4>
            <p className="text-sm text-text-muted leading-relaxed font-light">Interfaces dinámicas con tipado estricto para mitigar fallos Críticos en tiempo real.</p>
          </div>
        </div>
        <div className="bento-card flex gap-8 items-start hover:border-brand-primary/40 group">
          <div className="p-5 bg-brand-primary/5 rounded-2xl border border-brand-primary/10 group-hover:bg-brand-primary group-hover:text-white transition-all duration-500">
            <PackageSearch className="w-8 h-8" />
          </div>
          <div>
            <h4 className="text-2xl font-bold mb-2 text-text-main">Selenium</h4>
            <p className="text-sm text-text-muted leading-relaxed font-light">Automatización de pruebas en flujos críticos para asegurar una estabilidad continua del sistema corporativo.</p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'finish',
    type: 'title',
    title: 'SICD',
    subtitle: 'Transformando la Gestión de Pinval',
    context: 'Conclusión de la Propuesta',
    footer: '¿Consultas o Dudas?'
  }
];

export default function Presentation() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const slide = slides[currentSlide];

  return (
    <div className="presentation-container bg-surface-base selection:bg-brand-primary/20">
      {/* Header Bar */}
      <div className="absolute top-0 left-0 w-full h-20 border-b border-border-subtle flex items-center justify-between px-12 bg-white/70 backdrop-blur-md z-50">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-xl shadow-brand-primary/20 hover:scale-105 transition-transform">S</div>
          <div className="h-6 w-px bg-border-subtle"></div>
          <h1 className="text-xs font-bold tracking-[0.2em] text-text-main uppercase">SICD — Proyecto de Modernización</h1>
        </div>
        <div className="flex items-center gap-8">
          <div className="hidden md:flex gap-4 items-center">
            <span className="text-[10px] uppercase tracking-widest text-text-muted font-bold">Estado del Sistema</span>
            <div className="flex gap-1.5">
              <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
              <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.3)]"></div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="h-full w-full"
        >
          <div className="slide-content pt-24">
            
            {/* Slide Type: Title (Intro/Finish) */}
            {slide.type === 'title' && (
              <div className="relative max-w-4xl">
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-8"
                >
                  <div className="chip w-fit">{slide.context}</div>
                  <h1 className="text-7xl md:text-9xl font-bold text-text-main mb-8 tracking-tight leading-[0.95] font-display">
                    {slide.title}<span className="text-brand-primary">.</span>
                  </h1>
                  <h2 className="text-2xl md:text-4xl text-text-muted font-medium max-w-2xl leading-tight">
                    {slide.subtitle}
                  </h2>
                  <div className="h-2 w-32 bg-brand-primary rounded-full"></div>
                </motion.div>
                <div className="pt-16 text-[11px] tracking-[0.4em] uppercase text-text-muted font-bold flex items-center gap-4">
                  <span className="w-8 h-[1px] bg-border-subtle"></span>
                  {slide.footer}
                </div>
              </div>
            )}

            {/* Slide Type: Divider */}
            {slide.type === 'divider' && (
              <div className="space-y-10 border-l-[12px] border-brand-primary pl-16">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <h1 className="text-7xl md:text-9xl font-bold text-text-main font-display leading-none">
                    {slide.title}
                  </h1>
                  <p className="text-2xl md:text-3xl text-text-muted font-medium max-w-xl">
                    {slide.subtitle}
                  </p>
                </motion.div>
              </div>
            )}

            {/* Slide Type: Grid (Roles) */}
            {slide.type === 'grid' && (
              <div className="space-y-16">
                <div className="space-y-4">
                  <div className="chip w-fit">Recursos Humanos</div>
                  <h2 className="text-5xl md:text-6xl font-bold text-text-main font-display uppercase tracking-tighter">{slide.title}</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {slide.items.map((item: any, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                      className="bento-card group hover:-translate-y-2"
                    >
                      <div className="w-12 h-12 bg-brand-primary/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-primary group-hover:text-white transition-colors duration-500">
                        <Users className="w-6 h-6" />
                      </div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-text-muted mb-2 font-bold transition-colors">
                        {item.role}
                      </p>
                      <h3 className="text-xl font-bold text-text-main">{item.name}</h3>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Slide Type: Content (Default) */}
            {!slide.type && (
              <div className="grid md:grid-cols-[1fr_1.5fr] gap-16 items-start">
                <div className="space-y-8 sticky top-24">
                  <div className="p-6 bg-brand-primary rounded-3xl w-fit shadow-xl shadow-brand-primary/20">
                    {slide.icon && React.cloneElement(slide.icon as React.ReactElement, { className: "w-8 h-8 text-white" })}
                  </div>
                  <div className="space-y-4">
                    <div className="chip w-fit">Sección Informativa</div>
                    <h2 className="text-5xl lg:text-6xl font-bold text-text-main tracking-tighter font-display leading-[0.9]">
                      {slide.title}
                    </h2>
                    <div className="h-1.5 w-24 bg-brand-primary/20 rounded-full"></div>
                  </div>
                </div>

                <div className="relative">
                  {slide.items ? (
                    <div className="grid grid-cols-1 gap-4">
                      {slide.items.map((item: any, idx) => (
                        <motion.div 
                          key={idx}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + (idx * 0.08) }}
                          className="bento-card p-6 flex gap-6 items-start group hover:border-brand-primary/40"
                        >
                          <div className={`mt-1.5 p-1 rounded-md ${item.status === 'success' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-brand-primary/10 text-brand-primary'} flex-shrink-0 group-hover:scale-110 transition-transform`}>
                            <CheckCircle2 className="w-5 h-5 pointer-events-none" />
                          </div>
                          <div className="text-base leading-relaxed">
                            {typeof item === 'string' ? (
                              <p className="text-text-main font-medium">{item}</p>
                            ) : (
                              <div className="space-y-1">
                                <span className={`text-[11px] font-bold uppercase tracking-widest block ${item.status === 'success' ? 'text-emerald-600' : 'text-brand-primary'}`}>
                                  {item.label}
                                </span>
                                <p className="text-text-muted leading-relaxed font-light">{item.text}</p>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      {slide.content}
                    </motion.div>
                  )}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-12 right-12 flex gap-4 z-50">
        <button 
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="nav-button group"
        >
          <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
        </button>
        <button 
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          className="px-8 py-4 bg-brand-primary text-white font-bold uppercase text-xs tracking-[0.2em] rounded-2xl shadow-xl shadow-brand-primary/30 hover:bg-brand-primary/90 hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
        >
          Siguiente <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Status Bar Footer */}
      <div className="absolute bottom-0 left-0 w-full h-14 border-t border-border-subtle bg-white/50 backdrop-blur-md flex items-center justify-between px-12 z-40">
        <div className="text-[10px] text-text-muted font-bold uppercase tracking-[0.2em]">SICD Enterprise v1.0.4 — © 2024</div>
        <div className="flex gap-12 items-center">
          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              {[...Array(slides.length)].map((_, i) => (
                <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === currentSlide ? 'w-4 bg-brand-primary' : 'bg-border-subtle'}`} />
              ))}
            </div>
            <span className="text-[11px] text-text-main font-bold font-mono min-w-16 text-right">
              {String(currentSlide + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
