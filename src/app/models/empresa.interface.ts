export interface Empresa {
  id: string;
  alias: string;
  nombre: string;
  nif?: string;
  plan: 'BASIC' | 'GROWTH' | 'PREMIUM';
  facturaEmail: boolean;
  pagoEstado: 'Al día' | 'Pendiente' | 'Inactivo';
  validoHasta: string | null;
  creadoEn: string;
}
