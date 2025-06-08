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

  page: number = 1;
  limit: number = 3;
  totalPages: number = 1;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.user.username = localStorage.getItem('username');
    this.loadGames();
    (window as any).rentVideogame = (uid: string, days: number) => this.rentVideogame(uid, days);
  }

  ngOnDestroy() {
    delete (window as any).rentVideogame;
  }

  logout() {
    this.authService.logout();
  }

  loadGames(page: number = 1) {
    this.authService.getAllGames(page, this.limit).subscribe({
      next: (res: any) => {
        console.log('Games loaded:', res);
        this.videogames = res.data.map((game: any) => ({
          UID: game.UID,
          nom: game.Nom,
          any: game.Any_Publicacio,
          plataforma: game.Plataforma,
          desenvolupadora: game.Publicadora,
          unitats: game.Unitats
        }));
        this.filteredVideogames = [...this.videogames];
        this.page = res.page;
        this.totalPages = res.totalPages;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  nextPage() {
    if (this.page < this.totalPages) {
      this.loadGames(this.page + 1);
    }
  }

  prevPage() {
    if (this.page > 1) {
      this.loadGames(this.page - 1);
    }
  }

  filterGames() {
    this.filteredVideogames = this.videogames.filter(videogame =>
      videogame.nom.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  openVideogame(uid: string) {
    const videogame = this.filteredVideogames.find(game => game.UID === uid);
    console.log('Opening game with UID:', uid, 'Found:', videogame);

    if (!videogame) {
      console.error('Videogame not found');
      return;
    }

    const popup = window.open('', `videogame_${uid}_${Date.now()}`, 'width=600,height=400');
    if (!popup) {
      console.error('Popup blocked or failed to open');
      return;
    }

    popup.document.write(`
    <html>
      <head>
        <title>${videogame.nom}</title>
      </head>
      <body>
        <h1>${videogame.nom}</h1>
        <p><strong>Desenvolupadora:</strong> ${videogame.desenvolupadora}</p>
        <p><strong>Any de llançament:</strong> ${videogame.any}</p>
        <p><strong>Plataforma:</strong> ${videogame.plataforma}</p>
        <form id="rentForm">
          <label for="days">Dies (1–14):</label>
          <input type="number" id="days" min="1" max="14" required>
          <button type="submit">Llogar</button>
        </form>
        <script>
          document.getElementById('rentForm').addEventListener('submit', function(event) {
            event.preventDefault();
            const days = parseInt(document.getElementById('days').value);
            window.opener.rentVideogame('${videogame.nom}', days);
            window.close();
          });
        </script>
      </body>
    </html>
  `);
    popup.document.close();
  }

  rentVideogame(nom: string, days: number) {
    const userID = localStorage.getItem('username');
    if (userID) {
      this.authService.rentVideogame(nom, userID, days).subscribe({
        next: () => { console.log('Videogame rented successfully'); },
        error: (err) => { console.error(err); }
      });
    }
  }
}