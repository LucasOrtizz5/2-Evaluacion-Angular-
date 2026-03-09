import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { CharactersService } from '../features/characters/services/characters.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class LayoutComponent {
  private charactersService = inject(CharactersService);
  charactersCount: number = 0;

  constructor() {
    this.charactersService.getCharacters(1, '').subscribe({
      next: (response) => {
        this.charactersCount = response.info.count;
      }
    });
  }
}
