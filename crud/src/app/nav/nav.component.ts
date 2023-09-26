import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  isAuthenticated: boolean = false;
  constructor(private authService: AuthService, private router: Router ){}
  ngOnInit(): void {
    // Obtén el estado de autenticación inicial
    //this.isAuthenticated = this.authService.isAuth();    
    this.authService.getAuthState().subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
      console.log('EL ESTADO ES', this.isAuthenticated)
    }); //Estudiar
    
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/']);

  }
}
