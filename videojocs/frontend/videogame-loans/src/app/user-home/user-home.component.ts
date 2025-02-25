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
      next: (data: any) => { this.videogames = data; },
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
            <form id="rentForm">
              <label for="days">Nombre de dies (màxim 14):</label>
              <input type="number" id="days" name="days" min="1" max="14" required>
              <button type="submit">Llogar</button>
            </form>
            <script>
              document.getElementById('rentForm').addEventListener('submit', function(event) {
                event.preventDefault();
                const days = document.getElementById('days').value;
                window.opener.rentVideogame(${id}, days);
                window.close();
              });
            </script>
          </body>
        </html>
      `);
    } else {
      console.error('Failed to open popup window');
    }
  }
  
  rentVideogame(id: number, days: number) {
    const userID = localStorage.getItem('username');
    if (userID) {
      this.authService.rentVideogame(id, userID, days).subscribe({
      next: () => { console.log('Videogame rented successfully'); },
      error: (err) => { console.error(err); }
    });
  }

}

}