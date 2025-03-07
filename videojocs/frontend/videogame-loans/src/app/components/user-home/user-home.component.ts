import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Videogame } from '../../models/videogame';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [AuthService],
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss']
})
export class UserHomeComponent implements OnInit {
  user: any = {};
  videogames: Videogame[] = [];
  filteredVideogames: Videogame[] = [];
  searchTerm: string = '';

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
      next: (data: any) => {
        console.log('Games loaded:', data);
        this.videogames = data.map((game: any) => new Videogame({
          UID: game.UID,
          nom: game.Nom,
          any: game.Any_Publicacio,
          plataforma: game.Plataforma,
          desenvolupadora: game.Publicadora,
          unitats: game.Unitats
        }));
        this.filteredVideogames = this.videogames;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  filterGames() {
    this.filteredVideogames = this.videogames.filter(videogame => 
      videogame.nom.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  openVideogame(id: number) {
    const videogame = this.videogames.find((game: Videogame) => game.UID === id);
    if (!videogame) {
      console.error('Videogame not found');
      return;
    }

    const popup = window.open('', '_blank', 'width=600,height=400');
    if (popup) {
      popup.document.write(`
        <html>
          <head>
            <title>${videogame.nom}</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              h1 { font-size: 24px; }
              p { font-size: 18px; }
              button { padding: 10px 20px; font-size: 16px; }
              form { margin-top: 20px; }
              label { display: block; margin-bottom: 10px; }
              input { padding: 5px; margin-bottom: 10px; }
              @media screen and (max-width: 600px) {
                body { padding: 10px; }
                h1 { font-size: 20px; }
                p { font-size: 16px; }
                button { padding: 8px 16px; font-size: 14px; }
                input { padding: 4px; }
              }
            </style>
          </head>
          <body>
            <h1>${videogame.nom}</h1>
            <p><strong>Desenvolupadora:</strong> ${videogame.desenvolupadora}</p>
            <p><strong>Any de llançament:</strong> ${videogame.any}</p>
            <p><strong>Plataforma:</strong> ${videogame.plataforma}</p>
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
      popup.document.close();
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