import { ProjectListService } from './../../services/project-list.service';
import { Project } from './../../models/project';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  projects: Project[];

  constructor(
    private projectListService: ProjectListService,
    private flashMessages: FlashMessagesService,
    private router: Router
    )
    { }

  ngOnInit() {
    this.projects = new Array<Project>();

    this.displayProjectList();
  }

  private displayProjectList(): void {
    this.projectListService.getProjectList().subscribe(data => {
      if(data.success) {
        this.projects = data.projectList;
      } else {
        this.flashMessages.show('User must be logged-in!!!', {cssClass: 'alert-danger', timeOut: 3000});
      }
    });
  }

  private onDeleteClick(): void {
    if(!confirm('Are You Sure?')) {
      this.router.navigate(['/projects/project-list']);
    }
  }

}
