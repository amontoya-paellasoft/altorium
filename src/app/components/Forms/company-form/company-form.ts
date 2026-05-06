import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-company-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  templateUrl: './company-form.html',
  styleUrl: './company-form.css',
})
export class CompanyForm implements OnInit {
  private fb = inject(FormBuilder);
  
  companyForm!: FormGroup;

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.companyForm = this.fb.group({
      companyName: ['', [Validators.required, Validators.minLength(3)]],
      legalName: ['', Validators.required],
      taxId: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      website: [''],
      address: this.fb.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zipCode: ['', Validators.required],
        country: ['Spain', Validators.required]
      }),
      sector: ['Technology'],
      status: ['Active']
    });
  }

  onSubmit(): void {
    if (this.companyForm.valid) {
      console.log('Company Form Data:', this.companyForm.value);
      // Here you would typically call a service to save the data
    } else {
      this.markFormGroupTouched(this.companyForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if ((control as any).controls) {
        this.markFormGroupTouched(control as FormGroup);
      }
    });
  }

  resetForm(): void {
    this.companyForm.reset({
      sector: 'Technology',
      status: 'Active',
      address: {
        country: 'Spain'
      }
    });
  }
}
