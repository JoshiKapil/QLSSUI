import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

interface DemoCategory {
  CategoryId: number;
  CategoryName: string;
  icon: string;
}
export interface TreeNode {
  id: number;
  name: string;
  type: 'folder' | 'file';
  expanded?: boolean;
  rev?: number;
  children?: TreeNode[];
}
interface DemoTraining {
  id: number;
  CategoryId: number;
  CategoryName: string;
  TrainingName: string;
  Duration: string;
  Modules: number;
  TrainingDesc: string;
  icon: string;
  theme: string;
}

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss', './demo.refine.component.scss']
})


export class DemoComponent implements OnInit {
  @ViewChild('categoryScroller') categoryScroller?: ElementRef<HTMLDivElement>;

  searchText = '';
  selectedCategoryId = 0;
menuGroups = [
  {
    title: 'DOCUMENT MANAGEMENT',
    items: [
      { label: 'Repository', icon: 'bi bi-folder-fill', active: true },
      { label: 'New Document', icon: 'bi bi-file-earmark-plus' },
      { label: 'Drafts', icon: 'bi bi-file-earmark-text' },
      { label: 'Submitted Documents', icon: 'bi bi-send' },
      { label: 'Approvals', icon: 'bi bi-check-circle', badge: 3, badgeClass: 'green' },
      { label: 'Amendments / Decline', icon: 'bi bi-arrow-counterclockwise', badge: 2, badgeClass: 'orange' }
    ]
  },
  {
    title: 'TASK MANAGEMENT',
    items: [
      { label: 'Organization Chart', icon: 'bi bi-diagram-3-fill' },
      { label: 'My Actions', icon: 'bi bi-check-square', badge: 8, badgeClass: 'green' },
      { label: 'Team Actions', icon: 'bi bi-people-fill' }
    ]
  },
  {
    title: 'KPI MANAGEMENT',
    items: [
      { label: 'KPI Entry', icon: 'bi bi-bar-chart-line' }
    ]
  },
  {
    title: 'ADMINISTRATION',
    items: [
      { label: 'Workflow Management', icon: 'bi bi-gear-fill' },
      { label: 'Reports', icon: 'bi bi-file-bar-graph' }
    ]
  }
];

repositoryTree: TreeNode[] = [
  {
    id: 1,
    name: 'ISO 9001:2015 Quality Management System',
    type: 'folder',
    expanded: true,
    children: [

      {
        id: 10,
        name: '4. Context of Organization',
        type: 'folder',
        expanded: false,
        children: [

          {
            id: 11,
            name: '4.1 Understanding Organization',
            type: 'folder',
            expanded: false,
            children: [

              {
                id: 12,
                name: 'Internal Issues',
                type: 'folder',
                expanded: false,
                children: [

                  {
                    id: 13,
                    name: 'SWOT Analysis',
                    type: 'folder',
                    expanded: false,
                    children: [

                      {
                        id: 14,
                        name: 'Documents',
                        type: 'folder',
                        expanded: false,
                        children: [

                          {
                            id: 15,
                            name: 'Organization Context Register.pdf',
                            type: 'file',
                            rev: 2
                          },
                          {
                            id: 16,
                            name: 'Risk Register.xlsx',
                            type: 'file',
                            rev: 5
                          }
                        ]
                      }

                    ]
                  }

                ]
              },

              {
                id: 17,
                name: 'External Issues',
                type: 'folder',
                expanded: false,
                children: [

                  {
                    id: 18,
                    name: 'Competitor Analysis.pdf',
                    type: 'file',
                    rev: 1
                  }
                ]
              }

            ]
          }

        ]
      },

      {
        id: 20,
        name: '5. Leadership',
        type: 'folder',
        expanded: false,
        children: [

          {
            id: 21,
            name: 'Quality Policy',
            type: 'folder',
            expanded: false,
            children: [

              {
                id: 22,
                name: 'Corporate Policy',
                type: 'folder',
                expanded: false,
                children: [

                  {
                    id: 23,
                    name: 'Quality Policy.docx',
                    type: 'file',
                    rev: 3
                  }
                ]
              }

            ]
          }

        ]
      },

      {
        id: 30,
        name: '7. Support',
        type: 'folder',
        expanded: false,
        children: [

          {
            id: 31,
            name: '7.5 Documented Information',
            type: 'folder',
            expanded: false,
            children: [

              {
                id: 32,
                name: 'Quality Manual',
                type: 'folder',
                expanded: false,
                children: [

                  {
                    id: 33,
                    name: 'Revision History',
                    type: 'folder',
                    expanded: false,
                    children: [

                      {
                        id: 34,
                        name: 'Quality Manual Rev 2.docx',
                        type: 'file',
                        rev: 2
                      },
                      {
                        id: 35,
                        name: 'Document Control.pdf',
                        type: 'file',
                        rev: 1
                      }
                    ]
                  }

                ]
              }

            ]
          }

        ]
      }

    ]
  },

  {
    id: 100,
    name: 'ISO 9001:2015 Quality Management System New',
    type: 'folder',
    expanded: false,
    children: [

      {
        id: 101,
        name: '8. Operation',
        type: 'folder',
        expanded: false,
        children: [

          {
            id: 102,
            name: 'Production',
            type: 'folder',
            expanded: false,
            children: [

              {
                id: 103,
                name: 'Work Instructions',
                type: 'folder',
                expanded: false,
                children: [

                  {
                    id: 104,
                    name: 'Assembly',
                    type: 'folder',
                    expanded: false,
                    children: [

                      {
                        id: 105,
                        name: 'WI-001.pdf',
                        type: 'file',
                        rev: 4
                      },
                      {
                        id: 106,
                        name: 'WI-002.pdf',
                        type: 'file',
                        rev: 2
                      }
                    ]
                  }

                ]
              }

            ]
          }

        ]
      }

    ]
  }
]

;toggleNode(node: any): void {
  if (node.type !== 'folder') {
    return;
  }

  node.expanded = !node.expanded;
}


workflowSteps = [
  {
    title: 'Document Created',
    description: 'By: Makrand Deshpande',
    date: 'On: 20-May-2025 10:15 AM',
    status: 'done',
    icon: 'bi bi-file-earmark-plus'
  },
  {
    title: 'Submitted',
    description: 'By: Makrand Deshpande',
    date: 'On: 20-May-2025 11:02 AM',
    status: 'done',
    icon: 'bi bi-send-check'
  },
  {
    title: 'In Review Level 1',
    description: 'Reviewer: Suhas Kulkarni',
    date: 'Since: 20-May-2025 11:30 AM',
    status: 'active',
    badge: 'In Progress',
    icon: 'bi bi-hourglass-split'
  },
  {
    title: 'In Review Level 2',
    description: 'Reviewer: Pravin Patil',
    date: '',
    status: 'pending',
    badge: 'Pending',
    icon: 'bi bi-person-check'
  },
  {
    title: 'Approval',
    description: 'Approver: Pravin Patil',
    date: '',
    status: 'pending',
    badge: 'Pending',
    icon: 'bi bi-check2-circle'
  }
];

documentDetails = [
  { label: 'Document Title', value: 'Work Instruction - Production Flow' },
  { label: 'Document Type', value: 'Work Instruction' },
  { label: 'Document Number', value: 'WI-8.5.2-001' },
  { label: 'Category', value: '8.5 Production and Service Provision' },
  { label: 'Owner', value: 'Makrand Deshpande' },
  { label: 'Current Version', value: '1.0' },
  { label: 'Status', value: 'In Review Level 1' },
  { label: 'Effective Date', value: '20-May-2025' },
  { label: 'Next Review', value: '20-May-2026' },
  { label: 'File Name', value: '8.5.2 Work Instruction - Production Flow.pdf' },
  {
    label: 'Description',
    value: 'This document describes the standard workflow for production process.'
  }
];
  CategoryList: DemoCategory[] = [
    { CategoryId: 0, CategoryName: 'All Trainings', icon: 'fa-border-all' },
    { CategoryId: 1, CategoryName: 'Quality', icon: 'fa-shield-halved' },
    { CategoryId: 2, CategoryName: 'Core Tools', icon: 'fa-briefcase' },
    { CategoryId: 3, CategoryName: 'Management', icon: 'fa-users-gear' },
    { CategoryId: 4, CategoryName: 'Automotive', icon: 'fa-car-side' },
    { CategoryId: 5, CategoryName: 'Problem Solving', icon: 'fa-gear' }
  ];

  trainings: DemoTraining[] = [
    { id: 1, CategoryId: 1, CategoryName: 'Quality Management', TrainingName: 'IATF 16949 Internal Auditor Training', Duration: '2 Days', Modules: 8, TrainingDesc: 'Understand the requirements and prepare for internal audits as per IATF 16949:2016 standard.', icon: 'fa-shield-halved', theme: 'blue' },
    { id: 2, CategoryId: 2, CategoryName: 'Core Tools', TrainingName: 'Core Tools Training for Automotive Quality', Duration: '2 Days', Modules: 7, TrainingDesc: 'Learn the essential 7 core tools used in quality planning and continuous improvement.', icon: 'fa-briefcase', theme: 'green' },
    { id: 3, CategoryId: 1, CategoryName: 'Quality Tools', TrainingName: '7 QC Tools Training 2 Days', Duration: '2 Days', Modules: 6, TrainingDesc: 'Understand and apply the 7 basic quality control tools to analyze and solve real-time quality problems.', icon: 'fa-chart-simple', theme: 'purple' },
    { id: 4, CategoryId: 5, CategoryName: 'Problem Solving', TrainingName: 'Problem Solving & Root Cause Analysis', Duration: '2 Days', Modules: 6, TrainingDesc: 'Build strong problem-solving skills using proven methodologies like RCA, 5 Why, Fishbone Diagram and more.', icon: 'fa-users', theme: 'orange' },
    { id: 5, CategoryId: 1, CategoryName: 'Quality Tools', TrainingName: 'Statistical Process Control (SPC)', Duration: '2 Days', Modules: 7, TrainingDesc: 'Learn SPC techniques to monitor process variation and improve product quality.', icon: 'fa-gear', theme: 'cyan' },
    { id: 6, CategoryId: 3, CategoryName: 'Measurement System', TrainingName: 'Measurement System Analysis (MSA)', Duration: '2 Days', Modules: 6, TrainingDesc: 'Understand measurement system evaluation techniques to ensure data accuracy and reliability.', icon: 'fa-award', theme: 'pink' }
  ];

  filteredTrainings: DemoTraining[] = [...this.trainings];

  ngOnInit(): void {
    this.applyFilters();
  }

  onSearch(): void {
    this.applyFilters();
  }

  selectCategory(categoryId: number): void {
    this.selectedCategoryId = categoryId;
    this.applyFilters();
  }

  scrollCategories(direction: 'left' | 'right'): void {
    const scroller = this.categoryScroller?.nativeElement;

    if (!scroller) {
      return;
    }

    scroller.scrollBy({ left: direction === 'left' ? -260 : 260, behavior: 'smooth' });
  }

  trackByTraining(_: number, item: DemoTraining): number {
    return item.id;
  }

  private applyFilters(): void {
    const query = this.searchText.trim().toLowerCase();

    this.filteredTrainings = this.trainings.filter((item) => {
      const matchesCategory = this.selectedCategoryId === 0 || item.CategoryId === this.selectedCategoryId;
      const searchable = (item.CategoryName + ' ' + item.TrainingName + ' ' + item.TrainingDesc).toLowerCase();
      const matchesSearch = query.length === 0 || searchable.includes(query);

      return matchesCategory && matchesSearch;
    });
  }
}
