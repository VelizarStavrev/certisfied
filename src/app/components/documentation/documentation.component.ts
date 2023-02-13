import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import data from './data.json';

@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.scss']
})
export class DocumentationComponent implements OnInit {
  websiteSectionActive: boolean = false;
  apiSectionActive: boolean = false;

  currentSection: string = '';
  currentTopic: string = '';
  currentContent: { header: string, content: string } | null = null;
  
  routeSub = this.route.params.subscribe(params => {
    this.currentSection = params['section'];
    this.currentTopic = params['topic'];

    if (this.currentSection === 'website') {
      this.websiteSectionActive = true;
    }

    if (this.currentSection === 'api') {
      this.apiSectionActive = true;
    }

    this.getDocumentationData();
  });

  toggleWebsiteSectionActive() {
    this.websiteSectionActive = !this.websiteSectionActive;
  }

  toggleApiSectionActive() {
    this.apiSectionActive = !this.apiSectionActive;
  }

  getDocumentationData() {
    if (this.currentSection && this.currentTopic) {
      this.currentContent = data[this.currentSection][this.currentTopic];
    }
  }

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

}
