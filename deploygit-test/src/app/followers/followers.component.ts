import { Component, OnInit } from '@angular/core';
import { FollowerService } from '../services/followers.service';

@Component({
  selector: 'followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})
export class FollowersComponent implements OnInit {
followers: any;

  constructor(private service: FollowerService) { }

  ngOnInit() {
     this.service.getAll()
        .subscribe(response => this.followers = response);
  }
}
