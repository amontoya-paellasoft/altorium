import { Component, Input, Output, EventEmitter, inject, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Empresa } from '../../../models/empresa.interface';

@Component({
  selector: 'app-empresa-drawer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './empresa-drawer.html',
  styleUrl: './empresa-drawer.css'
})
export class EmpresaDrawer implements OnChanges {
  private fb = inject(FormBuilder);
  
  @Input() empresa: Empresa | null = null;
  @Input() isEditing = false;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Partial<Empresa>>();

  empresaForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.maxLength(300)]],
    nif: ['', [Validators.maxLength(40)]],
    plan: ['BASIC', Validators.required],
    facturaEmail: [false]
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['empresa'] && this.empresa) {
      this.empresaForm.patchValue({
        nombre: this.empresa.nombre,
        nif: this.empresa.nif,
        plan: this.empresa.plan,
        facturaEmail: this.empresa.facturaEmail
      });
    } else if (changes['empresa'] && !this.empresa) {
      this.empresaForm.reset({
        plan: 'BASIC',
        facturaEmail: false
      });
    }
  }

  get charCountNombre(): number {
    return this.empresaForm.get('nombre')?.value?.length || 0;
  }

  get charCountNif(): number {
    return this.empresaForm.get('nif')?.value?.length || 0;
  }

  onSubmit() {
    if (this.empresaForm.valid) {
      this.save.emit(this.empresaForm.value);
    } else {
      this.empresaForm.markAllAsTouched();
    }
  }
}
