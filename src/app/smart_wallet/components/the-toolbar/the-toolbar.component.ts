import {Component, OnInit} from '@angular/core';
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {NgClass} from "@angular/common";
import {SharedService} from "../../services/shared.service";

@Component({
  selector: 'app-the-toolbar',
  standalone: true,
  imports: [
    MatToolbar,
    MatIcon,
    MatIconButton,
    MatButton,
    RouterLink,
    NgClass
  ],
  templateUrl: './the-toolbar.component.html',
  styleUrl: './the-toolbar.component.css'
})
export class TheToolbarComponent implements OnInit{
  selectedButton!: string;
  userId!: string|null;

  constructor(private sharedService: SharedService) { }

  ngOnInit() {
    this.sharedService.userId$.subscribe(userId => {
      this.userId = userId;
    });
    this.selectedButton = 'home';
  }

  selectButton(button: string) {
    this.selectedButton = button;
  }
}
