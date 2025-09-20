import { Component, OnInit } from '@angular/core';
import { FAQ, HelpService } from '../../../../services/help.service';


@Component({
  selector: 'app-help',
  standalone: false,
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {
  faqs: FAQ[] = [];
  searchTerm = '';

  constructor(private helpService: HelpService) {}

  ngOnInit(): void {
    this.loadFaqs();
  }

  loadFaqs(): void {
    this.helpService.getFaqs().subscribe(data => this.faqs = data);
  }

  filteredFaqs(): FAQ[] {
    if (!this.searchTerm) return this.faqs;
    const term = this.searchTerm.toLowerCase();
    return this.faqs.filter(f => f.question.toLowerCase().includes(term));
  }
}
