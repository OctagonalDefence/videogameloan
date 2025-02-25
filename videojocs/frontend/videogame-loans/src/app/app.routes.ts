import { Routes } from '@angular/router';
import { LoanRegistryComponent } from './loan-registry/loan-registry.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponentComponent },
    { path: 'user-home', component: UserHomeComponent },
    { path: 'loan-registry', component: LoanRegistryComponent },
    { path: 'admin-home', component: AdminHomeComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' } 
];
