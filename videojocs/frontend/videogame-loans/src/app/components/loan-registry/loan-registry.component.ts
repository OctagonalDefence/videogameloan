import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

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

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.loadLoans();
  }

  loadLoans() {
    this.authService.getAllLoans().subscribe({
      next: (data: any) => { this.loans = data; },
      error: (err) => { console.error(err); }
    });
  }

  returnVideogame(loanId: number) {
    const loan = this.loans.find(l => l.id === loanId);
    if (!loan) {
      console.error('Loan not found');
      return;
    }

    this.authService.returnVideogame(loan.videogame.id, loan.user.id).subscribe({
      next: () => { this.loadLoans(); },
      error: (err) => { console.error(err); }
    });
  }
}