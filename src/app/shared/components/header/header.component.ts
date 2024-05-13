import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Output() search: EventEmitter<string> = new EventEmitter<string>();
  @Output() clearSearch: EventEmitter<void> = new EventEmitter<void>();
  searchUsers(event: any): void {
    const searchTerm: string = (event.target?.value ?? '').trim();
    this.search.emit(searchTerm);
  }

  onClearSearch(): void {
    this.clearSearch.emit();
  }
}
