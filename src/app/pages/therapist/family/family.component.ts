import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Validators } from 'ngx-editor';
import { Child, Family1, FamilyService } from '../../../services/family.service';
import { Family } from '../../../api/interfaces/family';
import {TherapistChildren, TherapistChildrenService} from '../../../services/therapist-children.service';

@Component({
  selector: 'app-family',
  standalone: false,
  templateUrl: './family.component.html',
  styleUrl: './family.component.scss'
})

export class FamilyComponent implements OnInit {
  families: Family[] = [];
  filteredFamilies: Family1[] = [];
  searchTerm = '';
  children: TherapistChildren[] = [];
  familyForm!: FormGroup;
  editingIndex: number | null = null;
  loading = false;
  page: number = 1;
  pageSize: number = 10;
  total: number = 0;

  constructor(
    private fb: FormBuilder,
    private familyService: FamilyService,
    private therapistChildrenService: TherapistChildrenService
  ) {}

  ngOnInit(): void {
    this.loadTherapistChildren();
    this.loadFamilies();
  }

  loadTherapistChildren(): void {
    this.loading = true;
    this.therapistChildrenService.getTherapistChildrenByUser().subscribe({
      next: (res) => {
        this.children = res;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading therapist children:', error);
        this.loading = false;
      }
    });
  }

  loadFamilies(): void {
    this.loading = true;
    const offset = (this.page - 1) * this.pageSize;

    this.familyService.getFamily(this.pageSize, offset).subscribe({
      next: (res) => {
        this.families = res.families;
        this.total = res.total;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading families:', error);
        this.loading = false;
      }
    });
  }

  prevPage(): void {
    if (this.page > 1) {
      this.page--;
      this.loadFamilies();
    }
  }

  nextPage(): void {
    if (this.page * this.pageSize < this.total) {
      this.page++;
      this.loadFamilies();
    }
  }

  get startIndex(): number {
    return this.total === 0 ? 0 : (this.page - 1) * this.pageSize + 1;
  }
  get endIndex(): number {
    return Math.min(this.page * this.pageSize, this.total);
  }

}
