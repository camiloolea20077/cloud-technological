import { Component, HostListener, signal } from '@angular/core';

type Billing = 'mensual' | 'anual';

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

  waLink(text: string): string {
    return `https://wa.me/${this.whatsapp}?text=${encodeURIComponent(text)}`;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 10;
  }
}
