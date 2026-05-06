import { Injectable, signal } from '@angular/core';
import { Empresa } from '../models/empresa.interface';
import empresasData from '../../data/empresas.json';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  private _empresas = signal<Empresa[]>(empresasData.empresas as Empresa[]);
  
  // Public signals for components to consume
  empresas = this._empresas.asReadonly();
  loading = signal(false);
  error = signal<string | null>(null);

  getEmpresas() {
    return this.empresas();
  }

  createEmpresa(nuevaEmpresa: Partial<Empresa>) {
    const empresa: Empresa = {
      id: crypto.randomUUID(),
      alias: nuevaEmpresa.nombre?.toLowerCase().replace(/\s+/g, '-') || 'alias',
      nombre: nuevaEmpresa.nombre || '',
      nif: nuevaEmpresa.nif || '',
      plan: nuevaEmpresa.plan || 'BASIC',
      facturaEmail: nuevaEmpresa.facturaEmail || false,
      pagoEstado: 'Al día',
      validoHasta: null,
      creadoEn: new Date().toISOString()
    };

    this._empresas.update(list => [empresa, ...list]);
    return empresa;
  }

  updateEmpresa(id: string, data: Partial<Empresa>) {
    this._empresas.update(list => 
      list.map(e => e.id === id ? { ...e, ...data } : e)
    );
  }

  deleteEmpresa(id: string) {
    this._empresas.update(list => list.filter(e => e.id !== id));
  }

  getEmpresaById(id: string) {
    return this.empresas().find(e => e.id === id);
  }
}
