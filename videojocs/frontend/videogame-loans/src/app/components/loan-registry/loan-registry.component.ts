import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loan-registry',
  standalone: true,
  imports: [CommonModule],
  providers: [AuthService],
  templateUrl: './loan-registry.component.html',
  styleUrls: ['./loan-registry.component.scss']
})
export class LoanRegistryComponent implements OnInit {
  loans: any[] = [];

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.loadLoans();
  }

  loadLoans() {
    if (typeof window === 'undefined' || !window.localStorage) {
      this.loans = [];
      return;
    }
    const userEmail = localStorage.getItem('username');
    if (!userEmail) {
      this.loans = [];
      return;
    }
    this.authService.getUserLoans(userEmail).subscribe({
      next: (data: any) => { this.loans = data; },
      error: (err) => { console.error(err); }
    });
  }

  returnVideogame(loanId: number) {
    const loan = this.loans.find(l => l.Codi === loanId);
    if (!loan) {
      console.error('Loan not found');
      return;
    }

    this.authService.returnVideogame(loan.Nom_Videojoc, loan.Email_Usuari).subscribe({
      next: () => { this.loadLoans(); },
      error: (err) => { console.error(err); }
    });
  }

  editLoanDays(loanId: number) {


    const loan = this.loans.find(l => l.Codi === loanId);
    if (!loan) return;

    const currentDays = Math.ceil(
      (new Date(loan.Data_fi).getTime() - new Date(loan.Data_inici).getTime()) / (1000 * 60 * 60 * 24)
    );
    const newDays = parseInt(prompt(`Introdueix el nou nombre de dies (1-14):`, currentDays.toString()) || '', 10);

    if (isNaN(newDays) || newDays < 1 || newDays > 14) {
      alert('Nombre de dies no vàlid (1-14)');
      return;
    }

    this.authService.getRenovacions(loanId).subscribe({
  next: (data: any) => {
    const renovacions = data.renovacions;
    if (renovacions >= 3) {
      alert('No es poden fer més renovacions per aquest préstec');
    } else {
      this.authService.updateLoanDays(loanId, newDays).subscribe({
        next: () => { this.loadLoans(); },
        error: (err) => { alert('Error actualitzant el préstec'); }
      });
    }
  }
});


  }

  goToUserHome() {
    this.router.navigate(['/user-home']);
  }
}