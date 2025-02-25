import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-loan-registry',
  standalone: true,
  imports: [CommonModule],
  providers: [AuthService],
  templateUrl: './loan-registry.component.html',
  styleUrl: './loan-registry.component.scss'
})
export class LoanRegistryComponent {
loans: any;

constructor(private authService: AuthService) { }

loadLoans() {
  this.authService.getAllLoans().subscribe({
    next: (data) => { this.loans = data; },
    error: (err) => { console.error(err); }
  });
}

returnVideogame(id: number) {
  this.authService.returnVideogame(id).subscribe({
    next: () => { this.loadLoans(); },
    error: (err) => { console.error(err); }
  });
}

}
