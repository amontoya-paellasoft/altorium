export interface TareaInterface {
  id: string;
  titulo: string;
  descripcion: string;
  asignadaA: string;
  estado: 'pendiente' | 'acabada' | 'en_progreso' | 'descartada';
  prioridad?: 'baja' | 'media' | 'alta';
  creadaEn: Date;
}
