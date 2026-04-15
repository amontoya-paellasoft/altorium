export interface NodePosition {
  id: string;
  label: string;
  x: number;
  y: number;
  data: { role: string; emoji: string; status: string };
  w?: number;
  h?: number;
}
