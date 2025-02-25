import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user-home',
  standalone: true,
  imports: [CommonModule],
  providers: [AuthService],
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss']
})
export class UserHomeComponent implements OnInit {
  user: any = {};
  videogames: any[] = [];

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.user.username = localStorage.getItem('username');
    this.loadGames();
  }

  logout() {
    this.authService.logout();
  }

  loadGames() {
    this.authService.getAllGames().subscribe({
      next: (data: Object) => { this.videogames = data as any[]; },
      error: (err) => { console.error(err); }
    });
  }

  openVideogame(id: number) {
    const videogame = this.videogames.find((game: any) => game.id === id);
    if (!videogame) {
      console.error('Videogame not found');
      return;
    }

    const popup = window.open('', '_blank', 'width=600,height=400');
    if (popup) {
      popup.document.write(`
        <html>
          <head>
            <title>${videogame.title}</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              h1 { font-size: 24px; }
              p { font-size: 18px; }
              button { padding: 10px 20px; font-size: 16px; }
            </style>
          </head>
          <body>
            <h1>${videogame.title}</h1>
            <p><strong>Desenvolupadora:</strong> ${videogame.developer}</p>
            <p><strong>Any de llançament:</strong> ${videogame.releaseYear}</p>
            <p><strong>Plataforma:</strong> ${videogame.platform}</p>
            <button onclick="window.opener.rentVideogame(${id}); window.close();">Llogar</button>
          </body>
        </html>
      `);
    } else {
      console.error('Failed to open popup window');
    }
  }

  rentVideogame(id: number) {
    this.authService.rentVideogame(id).subscribe({
      next: () => { console.log('Videogame rented successfully'); },
      error: (err) => { console.error(err); }
    });
  }
}