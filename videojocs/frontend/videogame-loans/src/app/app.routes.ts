import { Routes } from '@angular/router';
import { LoanRegistryComponent } from './components/loan-registry/loan-registry.component';
import { LoginComponentComponent } from './components/login-component/login-component.component';
import { UserHomeComponent } from './components/user-home/user-home.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponentComponent },
    { path: 'user-home', component: UserHomeComponent },
    { path: 'loan-registry', component: LoanRegistryComponent },
    { path: 'admin-home', component: AdminHomeComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' } 
];
