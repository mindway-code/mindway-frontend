import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-preference',
  standalone: false,
  templateUrl: './preference.component.html',
  styleUrl: './preference.component.scss'
})
export class PreferenceComponent implements OnInit {
  preferencesForm!: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    // private therapistService: TherapistService
  ) {}

  ngOnInit(): void {
    this.preferencesForm = this.fb.group({
      theme: ['light', Validators.required],
      emailNotifications: [true],
      pushNotifications: [false],
      notificationFrequency: ['daily', Validators.required],
      language: ['pt-BR', Validators.required]
    });
    this.loadPreferences();
  }

  loadPreferences(): void {
    this.loading = true;
    // this.therapistService.getPreferences().subscribe(prefs => {
    //   this.preferencesForm.patchValue(prefs);
    //   this.loading = false;
    // });
  }

  onSubmit(): void {
    if (this.preferencesForm.invalid) return;
    this.loading = true;
    // this.therapistService.updatePreferences(this.preferencesForm.value)
    //   .subscribe(() => this.loading = false);
  }
}
