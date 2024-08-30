import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  cambiarFondo(){

    let toggle: HTMLInputElement | null=document.getElementById('toggle') as HTMLInputElement
    let label_toggle:HTMLElement | null=document.getElementById('label_toggel') as HTMLElement
    if (toggle) {
      let cheaked: boolean = toggle.checked;
      document.body.classList.toggle('dark', cheaked)

      if (cheaked) {
        label_toggle!.innerHTML ='<i class="fa-regular fa-sun"></i>'
      }else{
        label_toggle!.innerHTML ='<i class="fa-regular fa-moon"></i>'
      }
    }
  }
}
