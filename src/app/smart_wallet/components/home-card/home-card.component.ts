import {Component, OnInit} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../../public/services/user.service";
import {SharedService} from "../../services/shared.service";

@Component({
  selector: 'app-home-card',
  standalone: true,
  imports: [
    MatCardModule,
  ],
  templateUrl: './home-card.component.html',
  styleUrl: './home-card.component.css'
})
export class HomeCardComponent implements OnInit{
  user: any;

  constructor(private route: ActivatedRoute, private userService: UserService, private sharedService: SharedService) {
  }

  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('id');
    if (typeof userId == 'string') {
      this.sharedService.setUserId(userId);
      this.userService.getOne(parseInt(userId)).subscribe(user => {
        this.user = user;
      });
    }
  }
}
