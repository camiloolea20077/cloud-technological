import { Component, HostListener, computed, signal } from '@angular/core';

type Billing = 'mensual' | 'anual';

interface Service {
  name: string;
  icon: string;
  description: string;
  examples: string[];
}

interface AiCase {
  icon: string;
  name: string;
  description: string;
  example: string;
}

interface Step {
  name: string;
  description: string;
}

interface Plan {
  name: string;
  tagline: string;
  monthly: number | null; // null = precio a la medida
  highlight?: boolean;
  modules: string[];
  features: string[];
}

interface StandaloneModule {
  name: string;
  icon: string;
  monthly: number;
  unit: string;
  description: string;
  features: string[];
}

interface EInvoicePack {
  name: string;
  docs: number;
  monthly: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  email = 'cloudtecnological.atencion@gmail.com';
  title = 'cloud-technological';
  whatsapp = '573204116945';
  isScrolled = false;
  menuOpen = signal(false);

  billing = signal<Billing>('mensual');

  /** Pago anual: 2 meses gratis (se paga 10 de 12). */
  readonly annualFactor = 10 / 12;

  /* ---------- Servicios de la empresa ---------- */
  services: Service[] = [
    {
      name: 'Software a la medida',
      icon: 'pi-code',
      description: 'Sistemas web hechos para tu proceso, no al revés: plataformas internas, portales para clientes y sistemas de gestión.',
      examples: ['Sistemas de gestión', 'Portales de clientes', 'Tableros gerenciales'],
    },
    {
      name: 'Inteligencia artificial',
      icon: 'pi-sparkles',
      description: 'Asistentes que atienden a tus clientes, lectura automática de documentos y procesos que dejan de hacerse a mano.',
      examples: ['Asistentes en WhatsApp', 'Lectura de facturas', 'Automatización'],
    },
    {
      name: 'Apps móviles',
      icon: 'pi-mobile',
      description: 'Aplicaciones para Android y iOS pensadas para el trabajo en campo y para tus clientes.',
      examples: ['Toma de pedidos', 'Rutas de venta', 'Inspecciones'],
    },
    {
      name: 'Integraciones y APIs',
      icon: 'pi-sitemap',
      description: 'Conectamos los sistemas que ya usas para que la información pase de uno a otro sin digitarla dos veces.',
      examples: ['Tiendas en línea', 'Bancos y pasarelas', 'Básculas y equipos'],
    },
    {
      name: 'Nube e infraestructura',
      icon: 'pi-server',
      description: 'Llevamos tus sistemas a la nube y los mantenemos disponibles, con copias de seguridad y monitoreo.',
      examples: ['Migración a la nube', 'Copias automáticas', 'Monitoreo'],
    },
    {
      name: 'Sitios web y tiendas en línea',
      icon: 'pi-globe',
      description: 'Páginas rápidas y fáciles de administrar para que te encuentren, te escriban y te compren.',
      examples: ['Sitio corporativo', 'Catálogo', 'Tienda en línea'],
    },
  ];

  /* ---------- Casos de uso de IA ---------- */
  aiCases: AiCase[] = [
    {
      icon: 'pi-comments',
      name: 'Asistente en WhatsApp y web',
      description: 'Responde preguntas, cotiza y toma pedidos a cualquier hora con la información real de tu negocio. Si el caso lo pide, pasa la conversación a una persona.',
      example: '“¿Tienen cemento gris? Necesito 20 bultos”',
    },
    {
      icon: 'pi-file-import',
      name: 'Lectura de documentos',
      description: 'Facturas de proveedores, remisiones y formularios: la IA extrae los datos y los deja registrados en tu sistema, listos para revisar.',
      example: 'Factura en PDF → compra registrada',
    },
    {
      icon: 'pi-bolt',
      name: 'Automatización de procesos',
      description: 'Recordatorios de cartera, conciliaciones e informes periódicos que hoy alguien hace a mano pasan a ejecutarse solos.',
      example: 'Cartera vencida → recordatorio enviado',
    },
    {
      icon: 'pi-chart-line',
      name: 'Pregúntale a tus datos',
      description: 'Escribe la pregunta como se la harías a tu contador o a tu administrador y recibe la respuesta, sin armar reportes.',
      example: '“¿Qué producto dejó más utilidad este mes?”',
    },
  ];

  /* ---------- Cómo trabajamos ---------- */
  steps: Step[] = [
    {
      name: 'Conversamos',
      description: 'Nos cuentas qué quieres resolver. Revisamos tu proceso actual y te decimos con franqueza si vale la pena construirlo.',
    },
    {
      name: 'Propuesta clara',
      description: 'Recibes alcance, tiempos y precio por escrito antes de empezar. Sin compromiso.',
    },
    {
      name: 'Construimos contigo',
      description: 'Trabajamos por etapas y vas viendo avances que puedes probar, no solo informes.',
    },
    {
      name: 'Lanzamos y acompañamos',
      description: 'Capacitamos a tu equipo y seguimos pendientes con soporte directo por WhatsApp.',
    },
  ];

  /* ---------- Contacto: arma tu mensaje ---------- */
  interests = [
    'Software a la medida',
    'Inteligencia artificial',
    'Aura Nube (ERP)',
    'App móvil',
    'Integración o nube',
    'Sitio web o tienda',
  ];
  selected = signal<string[]>([]);
  company = signal('');

  contactLink = computed(() => {
    const who = this.company().trim();
    const needs = this.selected();
    let msg = 'Hola' + (who ? `, les escribo de ${who}` : '') + '.';
    msg += needs.length
      ? ` Me interesa: ${needs.join(', ')}.`
      : ' Quiero contarles lo que necesito.';
    return this.waLink(msg);
  });

  toggleInterest(name: string) {
    this.selected.update(list =>
      list.includes(name) ? list.filter(i => i !== name) : [...list, name]
    );
  }

  /* ---------- Aura Nube: planes ---------- */
  plans: Plan[] = [
    {
      name: 'Emprende',
      tagline: 'Para tiendas y negocios que empiezan a vender con orden.',
      monthly: 45000,
      modules: ['POS', 'Inventario'],
      features: [
        'Punto de venta en la nube',
        'Tirilla de venta y cotizaciones',
        'Inventario con alertas de stock',
        'Cierre de caja diario',
        '1 sede · 2 usuarios',
      ],
    },
    {
      name: 'Negocio',
      tagline: 'Vende y lleva la contabilidad en el mismo sistema.',
      monthly: 120000,
      highlight: true,
      modules: ['POS', 'Inventario', 'Contabilidad'],
      features: [
        'Todo lo de Emprende',
        'Contabilidad NIIF con PUC',
        'Cartera y cuentas por pagar',
        'Estados financieros al día',
        'Exógena e informes tributarios',
        '1 sede · 5 usuarios',
      ],
    },
    {
      name: 'Empresa',
      tagline: 'El ERP completo para operar con varias sedes y empleados.',
      monthly: 189000,
      modules: ['POS', 'Inventario', 'Contabilidad', 'Nómina'],
      features: [
        'Todo lo de Negocio',
        'Nómina electrónica hasta 25 empleados',
        'Prima, cesantías y vacaciones',
        'Hasta 3 sedes · 15 usuarios',
        'Tablero gerencial',
        'Soporte prioritario',
      ],
    },
    {
      name: 'Corporativo',
      tagline: 'Multiempresa, integraciones y desarrollos a la medida.',
      monthly: null,
      modules: ['Todos los módulos'],
      features: [
        'Multiempresa y sedes ilimitadas',
        'Usuarios ilimitados',
        'Integraciones con tus sistemas',
        'Migración de datos asistida',
        'Acompañamiento dedicado',
      ],
    },
  ];

  standaloneModules: StandaloneModule[] = [
    {
      name: 'Aura Contable',
      icon: 'pi-book',
      monthly: 49000,
      unit: 'por mes · empresas ilimitadas',
      description: 'Para contadores que llevan varias empresas, o negocios que facturan con otro sistema.',
      features: ['Comprobantes y libros oficiales', 'Conciliación bancaria', 'Estados financieros NIIF', 'Medios magnéticos'],
    },
    {
      name: 'Aura Nómina 10',
      icon: 'pi-users',
      monthly: 25000,
      unit: 'por mes · hasta 10 empleados',
      description: 'Liquida y transmite la nómina electrónica sin hojas de cálculo.',
      features: ['Nómina electrónica DIAN', 'Prestaciones sociales', 'Desprendibles para empleados'],
    },
    {
      name: 'Aura Nómina 25',
      icon: 'pi-users',
      monthly: 45000,
      unit: 'por mes · hasta 25 empleados',
      description: 'Para empresas con más personal y liquidación de seguridad social.',
      features: ['Todo lo de Nómina 10', 'Archivo plano para PILA', 'Archivo de pago para bancos'],
    },
  ];

  /** Facturación electrónica: se activa aparte (proveedor tecnológico externo), se cobra por paquete de documentos. */
  einvoicePacks: EInvoicePack[] = [
    { name: 'Inicial',  docs: 30,  monthly: 19000 },
    { name: 'Estándar', docs: 100, monthly: 39000 },
    { name: 'Alto volumen', docs: 300, monthly: 79000 },
  ];

  setBilling(b: Billing) {
    this.billing.set(b);
  }

  price(monthly: number): string {
    const value = this.billing() === 'anual' ? monthly * this.annualFactor : monthly;
    return '$' + (Math.round(value / 100) * 100).toLocaleString('es-CO');
  }

  /** Precio fijo en COP, sin descuento anual. */
  cop(value: number): string {
    return '$' + value.toLocaleString('es-CO');
  }

  /** 1 → "01" para la numeración de listas. */
  num(i: number): string {
    return String(i + 1).padStart(2, '0');
  }

  waLink(text: string): string {
    return `https://wa.me/${this.whatsapp}?text=${encodeURIComponent(text)}`;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 10;
  }
}
