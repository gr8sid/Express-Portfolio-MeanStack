import { Component, OnInit } from '@angular/core';
import { ProjectListService } from 'src/app/services/project-list.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { Project } from 'src/app/models/project';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {

  title: string;
  project: Project;

  constructor(
    private projectListService: ProjectListService,
    private flashMessage: FlashMessagesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.title = this.activatedRoute.snapshot.data.title;
    this.project = new Project();

    // fills in the contact._id property from the url
    this.activatedRoute.params.subscribe(params => {
      this.project._id = params.id;
    });

    if (this.title === 'Edit Project' || this.title === 'Project Details' ) {
      this.getProject(this.project);
    }

  }

  getProject(project: Project): void {
    this.projectListService.getProject(project).subscribe(data => {
      this.project = data.project;
    });
  }

  onProjectDetailsSubmit(): void {
    switch (this.title) {
      case 'Add Project':
        this.projectListService.addProject(this.project).subscribe(data => {
          if (data.success) {
            this.flashMessage.show(data.msg, {cssClass: 'alert-success', timeOut: 3000});
            this.router.navigate(['/projects/project-list']);
          } else {
            this.flashMessage.show('Adding Project Failed', {cssClass: 'alert-danger', timeOut: 3000});
            this.router.navigate(['/projects/project-list']);
          }
        });
        break;
      case 'Edit Project':
        this.projectListService.editProject(this.project).subscribe(data => {
          if (data.success) {
            this.flashMessage.show(data.msg, {cssClass: 'alert-success', timeOut: 3000});
            this.router.navigate(['/projects/project-list']);
          } else {
            this.flashMessage.show('Edit Project Failed', {cssClass: 'alert-danger', timeOut: 3000});
            this.router.navigate(['/projects/project-list']);
          }
        });
        break;
        case 'Project Details':
        this.projectListService.projectDetails(this.project).subscribe(data => {
          if (data.success) {
            this.flashMessage.show(data.msg, {cssClass: 'alert-success', timeOut: 3000});
            this.router.navigate(['/projects/project-list']);
          } else {
            this.flashMessage.show('Project Details Failed', {cssClass: 'alert-danger', timeOut: 3000});
            this.router.navigate(['/projects/project-list']);
          }
        });
        break;
    }
  }

}
