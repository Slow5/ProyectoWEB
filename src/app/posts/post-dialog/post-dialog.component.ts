import { Component } from "@angular/core";
import { PostInfoComponent } from "../post-Info/post-info.component";
import { MatDialog} from '@angular/material/dialog';

@Component({
    selector: 'app-dialog',
    templateUrl: './post-dialog.component.html',
    styleUrls: ['./post-dialog.component.css']
  })

export class PostDialogComponent{

  constructor(public dialog:MatDialog) {}

  openDialogII(){
    this.dialog.open(PostInfoComponent);
  }
}