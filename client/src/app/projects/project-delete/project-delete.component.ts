import { Component, OnInit } from '@angular/core';
import { ProjectListService } from 'src/app/services/project-list.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { Project } from 'src/app/models/project';

@Component({
  selector: 'app-project-delete',
  templateUrl: './project-delete.component.html',
  styleUrls: ['./project-delete.component.css']
})
export class ProjectDeleteComponent implements OnInit {

  title: string;
  project: Project;

  constructor(
    private activateRoute: ActivatedRoute,
    private flashMessage: FlashMessagesService,
    private projectListService: ProjectListService,
    private router: Router
  ) { }

  ngOnInit() {
    this.title = this.activateRoute.snapshot.data.title;
    this.project = new Project();

    this.activateRoute.params.subscribe(params => {
      this.project._id = params.id;
    });

    this.deleteProject(this.project);
  }

  deleteProject(pro: Project): void {
    this.projectListService.deleteProject(pro). subscribe(data => {
      if (data.success) {
        this.flashMessage.show(data.msg, {cssClass: 'alert-warning', timeOut: 3000});
        this.router.navigate(['/projects/project-list']);
      } else {
        this.flashMessage.show('Delete Project Failed', {cssClass: 'alert-danger', timeOut: 3000});
        this.router.navigate(['/projects/project-list']);
      }
    });
  }

}
