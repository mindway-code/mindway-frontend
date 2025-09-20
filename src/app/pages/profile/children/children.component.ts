import { Component, input } from '@angular/core';

@Component({
  selector: 'app-children',
  standalone: false,
  templateUrl: './children.component.html',
  styleUrl: './children.component.scss'
})
export class ChildrenComponent {
  showProgress = false;

  openProgress() {
    this.showProgress = true;
  }


}
