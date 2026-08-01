import { Component, ViewChild } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
const _c0 = ["categoryScroller"];
function DemoComponent_ng_container_14_a_3_b_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "b");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r8 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵclassMap(item_r8.badgeClass);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(item_r8.badge);
} }
function DemoComponent_ng_container_14_a_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 89);
    i0.ɵɵelement(1, "i");
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, DemoComponent_ng_container_14_a_3_b_4_Template, 2, 3, "b", 90);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r8 = ctx.$implicit;
    i0.ɵɵclassProp("active", item_r8.active);
    i0.ɵɵadvance(1);
    i0.ɵɵclassMap(item_r8.icon);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r8.label);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", item_r8.badge);
} }
function DemoComponent_ng_container_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 87);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, DemoComponent_ng_container_14_a_3_Template, 5, 6, "a", 88);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const group_r6 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(group_r6.title);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", group_r6.items);
} }
function DemoComponent_ng_container_108_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
const _c1 = function (a0) { return { $implicit: a0, level: 0 }; };
function DemoComponent_ng_container_108_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, DemoComponent_ng_container_108_ng_container_1_Template, 1, 0, "ng-container", 91);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const node_r11 = ctx.$implicit;
    i0.ɵɵnextContext();
    const _r2 = i0.ɵɵreference(110);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngTemplateOutlet", _r2)("ngTemplateOutletContext", i0.ɵɵpureFunction1(2, _c1, node_r11));
} }
function DemoComponent_ng_template_109_button_2_Template(rf, ctx) { if (rf & 1) {
    const _r22 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 100);
    i0.ɵɵlistener("click", function DemoComponent_ng_template_109_button_2_Template_button_click_0_listener($event) { i0.ɵɵrestoreView(_r22); const node_r13 = i0.ɵɵnextContext().$implicit; const ctx_r20 = i0.ɵɵnextContext(); ctx_r20.toggleNode(node_r13); return i0.ɵɵresetView($event.stopPropagation()); });
    i0.ɵɵelement(1, "i", 101);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const node_r13 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵclassProp("bi-dash", node_r13.expanded)("bi-plus", !node_r13.expanded);
} }
function DemoComponent_ng_template_109_ng_template_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 102);
} }
function DemoComponent_ng_template_109_small_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const node_r13 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1("Rev ", node_r13.rev, "");
} }
function DemoComponent_ng_template_109_div_9_ng_container_1_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
const _c2 = function (a0, a1) { return { $implicit: a0, level: a1 }; };
function DemoComponent_ng_template_109_div_9_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, DemoComponent_ng_template_109_div_9_ng_container_1_ng_container_1_Template, 1, 0, "ng-container", 91);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const child_r26 = ctx.$implicit;
    const level_r14 = i0.ɵɵnextContext(2).level;
    i0.ɵɵnextContext();
    const _r2 = i0.ɵɵreference(110);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngTemplateOutlet", _r2)("ngTemplateOutletContext", i0.ɵɵpureFunction2(2, _c2, child_r26, level_r14 + 1));
} }
function DemoComponent_ng_template_109_div_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 103);
    i0.ɵɵtemplate(1, DemoComponent_ng_template_109_div_9_ng_container_1_Template, 2, 5, "ng-container", 5);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const node_r13 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", node_r13.children);
} }
function DemoComponent_ng_template_109_Template(rf, ctx) { if (rf & 1) {
    const _r31 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 92)(1, "div", 93);
    i0.ɵɵlistener("click", function DemoComponent_ng_template_109_Template_div_click_1_listener() { const restoredCtx = i0.ɵɵrestoreView(_r31); const node_r13 = restoredCtx.$implicit; const ctx_r30 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r30.toggleNode(node_r13)); });
    i0.ɵɵtemplate(2, DemoComponent_ng_template_109_button_2_Template, 2, 4, "button", 94);
    i0.ɵɵtemplate(3, DemoComponent_ng_template_109_ng_template_3_Template, 1, 0, "ng-template", null, 95, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelement(5, "i", 96);
    i0.ɵɵelementStart(6, "span", 97);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(8, DemoComponent_ng_template_109_small_8_Template, 2, 1, "small", 98);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(9, DemoComponent_ng_template_109_div_9_Template, 2, 1, "div", 99);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const node_r13 = ctx.$implicit;
    const level_r14 = ctx.level;
    const _r16 = i0.ɵɵreference(4);
    i0.ɵɵadvance(1);
    i0.ɵɵstyleProp("--level", level_r14);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", node_r13.type === "folder")("ngIfElse", _r16);
    i0.ɵɵadvance(3);
    i0.ɵɵclassProp("bi-folder2-open", node_r13.type === "folder" && node_r13.expanded)("bi-folder-fill", node_r13.type === "folder" && !node_r13.expanded)("bi-file-earmark-pdf-fill", node_r13.type === "file" && (node_r13.name == null ? null : node_r13.name.toLowerCase().endsWith(".pdf")))("bi-file-earmark-word-fill", node_r13.type === "file" && (node_r13.name == null ? null : node_r13.name.toLowerCase().endsWith(".docx")))("bi-file-earmark-excel-fill", node_r13.type === "file" && (node_r13.name == null ? null : node_r13.name.toLowerCase().endsWith(".xlsx")))("bi-file-earmark-fill", node_r13.type === "file");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(node_r13.name);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", node_r13.rev);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", node_r13.expanded && (node_r13.children == null ? null : node_r13.children.length));
} }
function DemoComponent_div_126_em_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "em");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const step_r32 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(step_r32.badge);
} }
function DemoComponent_div_126_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 104)(1, "div", 105);
    i0.ɵɵelement(2, "i");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 106)(4, "h4");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "small");
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(10, DemoComponent_div_126_em_10_Template, 2, 1, "em", 98);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const step_r32 = ctx.$implicit;
    i0.ɵɵclassProp("done", step_r32.status === "done")("active", step_r32.status === "active")("pending", step_r32.status === "pending");
    i0.ɵɵadvance(2);
    i0.ɵɵclassMap(step_r32.icon);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(step_r32.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(step_r32.description);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(step_r32.date);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", step_r32.badge);
} }
function DemoComponent_div_151_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div")(1, "label");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const item_r35 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r35.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r35.value);
} }
export class DemoComponent {
    constructor() {
        this.searchText = '';
        this.selectedCategoryId = 0;
        this.menuGroups = [
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
        this.repositoryTree = [
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
        ];
        this.workflowSteps = [
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
        this.documentDetails = [
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
        this.CategoryList = [
            { CategoryId: 0, CategoryName: 'All Trainings', icon: 'fa-border-all' },
            { CategoryId: 1, CategoryName: 'Quality', icon: 'fa-shield-halved' },
            { CategoryId: 2, CategoryName: 'Core Tools', icon: 'fa-briefcase' },
            { CategoryId: 3, CategoryName: 'Management', icon: 'fa-users-gear' },
            { CategoryId: 4, CategoryName: 'Automotive', icon: 'fa-car-side' },
            { CategoryId: 5, CategoryName: 'Problem Solving', icon: 'fa-gear' }
        ];
        this.trainings = [
            { id: 1, CategoryId: 1, CategoryName: 'Quality Management', TrainingName: 'IATF 16949 Internal Auditor Training', Duration: '2 Days', Modules: 8, TrainingDesc: 'Understand the requirements and prepare for internal audits as per IATF 16949:2016 standard.', icon: 'fa-shield-halved', theme: 'blue' },
            { id: 2, CategoryId: 2, CategoryName: 'Core Tools', TrainingName: 'Core Tools Training for Automotive Quality', Duration: '2 Days', Modules: 7, TrainingDesc: 'Learn the essential 7 core tools used in quality planning and continuous improvement.', icon: 'fa-briefcase', theme: 'green' },
            { id: 3, CategoryId: 1, CategoryName: 'Quality Tools', TrainingName: '7 QC Tools Training 2 Days', Duration: '2 Days', Modules: 6, TrainingDesc: 'Understand and apply the 7 basic quality control tools to analyze and solve real-time quality problems.', icon: 'fa-chart-simple', theme: 'purple' },
            { id: 4, CategoryId: 5, CategoryName: 'Problem Solving', TrainingName: 'Problem Solving & Root Cause Analysis', Duration: '2 Days', Modules: 6, TrainingDesc: 'Build strong problem-solving skills using proven methodologies like RCA, 5 Why, Fishbone Diagram and more.', icon: 'fa-users', theme: 'orange' },
            { id: 5, CategoryId: 1, CategoryName: 'Quality Tools', TrainingName: 'Statistical Process Control (SPC)', Duration: '2 Days', Modules: 7, TrainingDesc: 'Learn SPC techniques to monitor process variation and improve product quality.', icon: 'fa-gear', theme: 'cyan' },
            { id: 6, CategoryId: 3, CategoryName: 'Measurement System', TrainingName: 'Measurement System Analysis (MSA)', Duration: '2 Days', Modules: 6, TrainingDesc: 'Understand measurement system evaluation techniques to ensure data accuracy and reliability.', icon: 'fa-award', theme: 'pink' }
        ];
        this.filteredTrainings = [...this.trainings];
    }
    toggleNode(node) {
        if (node.type !== 'folder') {
            return;
        }
        node.expanded = !node.expanded;
    }
    ngOnInit() {
        this.applyFilters();
    }
    onSearch() {
        this.applyFilters();
    }
    selectCategory(categoryId) {
        this.selectedCategoryId = categoryId;
        this.applyFilters();
    }
    scrollCategories(direction) {
        var _a;
        const scroller = (_a = this.categoryScroller) === null || _a === void 0 ? void 0 : _a.nativeElement;
        if (!scroller) {
            return;
        }
        scroller.scrollBy({ left: direction === 'left' ? -260 : 260, behavior: 'smooth' });
    }
    trackByTraining(_, item) {
        return item.id;
    }
    applyFilters() {
        const query = this.searchText.trim().toLowerCase();
        this.filteredTrainings = this.trainings.filter((item) => {
            const matchesCategory = this.selectedCategoryId === 0 || item.CategoryId === this.selectedCategoryId;
            const searchable = (item.CategoryName + ' ' + item.TrainingName + ' ' + item.TrainingDesc).toLowerCase();
            const matchesSearch = query.length === 0 || searchable.includes(query);
            return matchesCategory && matchesSearch;
        });
    }
}
DemoComponent.ɵfac = function DemoComponent_Factory(t) { return new (t || DemoComponent)(); };
DemoComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: DemoComponent, selectors: [["app-demo"]], viewQuery: function DemoComponent_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(_c0, 5);
    } if (rf & 2) {
        let _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.categoryScroller = _t.first);
    } }, decls: 308, vars: 4, consts: [[1, "dms-shell"], [1, "dms-sidebar"], [1, "brand-card"], [1, "qlss-logo"], [1, "sidebar-menu"], [4, "ngFor", "ngForOf"], [1, "sidebar-bottom"], [1, "bi", "bi-box-arrow-right"], [1, "dms-main"], [1, "topbar"], [1, "top-menu"], [1, "bi", "bi-folder2-open"], [1, "bi", "bi-check2-square"], [1, "bi", "bi-graph-up-arrow"], [1, "bi", "bi-file-earmark-bar-graph"], [1, "bi", "bi-sliders"], [1, "top-right"], [1, "search-box"], [1, "bi", "bi-search"], ["type", "text", "placeholder", "Search documents, actions..."], [1, "notify-btn"], [1, "bi", "bi-bell"], [1, "user-card"], [1, "avatar"], [1, "content-area"], [1, "page-title"], [1, "primary-action"], [1, "bi", "bi-plus-circle"], [1, "stats-row", 2, "display", "none"], [1, "stat-card"], [1, "bi", "bi-folder-check"], [1, "stat-card", "orange"], [1, "bi", "bi-hourglass-split"], [1, "stat-card", "green"], [1, "bi", "bi-check-circle"], [1, "dashboard-grid"], [1, "glass-card", "repository-card"], [1, "card-head"], [1, "card-actions"], [1, "bi", "bi-arrow-clockwise"], [1, "bi", "bi-arrows-fullscreen"], [1, "bi", "bi-folder-plus"], [1, "tree-search"], ["type", "text", "placeholder", "Search in tree..."], [1, "tree-box"], ["treeTemplate", ""], [1, "glass-card", "workflow-card"], [1, "close-btn"], [1, "current-status"], [1, "timeline"], ["class", "timeline-step", 3, "done", "active", "pending", 4, "ngFor", "ngForOf"], [1, "comment-box"], [1, "glass-card", "details-card"], [1, "edit-btn"], [1, "doc-preview"], [1, "bi", "bi-file-earmark-pdf-fill"], [1, "details-list"], [1, "history-btn"], [1, "bi", "bi-clock-history"], [1, "bottom-dashboard-grid"], [1, "dms-panel", "org-panel"], [1, "panel-header"], ["type", "button", 1, "icon-btn"], [1, "org-chart"], [1, "org-row", "center"], [1, "org-card"], [1, "avatar", "blue"], [1, "org-row", "heads"], [1, "avatar", "pink"], [1, "org-card", "active"], [1, "avatar", "green"], [1, "avatar", "teal"], [1, "org-row", "team"], [1, "org-card", "small"], [1, "avatar", "purple"], [1, "avatar", "orange"], [1, "avatar", "gray"], [1, "dms-panel", "actions-panel"], ["type", "button", 1, "export-btn"], [1, "bi", "bi-download"], [1, "table-wrap"], [1, "actions-table"], [1, "badge", "high"], [1, "badge", "progress"], [1, "badge", "medium"], [1, "badge", "pending"], [1, "badge", "low"], [1, "menu-title"], ["class", "menu-item", 3, "active", 4, "ngFor", "ngForOf"], [1, "menu-item"], [3, "class", 4, "ngIf"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "tree-node"], [1, "tree-row", 3, "click"], ["class", "expand-btn", "type", "button", 3, "click", 4, "ngIf", "ngIfElse"], ["fileSpace", ""], [1, "node-icon", "bi"], [1, "node-title"], [4, "ngIf"], ["class", "tree-children", 4, "ngIf"], ["type", "button", 1, "expand-btn", 3, "click"], [1, "bi"], [1, "expand-space"], [1, "tree-children"], [1, "timeline-step"], [1, "dot"], [1, "step-content"]], template: function DemoComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0)(1, "aside", 1)(2, "div", 2)(3, "div", 3);
        i0.ɵɵelement(4, "span")(5, "span")(6, "span")(7, "span");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(8, "div")(9, "h2");
        i0.ɵɵtext(10, "QLSS");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(11, "p");
        i0.ɵɵtext(12, "Document Management System");
        i0.ɵɵelementEnd()()();
        i0.ɵɵelementStart(13, "nav", 4);
        i0.ɵɵtemplate(14, DemoComponent_ng_container_14_Template, 4, 2, "ng-container", 5);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(15, "div", 6)(16, "div");
        i0.ɵɵtext(17, "\u00A9 2025 QLSS DMS");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(18, "div");
        i0.ɵɵtext(19, "Version 1.0.0");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(20, "button");
        i0.ɵɵelement(21, "i", 7);
        i0.ɵɵtext(22, " Logout ");
        i0.ɵɵelementEnd()()();
        i0.ɵɵelementStart(23, "main", 8)(24, "header", 9)(25, "div", 10)(26, "a");
        i0.ɵɵelement(27, "i", 11);
        i0.ɵɵtext(28, " DMS");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(29, "a");
        i0.ɵɵelement(30, "i", 12);
        i0.ɵɵtext(31, " Tasks");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(32, "a");
        i0.ɵɵelement(33, "i", 13);
        i0.ɵɵtext(34, " KPI Entry");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(35, "a");
        i0.ɵɵelement(36, "i", 14);
        i0.ɵɵtext(37, " Reports");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(38, "a");
        i0.ɵɵelement(39, "i", 15);
        i0.ɵɵtext(40, " Administration");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(41, "div", 16)(42, "div", 17);
        i0.ɵɵelement(43, "i", 18)(44, "input", 19);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(45, "button", 20);
        i0.ɵɵelement(46, "i", 21);
        i0.ɵɵelementStart(47, "span");
        i0.ɵɵtext(48, "5");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(49, "div", 22)(50, "div", 23);
        i0.ɵɵtext(51, "A");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(52, "div")(53, "strong");
        i0.ɵɵtext(54, "Admin User");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(55, "small");
        i0.ɵɵtext(56, "Administrator");
        i0.ɵɵelementEnd()()()()();
        i0.ɵɵelementStart(57, "section", 24)(58, "div", 25)(59, "div")(60, "span");
        i0.ɵɵtext(61, "Dashboard / Repository");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(62, "h1");
        i0.ɵɵtext(63, "Document Repository");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(64, "button", 26);
        i0.ɵɵelement(65, "i", 27);
        i0.ɵɵtext(66, " New Document ");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(67, "section", 28)(68, "div", 29);
        i0.ɵɵelement(69, "i", 30);
        i0.ɵɵelementStart(70, "div")(71, "strong");
        i0.ɵɵtext(72, "124");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(73, "span");
        i0.ɵɵtext(74, "Total Documents");
        i0.ɵɵelementEnd()()();
        i0.ɵɵelementStart(75, "div", 31);
        i0.ɵɵelement(76, "i", 32);
        i0.ɵɵelementStart(77, "div")(78, "strong");
        i0.ɵɵtext(79, "12");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(80, "span");
        i0.ɵɵtext(81, "In Review");
        i0.ɵɵelementEnd()()();
        i0.ɵɵelementStart(82, "div", 33);
        i0.ɵɵelement(83, "i", 34);
        i0.ɵɵelementStart(84, "div")(85, "strong");
        i0.ɵɵtext(86, "89");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(87, "span");
        i0.ɵɵtext(88, "Approved");
        i0.ɵɵelementEnd()()()();
        i0.ɵɵelementStart(89, "div", 35)(90, "section", 36)(91, "div", 37)(92, "div")(93, "small");
        i0.ɵɵtext(94, "ISO 9001:2015");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(95, "h3");
        i0.ɵɵtext(96, "Repository Tree");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(97, "div", 38)(98, "button");
        i0.ɵɵelement(99, "i", 39);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(100, "button");
        i0.ɵɵelement(101, "i", 40);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(102, "button");
        i0.ɵɵelement(103, "i", 41);
        i0.ɵɵelementEnd()()();
        i0.ɵɵelementStart(104, "div", 42);
        i0.ɵɵelement(105, "i", 18)(106, "input", 43);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(107, "div", 44);
        i0.ɵɵtemplate(108, DemoComponent_ng_container_108_Template, 2, 4, "ng-container", 5);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(109, DemoComponent_ng_template_109_Template, 10, 19, "ng-template", null, 45, i0.ɵɵtemplateRefExtractor);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(111, "section", 46)(112, "div", 37)(113, "div")(114, "small");
        i0.ɵɵtext(115, "Live Workflow");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(116, "h3");
        i0.ɵɵtext(117, "8.5.2 Work Instruction - Production Flow.pdf");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(118, "button", 47);
        i0.ɵɵtext(119, "\u00D7");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(120, "div", 48)(121, "span");
        i0.ɵɵtext(122, "Current Status");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(123, "b");
        i0.ɵɵtext(124, "In Review Level 1");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(125, "div", 49);
        i0.ɵɵtemplate(126, DemoComponent_div_126_Template, 11, 12, "div", 50);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(127, "div", 51)(128, "h4");
        i0.ɵɵtext(129, "Comments / Rejection Reason");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(130, "p");
        i0.ɵɵtext(131, "No comments yet.");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(132, "button");
        i0.ɵɵtext(133, "Open Workflow Popup");
        i0.ɵɵelementEnd()()();
        i0.ɵɵelementStart(134, "section", 52)(135, "div", 37)(136, "div")(137, "small");
        i0.ɵɵtext(138, "Selected Document");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(139, "h3");
        i0.ɵɵtext(140, "Document Details");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(141, "button", 53);
        i0.ɵɵtext(142, "Edit");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(143, "div", 54);
        i0.ɵɵelement(144, "i", 55);
        i0.ɵɵelementStart(145, "div")(146, "h4");
        i0.ɵɵtext(147, "Work Instruction");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(148, "p");
        i0.ɵɵtext(149, "Production Flow");
        i0.ɵɵelementEnd()()();
        i0.ɵɵelementStart(150, "div", 56);
        i0.ɵɵtemplate(151, DemoComponent_div_151_Template, 5, 2, "div", 5);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(152, "button", 57);
        i0.ɵɵelement(153, "i", 58);
        i0.ɵɵtext(154, " View Complete History ");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(155, "div", 59)(156, "section", 60)(157, "div", 61)(158, "h3");
        i0.ɵɵtext(159, "Organization Chart");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(160, "button", 62);
        i0.ɵɵelement(161, "i", 40);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(162, "div", 63)(163, "div", 64)(164, "div", 65)(165, "div", 66);
        i0.ɵɵtext(166, "IS");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(167, "strong");
        i0.ɵɵtext(168, "Pravin");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(169, "span");
        i0.ɵɵtext(170, "Managing Director");
        i0.ɵɵelementEnd()()();
        i0.ɵɵelementStart(171, "div", 67)(172, "div", 65)(173, "div", 68);
        i0.ɵɵtext(174, "SJ");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(175, "strong");
        i0.ɵɵtext(176, "Suhas");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(177, "span");
        i0.ɵɵtext(178, "Operations Head");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(179, "div", 69)(180, "div", 70);
        i0.ɵɵtext(181, "ED");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(182, "strong");
        i0.ɵɵtext(183, "Makrand");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(184, "span");
        i0.ɵɵtext(185, "Technology Head");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(186, "div", 65)(187, "div", 71);
        i0.ɵɵtext(188, "DL");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(189, "strong");
        i0.ɵɵtext(190, "Kapil");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(191, "span");
        i0.ɵɵtext(192, "Quality Head");
        i0.ɵɵelementEnd()()();
        i0.ɵɵelementStart(193, "div", 72)(194, "div", 73)(195, "div", 74);
        i0.ɵɵtext(196, "MB");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(197, "strong");
        i0.ɵɵtext(198, "Amit");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(199, "span");
        i0.ɵɵtext(200, "Ops Executive");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(201, "div", 73)(202, "div", 75);
        i0.ɵɵtext(203, "RT");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(204, "strong");
        i0.ɵɵtext(205, "Aniket");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(206, "span");
        i0.ɵɵtext(207, "Developer");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(208, "div", 73)(209, "div", 68);
        i0.ɵɵtext(210, "SJ");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(211, "strong");
        i0.ɵɵtext(212, "Priya");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(213, "span");
        i0.ɵɵtext(214, "QA Engineer");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(215, "div", 73)(216, "div", 76);
        i0.ɵɵtext(217, "JW");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(218, "strong");
        i0.ɵɵtext(219, "Nilesh");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(220, "span");
        i0.ɵɵtext(221, "Store Assistant");
        i0.ɵɵelementEnd()()()()();
        i0.ɵɵelementStart(222, "section", 77)(223, "div", 61)(224, "h3");
        i0.ɵɵtext(225, "My Actions ");
        i0.ɵɵelementStart(226, "span");
        i0.ɵɵtext(227, "(This Week)");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(228, "button", 78);
        i0.ɵɵelement(229, "i", 79);
        i0.ɵɵtext(230, " Export ");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(231, "div", 80)(232, "table", 81)(233, "thead")(234, "tr")(235, "th");
        i0.ɵɵtext(236, "Action ID");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(237, "th");
        i0.ɵɵtext(238, "Action / Task");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(239, "th");
        i0.ɵɵtext(240, "Assigned To");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(241, "th");
        i0.ɵɵtext(242, "Priority");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(243, "th");
        i0.ɵɵtext(244, "Due Date");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(245, "th");
        i0.ɵɵtext(246, "Status");
        i0.ɵɵelementEnd()()();
        i0.ɵɵelementStart(247, "tbody")(248, "tr")(249, "td");
        i0.ɵɵtext(250, "ACT-2025-001");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(251, "td");
        i0.ɵɵtext(252, "Review Internal Audit Report");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(253, "td");
        i0.ɵɵtext(254, "Priya Sharma");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(255, "td")(256, "span", 82);
        i0.ɵɵtext(257, "High");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(258, "td");
        i0.ɵɵtext(259, "21-May-2025");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(260, "td")(261, "span", 83);
        i0.ɵɵtext(262, "In Progress");
        i0.ɵɵelementEnd()()();
        i0.ɵɵelementStart(263, "tr")(264, "td");
        i0.ɵɵtext(265, "ACT-2025-002");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(266, "td");
        i0.ɵɵtext(267, "Update Quality Manual");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(268, "td");
        i0.ɵɵtext(269, "Nikhil More");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(270, "td")(271, "span", 84);
        i0.ɵɵtext(272, "Medium");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(273, "td");
        i0.ɵɵtext(274, "22-May-2025");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(275, "td")(276, "span", 85);
        i0.ɵɵtext(277, "Pending");
        i0.ɵɵelementEnd()()();
        i0.ɵɵelementStart(278, "tr")(279, "td");
        i0.ɵɵtext(280, "ACT-2025-003");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(281, "td");
        i0.ɵɵtext(282, "Check Supplier Evaluation");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(283, "td");
        i0.ɵɵtext(284, "Rohit Gawade");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(285, "td")(286, "span", 84);
        i0.ɵɵtext(287, "Medium");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(288, "td");
        i0.ɵɵtext(289, "23-May-2025");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(290, "td")(291, "span", 85);
        i0.ɵɵtext(292, "Pending");
        i0.ɵɵelementEnd()()();
        i0.ɵɵelementStart(293, "tr")(294, "td");
        i0.ɵɵtext(295, "ACT-2025-004");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(296, "td");
        i0.ɵɵtext(297, "Verify Training Records");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(298, "td");
        i0.ɵɵtext(299, "Sneha Jadhav");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(300, "td")(301, "span", 86);
        i0.ɵɵtext(302, "Low");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(303, "td");
        i0.ɵɵtext(304, "24-May-2025");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(305, "td")(306, "span", 85);
        i0.ɵɵtext(307, "Pending");
        i0.ɵɵelementEnd()()()()()()()()()()()();
    } if (rf & 2) {
        i0.ɵɵadvance(14);
        i0.ɵɵproperty("ngForOf", ctx.menuGroups);
        i0.ɵɵadvance(94);
        i0.ɵɵproperty("ngForOf", ctx.repositoryTree);
        i0.ɵɵadvance(18);
        i0.ɵɵproperty("ngForOf", ctx.workflowSteps);
        i0.ɵɵadvance(25);
        i0.ɵɵproperty("ngForOf", ctx.documentDetails);
    } }, dependencies: [i1.NgForOf, i1.NgIf, i1.NgTemplateOutlet], styles: ["[_nghost-%COMP%] {\n  display: block;\n  min-height: 100vh;\n  font-family: \"Inter\", \"Segoe UI\", Arial, sans-serif;\n  color: #071b3a;\n  background: #f4f8ff;\n}\n\n*[_ngcontent-%COMP%], *[_ngcontent-%COMP%]::before, *[_ngcontent-%COMP%]::after {\n  box-sizing: border-box;\n}\n\n[_nghost-%COMP%] {\n  --primary: #1769ff;\n  --primary-dark: #0b3b92;\n  --secondary: #13b8a6;\n  --success: #12b76a;\n  --warning: #f77009;\n  --danger: #f04438;\n  --ink: #071b3a;\n  --muted: #667085;\n  --soft: #eef5ff;\n  --line: rgba(160, 180, 210, 0.34);\n  --card: rgba(255, 255, 255, 0.82);\n  --shadow-sm: 0 10px 24px rgba(12, 33, 70, 0.08);\n  --shadow-md: 0 20px 48px rgba(12, 33, 70, 0.12);\n  --shadow-lg: 0 30px 70px rgba(12, 33, 70, 0.16);\n  --radius-sm: 14px;\n  --radius-md: 20px;\n  --radius-lg: 28px;\n}\n\n\n.dms-shell[_ngcontent-%COMP%] {\n  height: 100vh;\n  min-height: 100vh;\n  display: flex;\n  overflow: hidden;\n  background:\n    radial-gradient(circle at 8% 5%, rgba(23, 105, 255, 0.18), transparent 30%),\n    radial-gradient(circle at 92% 10%, rgba(19, 184, 166, 0.16), transparent 28%),\n    radial-gradient(circle at 55% 95%, rgba(247, 144, 9, 0.10), transparent 32%),\n    linear-gradient(135deg, #f7fbff 0%, #edf4ff 45%, #f8fbff 100%);\n}  \n.sidebar-menu[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n}\n\n.dms-main[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  height: 100vh;\n  overflow-y: auto;\n  overflow-x: hidden;\n}\n\n.topbar[_ngcontent-%COMP%] {\n  position: sticky;\n  top: 0;\n  z-index: 50;\n}\n\n.dms-sidebar[_ngcontent-%COMP%] {\n  width: 265px;\n  flex: 0 0 265px;\n  height: 100vh;\n  min-height: 100vh;\n  position: sticky;\n  top: 0;\n  overflow: hidden;\n  width: 310px;\n  min-height: 100vh;\n  height: 100vh;\n  flex-shrink: 0;\n  position: sticky;\n  top: 0;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n  color: #ffffff;\n  background:\n    radial-gradient(circle at 18% 0%, rgba(59, 130, 246, 0.58), transparent 38%),\n    radial-gradient(circle at 100% 35%, rgba(20, 184, 166, 0.26), transparent 32%),\n    linear-gradient(168deg, #08214f 0%, #05142e 54%, #020917 100%);\n  box-shadow: 18px 0 52px rgba(7, 27, 58, 0.22);\n\n  &::before {\n    content: \"\";\n    position: absolute;\n    inset: 0;\n    background-image:\n      linear-gradient(rgba(255, 255, 255, 0.045) 1px, transparent 1px),\n      linear-gradient(90deg, rgba(255, 255, 255, 0.045) 1px, transparent 1px);\n    background-size: 30px 30px;\n    mask-image: linear-gradient(to bottom, #000, transparent 92%);\n    pointer-events: none;\n  }\n\n  &::after {\n    content: \"\";\n    position: absolute;\n    width: 180px;\n    height: 180px;\n    right: -80px;\n    bottom: 70px;\n    border-radius: 50%;\n    background: rgba(20, 184, 166, 0.16);\n    filter: blur(10px);\n    pointer-events: none;\n  }\n}\n\n.brand-card[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  margin: 18px;\n  padding: 18px;\n  border-radius: 26px;\n  display: flex;\n  align-items: center;\n  gap: 15px;\n  background: linear-gradient(135deg, rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.06));\n  border: 1px solid rgba(255, 255, 255, 0.16);\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.18), 0 16px 34px rgba(0, 0, 0, 0.16);\n  backdrop-filter: blur(18px);\n\n  h2 {\n    margin: 0;\n    font-size: clamp(26px, 2.6vw, 34px);\n    line-height: 1;\n    letter-spacing: 1px;\n  }\n\n  p {\n    margin: 5px 0 0;\n    font-size: 12px;\n    color: rgba(220, 236, 255, 0.82);\n  }\n}\n\n.qlss-logo[_ngcontent-%COMP%] {\n  width: 58px;\n  height: 58px;\n  flex-shrink: 0;\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 5px;\n  padding: 4px;\n  border-radius: 18px;\n  background: rgba(255, 255, 255, 0.10);\n  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.18);\n\n  span {\n    border-radius: 9px;\n    box-shadow: inset 0 0 12px rgba(255, 255, 255, 0.26);\n\n    &:nth-child(1) { background: linear-gradient(135deg, #00c853, #7cffbd); }\n    &:nth-child(2) { background: linear-gradient(135deg, #ffd600, #fff59d); }\n    &:nth-child(3) { background: linear-gradient(135deg, #2979ff, #90c2ff); }\n    &:nth-child(4) { background: linear-gradient(135deg, #ff1744, #ff9aa5); }\n  }\n}\n\n.sidebar-menu[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  flex: 1;\n  padding: 0 11px 18px;\n  overflow-y: auto;\n  scrollbar-width: thin;\n  scrollbar-color: rgba(255, 255, 255, 0.26) transparent;\n\n  &::-webkit-scrollbar {\n    width: 6px;\n  }\n\n  &::-webkit-scrollbar-thumb {\n    border-radius: 20px;\n    background: rgba(255, 255, 255, 0.22);\n  }\n}\n\n.menu-title[_ngcontent-%COMP%] {\n  margin: 20px 10px 9px;\n  color: rgba(195, 218, 246, 0.72);\n  font-size: 11px;\n  font-weight: 600;\n  letter-spacing: 1.2px;\n  text-transform: uppercase;\n}\n\n.menu-item[_ngcontent-%COMP%] {\n  min-height: 48px;\n  margin-bottom: 7px;\n  padding: 0;\n  display: flex;\n  align-items: center;\n  gap: 0;\n  border-radius: 17px;\n  color: rgba(232, 243, 255, 0.88);\n  text-decoration: none;\n  font-weight: 500;\n  position: relative;\n  cursor: pointer;\n  transition: transform 0.22s ease, background 0.22s ease, color 0.22s ease, box-shadow 0.22s ease;\n\n  i {\n    width: 24px;\n    font-size: 18px;\n    text-align: center;\n  }\n\n  &:hover,\n  &.active {\n    color: #ffffff;\n    background: linear-gradient(135deg, rgba(255, 255, 255, 0.20), rgba(255, 255, 255, 0.07));\n    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.14);\n    transform: translateX(5px);\n  }\n\n  &.active::before {\n    content: \"\";\n    position: absolute;\n    left: -16px;\n    width: 5px;\n    height: 30px;\n    border-radius: 0 12px 12px 0;\n    background: linear-gradient(180deg, #28f6a5, #19d3ff);\n    box-shadow: 0 0 18px rgba(40, 246, 165, 0.55);\n  }\n\n  b {\n    margin-left: auto;\n    min-width: 25px;\n    height: 25px;\n    padding: 0 8px;\n    border-radius: 999px;\n    display: grid;\n    place-items: center;\n    font-size: 12px;\n    color: #ffffff;\n    box-shadow: 0 8px 18px rgba(0, 0, 0, 0.16);\n\n    &.green { background: linear-gradient(135deg, #12b76a, #22e69a); }\n    &.orange { background: linear-gradient(135deg, #ff7a1a, #ffb703); }\n    &.blue { background: linear-gradient(135deg, #2979ff, #00bcd4); }\n  }\n}\n\n.sidebar-bottom[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  margin: 0 18px 18px;\n  padding: 16px;\n  color: rgba(224, 239, 255, 0.78);\n  font-size: 12px;\n  border-radius: 22px;\n  background: rgba(255, 255, 255, 0.07);\n  border: 1px solid rgba(255, 255, 255, 0.10);\n\n  button {\n    margin-top: 10px;\n    border: 0;\n    color: #ffffff;\n    background: transparent;\n    font-weight: 700;\n    padding: 0;\n    cursor: pointer;\n\n    i {\n      margin-right: 8px;\n    }\n  }\n}\n\n\n.dms-main[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n\n.topbar[_ngcontent-%COMP%] {\n  min-height: 86px;\n  padding: 16px 28px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 22px;\n  position: sticky;\n  top: 0;\n  z-index: 20;\n  background: rgba(255, 255, 255, 0.78);\n  border-bottom: 1px solid rgba(190, 205, 225, 0.58);\n  box-shadow: 0 12px 34px rgba(15, 31, 61, 0.05);\n  backdrop-filter: blur(22px);\n}\n\n.top-menu[_ngcontent-%COMP%] {\n  min-width: 0;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  overflow-x: auto;\n  scrollbar-width: none;\n\n  &::-webkit-scrollbar {\n    display: none;\n  }\n\n  a {\n    color: #0b2145;\n    text-decoration: none;\n    font-weight: 700;\n    white-space: nowrap;\n    padding: 11px 14px;\n    border-radius: 16px;\n    transition: 0.24s ease;\n\n    i {\n      margin-right: 8px;\n    }\n\n    &:hover {\n      color: var(--primary);\n      background: linear-gradient(135deg, #eef5ff, #ffffff);\n      box-shadow: var(--shadow-sm);\n      transform: translateY(-1px);\n    }\n  }\n}\n\n.top-right[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n}\n\n.search-box[_ngcontent-%COMP%] {\n  width: min(370px, 34vw);\n  height: 47px;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 0 15px;\n  background: rgba(255, 255, 255, 0.92);\n  border: 1px solid rgba(204, 219, 238, 0.86);\n  border-radius: 17px;\n  box-shadow: var(--shadow-sm);\n  transition: 0.24s ease;\n\n  &:focus-within {\n    border-color: rgba(23, 105, 255, 0.55);\n    box-shadow: 0 0 0 4px rgba(23, 105, 255, 0.10), var(--shadow-sm);\n  }\n\n  i {\n    color: #7b8ba5;\n  }\n\n  input {\n    width: 100%;\n    border: 0;\n    outline: 0;\n    font-size: 14px;\n    background: transparent;\n    color: var(--ink);\n\n    &::placeholder {\n      color: #98a2b3;\n    }\n  }\n}\n\n.notify-btn[_ngcontent-%COMP%], .close-btn[_ngcontent-%COMP%], .card-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: grid;\n  place-items: center;\n}\n\n.notify-btn[_ngcontent-%COMP%] {\n  width: 47px;\n  height: 47px;\n  flex-shrink: 0;\n  border: 0;\n  border-radius: 17px;\n  background: #ffffff;\n  box-shadow: var(--shadow-sm);\n  position: relative;\n  cursor: pointer;\n  transition: 0.22s ease;\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: var(--shadow-md);\n  }\n\n  i {\n    font-size: 20px;\n    color: #10233f;\n  }\n\n  span {\n    position: absolute;\n    top: -7px;\n    right: -5px;\n    min-width: 22px;\n    height: 22px;\n    padding: 0 6px;\n    border-radius: 50%;\n    background: linear-gradient(135deg, #ff355d, #ff6b6b);\n    color: #ffffff;\n    font-size: 12px;\n    display: grid;\n    place-items: center;\n    border: 2px solid #ffffff;\n  }\n}\n\n.user-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 11px;\n  padding: 7px 12px 7px 7px;\n  border-radius: 19px;\n  background: #ffffff;\n  box-shadow: var(--shadow-sm);\n  white-space: nowrap;\n\n  .avatar {\n    width: 43px;\n    height: 43px;\n    border-radius: 15px;\n    display: grid;\n    place-items: center;\n    color: #ffffff;\n    font-weight: 700;\n    font-size: 20px;\n    background: linear-gradient(135deg, var(--primary), #00bcd4);\n    box-shadow: 0 10px 22px rgba(23, 105, 255, 0.24);\n  }\n\n  strong,\n  small {\n    display: block;\n  }\n\n  small {\n    color: var(--muted);\n  }\n}\n\n\n.content-area[_ngcontent-%COMP%] {\n  padding: clamp(16px, 2vw, 28px);\n}\n\n.page-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 18px;\n  margin-bottom: 20px;\n\n  span {\n    color: var(--muted);\n    font-size: 13px;\n    font-weight: 500;\n  }\n\n  h1 {\n    margin: 4px 0 0;\n    font-size: clamp(24px, 2.2vw, 34px);\n    letter-spacing: -0.6px;\n  }\n}\n\n.primary-action[_ngcontent-%COMP%], .history-btn[_ngcontent-%COMP%] {\n  border: 0;\n  color: #ffffff;\n  background: linear-gradient(135deg, var(--primary), var(--secondary));\n  font-weight: 700;\n  box-shadow: 0 16px 34px rgba(23, 105, 255, 0.25);\n  cursor: pointer;\n  transition: 0.23s ease;\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: 0 22px 44px rgba(23, 105, 255, 0.30);\n  }\n\n  i {\n    margin-right: 8px;\n  }\n}\n\n.primary-action[_ngcontent-%COMP%] {\n  padding: 13px 18px;\n  border-radius: 17px;\n}\n\n\n.stats-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(190px, 1fr));\n  gap: 16px;\n  margin-bottom: 20px;\n}\n\n.stat-card[_ngcontent-%COMP%] {\n  position: relative;\n  overflow: hidden;\n  display: flex;\n  align-items: center;\n  gap: 15px;\n  padding: 18px;\n  border-radius: 24px;\n  background: linear-gradient(135deg, #ffffff, #f0f6ff);\n  border: 1px solid rgba(207, 222, 242, 0.86);\n  box-shadow: var(--shadow-sm);\n  transition: 0.24s ease;\n\n  &::after {\n    content: \"\";\n    position: absolute;\n    right: -35px;\n    top: -35px;\n    width: 105px;\n    height: 105px;\n    border-radius: 50%;\n    background: rgba(23, 105, 255, 0.08);\n  }\n\n  &:hover {\n    transform: translateY(-3px);\n    box-shadow: var(--shadow-md);\n  }\n\n  i {\n    width: 50px;\n    height: 50px;\n    border-radius: 17px;\n    display: grid;\n    place-items: center;\n    color: #ffffff;\n    font-size: 23px;\n    background: linear-gradient(135deg, var(--primary), #6ea8ff);\n    box-shadow: 0 12px 26px rgba(23, 105, 255, 0.20);\n  }\n\n  strong {\n    display: block;\n    font-size: 26px;\n    line-height: 1;\n  }\n\n  span {\n    display: block;\n    margin-top: 5px;\n    color: var(--muted);\n    font-size: 13px;\n    font-weight: 500;\n  }\n\n  &.orange {\n    &::after { background: rgba(247, 144, 9, 0.10); }\n\n    i {\n      background: linear-gradient(135deg, #ff7a1a, #ffd166);\n    }\n  }\n\n  &.green {\n    &::after { background: rgba(18, 183, 106, 0.10); }\n\n    i {\n      background: linear-gradient(135deg, var(--success), #69f0ae);\n    }\n  }\n}\n\n\n.dashboard-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(330px, 1.25fr) minmax(330px, 1.1fr) minmax(280px, 0.9fr);\n  gap: 18px;\n  align-items: stretch;\n}\n\n.glass-card[_ngcontent-%COMP%] {\n  position: relative;\n  overflow: hidden;\n  background: var(--card);\n  border: 1px solid rgba(202, 216, 235, 0.9);\n  border-radius: var(--radius-lg);\n  padding: clamp(16px, 1.5vw, 22px);\n  box-shadow: var(--shadow-md), inset 0 1px 0 rgba(255, 255, 255, 0.82);\n  backdrop-filter: blur(18px);\n  transition: 0.25s ease;\n\n  &::before {\n    content: \"\";\n    position: absolute;\n    inset: 0 0 auto;\n    height: 4px;\n    background: linear-gradient(90deg, var(--primary), var(--secondary), #ffb703);\n    opacity: 0.85;\n  }\n\n  &:hover {\n    transform: translateY(-3px);\n    box-shadow: var(--shadow-lg), inset 0 1px 0 rgba(255, 255, 255, 0.82);\n  }\n}\n\n.card-head[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 14px;\n  margin-bottom: 18px;\n\n  small {\n    color: var(--primary);\n    font-weight: 700;\n    font-size: 12px;\n    text-transform: uppercase;\n    letter-spacing: 0.4px;\n  }\n\n  h3 {\n    margin: 4px 0 0;\n    font-size: 18px;\n    line-height: 1.3;\n  }\n}\n\n.card-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n\n  button {\n    width: 38px;\n    height: 38px;\n    border: 1px solid #dce7f5;\n    border-radius: 14px;\n    background: #ffffff;\n    cursor: pointer;\n    transition: 0.22s ease;\n\n    &:hover {\n      color: var(--primary);\n      transform: translateY(-2px);\n      box-shadow: var(--shadow-sm);\n    }\n  }\n}\n\n\n.tree-search[_ngcontent-%COMP%] {\n  height: 46px;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  background: linear-gradient(135deg, #f8fbff, #ffffff);\n  border: 1px solid #d9e5f3;\n  border-radius: 17px;\n  padding: 0 14px;\n  margin-bottom: 18px;\n  transition: 0.24s ease;\n\n  &:focus-within {\n    border-color: rgba(23, 105, 255, 0.45);\n    box-shadow: 0 0 0 4px rgba(23, 105, 255, 0.10);\n  }\n\n  i {\n    color: #8493aa;\n  }\n\n  input {\n    width: 100%;\n    border: 0;\n    outline: 0;\n    background: transparent;\n    font-size: 14px;\n    color: var(--ink);\n  }\n}\n\n.tree-box[_ngcontent-%COMP%] { \n  overflow: auto;\n  padding: 4px 6px 4px 0;\n  scrollbar-width: thin;\n  scrollbar-color: rgba(23, 105, 255, 0.25) transparent;\n\n  &::-webkit-scrollbar {\n    width: 7px;\n  }\n\n  &::-webkit-scrollbar-thumb {\n    border-radius: 20px;\n    background: rgba(23, 105, 255, 0.22);\n  }\n}\n\n.tree-root[_ngcontent-%COMP%] {\n  min-height: 44px;\n  padding: 11px 13px;\n  border-radius: 17px;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  background: linear-gradient(135deg, #fff7e8, #ffffff);\n  border: 1px solid rgba(247, 144, 9, 0.18);\n  font-weight: 700;\n  box-shadow: var(--shadow-sm);\n\n  i {\n    color: #f5a000;\n  }\n}\n\n.tree-list[_ngcontent-%COMP%] {\n  margin-left: 16px;\n  padding-left: 14px;\n  border-left: 2px dashed #d7e2f0;\n}\n\n.tree-node[_ngcontent-%COMP%] {\n  --indent: 27px;\n}\n\n.tree-row[_ngcontent-%COMP%], .tree-file[_ngcontent-%COMP%] {\n  min-height: 43px;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  margin: 5px 0;\n  border-radius: 15px;\n  transition: 0.22s ease;\n  color: #10233f;\n\n  > div {\n    display: flex;\n    align-items: center;\n    gap: 10px;\n    min-width: 0;\n  }\n\n  span {\n    overflow: hidden;\n    text-overflow: ellipsis;\n  }\n\n  &:hover {\n    background: linear-gradient(135deg, #eef6ff, #ffffff);\n    transform: translateX(4px);\n    box-shadow: 0 8px 18px rgba(23, 105, 255, 0.07);\n  }\n}\n\n.tree-row[_ngcontent-%COMP%] {\n  padding: 0 10px;\n  padding-left: calc(10px + (var(--level) * var(--indent)));\n  cursor: pointer;\n  font-weight: 600;\n\n  small {\n    color: #73839d;\n    font-size: 12px;\n    flex-shrink: 0;\n    margin-left: auto;\n  }\n\n  .folder-icon {\n    color: #f5a000;\n  }\n}\n\n.tree-file[_ngcontent-%COMP%] {\n  margin-left: 22px;\n  padding: 9px 10px;\n  color: #273b59;\n\n  small {\n    color: #7788a2;\n    white-space: nowrap;\n    margin-left: auto;\n  }\n}\n\n.expand-btn[_ngcontent-%COMP%], .expand-space[_ngcontent-%COMP%] {\n  width: 25px;\n  height: 25px;\n  flex-shrink: 0;\n}\n\n.expand-btn[_ngcontent-%COMP%] {\n  border: 1px solid #d5e1f0;\n  border-radius: 9px;\n  background: #ffffff;\n  color: var(--primary);\n  font-weight: 700;\n  cursor: pointer;\n  display: grid;\n  place-items: center;\n  transition: 0.2s ease;\n\n  i {\n    font-size: 15px;\n    line-height: 1;\n  }\n\n  &:hover {\n    background: var(--primary);\n    color: #ffffff;\n    border-color: var(--primary);\n    transform: scale(1.05);\n  }\n}\n\n.expand-space[_ngcontent-%COMP%] {\n  display: inline-block;\n}\n\n.node-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  flex-shrink: 0;\n}\n\n.bi-folder-fill[_ngcontent-%COMP%], .bi-folder2-open[_ngcontent-%COMP%] {\n  color: #f5a000;\n}\n\n.bi-file-earmark-pdf-fill[_ngcontent-%COMP%] {\n  color: var(--danger);\n}\n\n.bi-file-earmark-word-fill[_ngcontent-%COMP%] {\n  color: #2563eb;\n}\n\n.bi-file-earmark-excel-fill[_ngcontent-%COMP%] {\n  color: #16a34a;\n}\n\n.bi-file-earmark-fill[_ngcontent-%COMP%] {\n  color: #64748b;\n}\n\n.node-title[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  font-size: 14px;\n  font-weight: 600;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.tree-children[_ngcontent-%COMP%] {\n  position: relative;\n\n  &::before {\n    content: \"\";\n    position: absolute;\n    left: 21px;\n    top: 0;\n    bottom: 4px;\n    width: 1px;\n    background: linear-gradient(to bottom, rgba(23, 105, 255, 0.18), transparent);\n  }\n}\n\n\n.current-status[_ngcontent-%COMP%] {\n  padding: 15px;\n  border-radius: 20px;\n  background: linear-gradient(135deg, #fff4e8, #ffffff);\n  border: 1px solid rgba(247, 144, 9, 0.16);\n  display: flex;\n  justify-content: space-between;\n  gap: 12px;\n  margin-bottom: 22px;\n\n  span {\n    color: #6f7f97;\n    font-weight: 600;\n  }\n\n  b {\n    color: #d35400;\n  }\n}\n\n.timeline[_ngcontent-%COMP%] {\n  position: relative;\n}\n\n.timeline-step[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 14px;\n  position: relative;\n  padding-bottom: 24px;\n\n  &::before {\n    content: \"\";\n    position: absolute;\n    left: 22px;\n    top: 46px;\n    bottom: 0;\n    width: 3px;\n    border-radius: 10px;\n    background: #d7e3f0;\n  }\n\n  &:last-child::before {\n    display: none;\n  }\n\n  .dot {\n    width: 46px;\n    height: 46px;\n    border-radius: 17px;\n    display: grid;\n    place-items: center;\n    flex-shrink: 0;\n    background: #eef3f8;\n    color: #7f8ea5;\n    border: 4px solid #ffffff;\n    box-shadow: 0 8px 20px rgba(15, 31, 61, 0.10);\n    z-index: 1;\n  }\n\n  &.done .dot {\n    background: linear-gradient(135deg, var(--success), #69f0ae);\n    color: #ffffff;\n  }\n\n  &.active .dot {\n    background: linear-gradient(135deg, var(--primary), #00bcd4);\n    color: #ffffff;\n    animation: pulse 1.8s infinite;\n  }\n\n  &.done::before {\n    background: linear-gradient(var(--success), var(--primary));\n  }\n}\n\n.step-content[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 13px 15px;\n  border-radius: 19px;\n  background: #ffffff;\n  border: 1px solid #e0e9f4;\n  box-shadow: 0 8px 18px rgba(15, 31, 61, 0.04);\n\n  h4 {\n    margin: 0 0 5px;\n    font-size: 15px;\n  }\n\n  p,\n  small {\n    margin: 0;\n    color: #52637c;\n    font-size: 13px;\n  }\n\n  em {\n    display: inline-block;\n    margin-top: 9px;\n    padding: 5px 10px;\n    border-radius: 999px;\n    background: #fff1df;\n    color: #d35400;\n    font-style: normal;\n    font-size: 12px;\n    font-weight: 700;\n  }\n}\n\n.comment-box[_ngcontent-%COMP%] {\n  border-top: 1px solid #d9e5f3;\n  padding-top: 16px;\n\n  h4 {\n    margin: 0 0 8px;\n  }\n\n  p {\n    color: #7b8ba5;\n  }\n\n  button {\n    border: 1px solid #d5e2f2;\n    background: #ffffff;\n    border-radius: 15px;\n    padding: 11px 15px;\n    font-weight: 700;\n    cursor: pointer;\n    transition: 0.22s ease;\n\n    &:hover {\n      color: var(--primary);\n      box-shadow: var(--shadow-sm);\n      transform: translateY(-2px);\n    }\n  }\n}\n\n\n.close-btn[_ngcontent-%COMP%], .edit-btn[_ngcontent-%COMP%] {\n  border: 1px solid #dce7f5;\n  background: #ffffff;\n  border-radius: 14px;\n  cursor: pointer;\n  transition: 0.22s ease;\n\n  &:hover {\n    color: var(--primary);\n    box-shadow: var(--shadow-sm);\n  }\n}\n\n.close-btn[_ngcontent-%COMP%] {\n  width: 38px;\n  height: 38px;\n  font-size: 24px;\n}\n\n.edit-btn[_ngcontent-%COMP%] {\n  padding: 10px 18px;\n  font-weight: 700;\n}\n\n.doc-preview[_ngcontent-%COMP%] {\n  padding: 18px;\n  border-radius: 24px;\n  background: linear-gradient(135deg, #fff0f0, #ffffff);\n  border: 1px solid rgba(240, 68, 56, 0.14);\n  display: flex;\n  align-items: center;\n  gap: 15px;\n  margin-bottom: 18px;\n\n  i {\n    width: 55px;\n    height: 55px;\n    border-radius: 19px;\n    background: #ffffff;\n    display: grid;\n    place-items: center;\n    color: var(--danger);\n    font-size: 28px;\n    box-shadow: 0 10px 24px rgba(227, 52, 47, 0.16);\n  }\n\n  h4 {\n    margin: 0;\n  }\n\n  p {\n    margin: 4px 0 0;\n    color: #6d7d95;\n  }\n}\n\n.details-list[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 10px;\n\n  div {\n    padding: 12px 0;\n    display: grid;\n    grid-template-columns: 130px 1fr;\n    gap: 12px;\n    border-bottom: 1px dashed #d9e5f3;\n  }\n\n  label {\n    color: #7a8aa2;\n    font-size: 13px;\n    font-weight: 600;\n  }\n\n  span {\n    font-weight: 600;\n    font-size: 13px;\n    color: #233852;\n    line-height: 1.35;\n    word-break: break-word;\n  }\n}\n\n.history-btn[_ngcontent-%COMP%] {\n  width: 100%;\n  margin-top: 20px;\n  padding: 14px 16px;\n  border-radius: 18px;\n}\n\n\n@keyframes pulse {\n  0% {\n    box-shadow: 0 0 0 0 rgba(18, 102, 241, 0.35);\n  }\n\n  70% {\n    box-shadow: 0 0 0 13px rgba(18, 102, 241, 0);\n  }\n\n  100% {\n    box-shadow: 0 0 0 0 rgba(18, 102, 241, 0);\n  }\n}\n\n\n@media (max-width: 1500px) {\n  .dashboard-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr 1fr;\n  }\n\n  .details-card[_ngcontent-%COMP%] {\n    grid-column: span 2;\n  }\n}\n\n@media (max-width: 1180px) {\n  .dms-shell[_ngcontent-%COMP%] {\n    flex-direction: column;\n    overflow: visible;\n  }\n\n  .dms-sidebar[_ngcontent-%COMP%] {\n    width: 100%;\n    min-height: auto;\n    height: auto;\n    position: relative;\n    border-radius: 0 0 28px 28px;\n  }\n\n  .brand-card[_ngcontent-%COMP%] {\n    margin-bottom: 12px;\n  }\n\n  .sidebar-menu[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: repeat(2, minmax(220px, 1fr));\n    gap: 6px 12px;\n    max-height: 320px;\n  }\n\n  .menu-title[_ngcontent-%COMP%] {\n    grid-column: 1 / -1;\n  }\n\n  .sidebar-bottom[_ngcontent-%COMP%] {\n    display: none;\n  }\n\n  .topbar[_ngcontent-%COMP%] {\n    position: sticky;\n    top: 0;\n    flex-direction: column;\n    align-items: stretch;\n  }\n\n  .top-right[_ngcontent-%COMP%] {\n    flex-wrap: wrap;\n  }\n\n  .search-box[_ngcontent-%COMP%] {\n    width: 100%;\n    flex: 1 1 260px;\n  }\n}\n\n@media (max-width: 700px) {\n  .dashboard-grid[_ngcontent-%COMP%], .stats-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  .details-card[_ngcontent-%COMP%] {\n    grid-column: auto;\n  }\n\n  .page-title[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n\n  .primary-action[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n\n  .top-menu[_ngcontent-%COMP%] {\n    padding-bottom: 4px;\n  }\n\n  .user-card[_ngcontent-%COMP%] {\n    flex: 1 1 auto;\n  }\n}\n\n@media (max-width: 620px) {\n  .content-area[_ngcontent-%COMP%] {\n    padding: 14px;\n  }\n\n  .brand-card[_ngcontent-%COMP%] {\n    margin: 12px;\n    padding: 15px;\n    border-radius: 22px;\n  }\n\n  .qlss-logo[_ngcontent-%COMP%] {\n    width: 50px;\n    height: 50px;\n  }\n\n  .sidebar-menu[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    padding: 0 12px 12px;\n    max-height: none;\n  }\n\n  .menu-item[_ngcontent-%COMP%] {\n    min-height: 44px;\n  }\n\n  .topbar[_ngcontent-%COMP%] {\n    padding: 14px;\n  }\n\n  .top-menu[_ngcontent-%COMP%] {\n    gap: 8px;\n\n    a {\n      font-size: 13px;\n      padding: 9px 11px;\n    }\n  }\n\n  .top-right[_ngcontent-%COMP%] {\n    gap: 10px;\n  }\n\n  .notify-btn[_ngcontent-%COMP%] {\n    width: 44px;\n    height: 44px;\n  }\n\n  .user-card[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n\n  .glass-card[_ngcontent-%COMP%] {\n    padding: 15px;\n    border-radius: 22px;\n  }\n\n  .card-head[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n\n  .stat-card[_ngcontent-%COMP%] {\n    padding: 15px;\n  }\n\n  .current-status[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n\n  .details-list[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 4px;\n  }\n\n  .tree-box[_ngcontent-%COMP%] {\n    height: 440px;\n    max-height: 58vh;\n  }\n\n  .tree-node[_ngcontent-%COMP%] {\n    --indent: 18px;\n  }\n\n  .tree-row[_ngcontent-%COMP%] {\n    gap: 7px;\n    padding-right: 6px;\n  }\n\n  .tree-list[_ngcontent-%COMP%] {\n    margin-left: 4px;\n    padding-left: 10px;\n  }\n\n  .tree-file[_ngcontent-%COMP%] {\n    margin-left: 8px;\n  }\n\n  .node-title[_ngcontent-%COMP%] {\n    font-size: 13px;\n  }\n\n  .doc-preview[_ngcontent-%COMP%] {\n    align-items: flex-start;\n  }\n}\n\n\n.bottom-dashboard-grid[_ngcontent-%COMP%] {\n  display: grid;\n  //grid-template-columns: minmax(420px, 1.05fr) minmax(420px, 1fr);\n grid-template-columns: minmax(615px, 1.05fr) minmax(725px, 1fr);\n  gap: 18px;\n  margin-top: 18px;\n  align-items: stretch;\n}\n\n.dms-panel[_ngcontent-%COMP%] {\n  position: relative;\n  overflow: hidden;\n  background: var(--card);\n  border: 1px solid rgba(202, 216, 235, 0.9);\n  border-radius: var(--radius-lg);\n  box-shadow:\n    var(--shadow-md),\n    inset 0 1px 0 rgba(255, 255, 255, 0.82);\n  backdrop-filter: blur(18px);\n  transition: 0.25s ease;\n\n  &::before {\n    content: \"\";\n    position: absolute;\n    inset: 0 0 auto;\n    height: 4px;\n    background: linear-gradient(90deg, var(--primary), var(--secondary), #ffb703);\n    opacity: 0.85;\n  }\n\n  &:hover {\n    transform: translateY(-3px);\n    box-shadow:\n      var(--shadow-lg),\n      inset 0 1px 0 rgba(255, 255, 255, 0.82);\n  }\n}\n\n.panel-header[_ngcontent-%COMP%] {\n  min-height: 58px;\n  padding: 0 18px;\n  border-bottom: 1px solid rgba(220, 231, 245, 0.9);\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 14px;\n  background: rgba(255, 255, 255, 0.64);\n\n  h3 {\n    margin: 0;\n    font-size: 14px;\n    font-weight: 700;\n    color: var(--ink);\n    letter-spacing: -0.2px;\n\n    span {\n      font-size: 10px;\n      color: var(--muted);\n      font-weight: 600;\n    }\n  }\n}\n\n.icon-btn[_ngcontent-%COMP%] {\n  width: 34px;\n  height: 34px;\n  border: 1px solid #dce7f5;\n  border-radius: 12px;\n  background: #ffffff;\n  color: var(--ink);\n  cursor: pointer;\n  display: grid;\n  place-items: center;\n  box-shadow: var(--shadow-sm);\n  transition: 0.22s ease;\n\n  i {\n    font-size: 14px;\n  }\n\n  &:hover {\n    color: var(--primary);\n    transform: translateY(-2px);\n    box-shadow: var(--shadow-md);\n  }\n}\n\n\n.org-chart[_ngcontent-%COMP%] {\n  padding: 28px 16px 14px;\n  overflow-x: auto;\n  scrollbar-width: thin;\n  scrollbar-color: rgba(23, 105, 255, 0.24) transparent;\n\n  &::-webkit-scrollbar {\n    height: 7px;\n  }\n\n  &::-webkit-scrollbar-thumb {\n    border-radius: 20px;\n    background: rgba(23, 105, 255, 0.22);\n  }\n}\n\n.org-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  gap: 16px;\n  position: relative;\n  margin-bottom: 14px;\n}\n\n.org-row.center[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n\n.org-row.heads[_ngcontent-%COMP%], .org-row.team[_ngcontent-%COMP%] {\n  gap: 16px;\n}\n\n.org-row.team[_ngcontent-%COMP%] {\n  margin-bottom: 0;\n}\n\n.org-card[_ngcontent-%COMP%] {\n  width: 142px;\n  min-height: 84px;\n  padding: 10px;\n  border: 1px solid rgba(215, 228, 242, 0.95);\n  border-radius: 14px;\n  background:\n    radial-gradient(circle at top left, rgba(23, 105, 255, 0.07), transparent 38%),\n    linear-gradient(135deg, #ffffff, #f8fbff);\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 3px;\n  box-shadow: 0 8px 20px rgba(15, 31, 61, 0.05);\n  transition: 0.22s ease;\n\n  &:hover {\n    transform: translateY(-3px);\n    border-color: rgba(23, 105, 255, 0.45);\n    box-shadow: 0 14px 30px rgba(15, 31, 61, 0.10);\n  }\n\n  &.active {\n    border-color: var(--primary);\n    box-shadow:\n      0 0 0 1px rgba(23, 105, 255, 0.8),\n      0 14px 30px rgba(23, 105, 255, 0.14);\n  }\n\n  &.small {\n    width: 142px;\n    min-height: 82px;\n  }\n\n  strong {\n    font-size: 11px;\n    color: var(--ink);\n    line-height: 1.12;\n    font-weight: 700;\n  }\n\n  span {\n    font-size: 10px;\n    color: var(--muted);\n    text-align: center;\n    line-height: 1.2;\n  }\n}\n\n.avatar[_ngcontent-%COMP%] {\n  width: 38px;\n  height: 38px;\n  border-radius: 50%;\n  display: grid;\n  place-items: center;\n  color: #ffffff;\n  font-size: 11px;\n  font-weight: 700;\n  box-shadow: 0 10px 22px rgba(15, 31, 61, 0.16);\n}\n\n.avatar.blue[_ngcontent-%COMP%] { background: linear-gradient(135deg, #2563eb, #60a5fa); }\n.avatar.green[_ngcontent-%COMP%] { background: linear-gradient(135deg, #16a34a, #22c55e); }\n.avatar.teal[_ngcontent-%COMP%] { background: linear-gradient(135deg, #0f766e, #14b8a6); }\n.avatar.pink[_ngcontent-%COMP%] { background: linear-gradient(135deg, #db2777, #ec4899); }\n.avatar.purple[_ngcontent-%COMP%] { background: linear-gradient(135deg, #7c3aed, #8b5cf6); }\n.avatar.orange[_ngcontent-%COMP%] { background: linear-gradient(135deg, #f97316, #fb923c); }\n.avatar.gray[_ngcontent-%COMP%] { background: linear-gradient(135deg, #64748b, #94a3b8); }\n\n\n.export-btn[_ngcontent-%COMP%] {\n  height: 34px;\n  padding: 0 13px;\n  border: 0;\n  border-radius: 12px;\n  background: linear-gradient(135deg, var(--primary), #0f63ff);\n  color: #ffffff;\n  font-size: 11px;\n  font-weight: 700;\n  cursor: pointer;\n  box-shadow: 0 12px 24px rgba(23, 105, 255, 0.24);\n  transition: 0.22s ease;\n\n  i {\n    margin-right: 6px;\n    font-size: 12px;\n  }\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: 0 18px 34px rgba(23, 105, 255, 0.30);\n  }\n}\n\n.table-wrap[_ngcontent-%COMP%] {\n  padding: 14px 16px 16px;\n  overflow-x: auto;\n  scrollbar-width: thin;\n  scrollbar-color: rgba(23, 105, 255, 0.24) transparent;\n\n  &::-webkit-scrollbar {\n    height: 7px;\n  }\n\n  &::-webkit-scrollbar-thumb {\n    border-radius: 20px;\n    background: rgba(23, 105, 255, 0.22);\n  }\n}\n\n.actions-table[_ngcontent-%COMP%] {\n  width: 100%;\n  min-width: 680px;\n  border-collapse: separate;\n  border-spacing: 0;\n\n  th,\n  td {\n    padding: 10px 10px;\n    text-align: left;\n    font-size: 11px;\n    color: #1f3353;\n    border-bottom: 1px solid #e7eef7;\n    vertical-align: middle;\n    line-height: 1.32;\n  }\n\n  th {\n    background: linear-gradient(135deg, #f8fbff, #f1f6ff);\n    font-weight: 700;\n    color: #1b2f4f;\n    white-space: nowrap;\n  }\n\n  th:first-child {\n    border-top-left-radius: 12px;\n  }\n\n  th:last-child {\n    border-top-right-radius: 12px;\n  }\n\n  tbody tr {\n    transition: 0.18s ease;\n  }\n\n  tbody tr:hover {\n    background: #f8fbff;\n  }\n\n  tbody td {\n    font-weight: 500;\n  }\n}\n\n.badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 22px;\n  padding: 3px 9px;\n  border-radius: 8px;\n  font-size: 10px;\n  font-weight: 700;\n  line-height: 1;\n  white-space: nowrap;\n}\n\n.badge.high[_ngcontent-%COMP%] {\n  background: #ffe4e4;\n  color: #dc2626;\n}\n\n.badge.medium[_ngcontent-%COMP%] {\n  background: #fff0dc;\n  color: #d35400;\n}\n\n.badge.low[_ngcontent-%COMP%] {\n  background: #dcfce7;\n  color: #15803d;\n}\n\n.badge.progress[_ngcontent-%COMP%] {\n  background: #fff0dc;\n  color: #d35400;\n}\n\n.badge.pending[_ngcontent-%COMP%] {\n  background: #e8f1ff;\n  color: var(--primary);\n}\n\n\n@media (max-width: 1200px) {\n  .bottom-dashboard-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n\n@media (max-width: 700px) {\n  .bottom-dashboard-grid[_ngcontent-%COMP%] {\n    gap: 14px;\n  }\n\n  .panel-header[_ngcontent-%COMP%] {\n    min-height: auto;\n    padding: 12px 14px;\n    gap: 12px;\n    align-items: flex-start;\n    flex-direction: column;\n  }\n\n  .org-chart[_ngcontent-%COMP%] {\n    padding: 22px 12px 12px;\n  }\n\n  .org-row[_ngcontent-%COMP%] {\n    min-width: 540px;\n    gap: 12px;\n  }\n\n  .org-card[_ngcontent-%COMP%], .org-card.small[_ngcontent-%COMP%] {\n    width: 132px;\n  }\n\n  .table-wrap[_ngcontent-%COMP%] {\n    padding: 12px;\n  }\n}", ".demo-training[_ngcontent-%COMP%] {\n  padding: 6px;\n  background:\n    radial-gradient(circle at 4% 4%, rgba(111, 86, 255, .12), transparent 26%),\n    radial-gradient(circle at 98% 8%, rgba(7, 94, 255, .14), transparent 30%),\n    linear-gradient(180deg, #f7faff 0%, #f3f7ff 100%);\n}\n\n.hero-shell[_ngcontent-%COMP%], .training-panel[_ngcontent-%COMP%] {\n  width: min(calc(100% - 0px), 1800px);\n  border-color: rgba(188, 210, 250, .9);\n  box-shadow: 0 18px 55px rgba(24, 50, 100, .09);\n}\n\n.hero-shell[_ngcontent-%COMP%] {\n  min-height: 430px;\n  background:\n    radial-gradient(circle at 82% 50%, rgba(86, 133, 244, .36) 0 16%, rgba(86, 133, 244, .19) 17% 31%, transparent 32%),\n    linear-gradient(107deg, #ffffff 0 48%, #edf5ff 48.2% 100%);\n}\n\n.hero-content[_ngcontent-%COMP%] {\n  min-height: 430px;\n  grid-template-columns: minmax(0, 1.06fr) minmax(440px, .94fr);\n  gap: 20px;\n  padding: 70px 100px 26px 100px;\n  align-items: center;\n}\n\n.hero-copy[_ngcontent-%COMP%] {\n  max-width: 690px;\n  min-width: 0;\n}\n\n.eyebrow[_ngcontent-%COMP%] {\n  padding: 5px 14px;\n  border-color: rgba(7, 94, 255, .28);\n  color: #075eff;\n  background: rgba(244, 248, 255, .94);\n  font-size: 12px;\n  letter-spacing: .07em;\n}\n\n#training-hero-title[_ngcontent-%COMP%] {\n  max-width: 690px;\n  margin: 12px 0 12px;\n  color: #071747;\n  font-size: clamp(50px, 4vw, 66px);\n  line-height: 1.01;\n  letter-spacing: 0;\n}\n\n.hero-copy[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  max-width: 610px;\n  color: #52608d;\n  font-size: 17px;\n  line-height: 1.58;\n}\n\n.hero-features[_ngcontent-%COMP%] {\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n  gap: 0;\n  width: 100%;\n  max-width: 700px;\n  margin-top: 32px;\n  overflow: hidden;\n}\n\n.hero-feature[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 50px minmax(0, 1fr);\n  gap: 12px;\n  align-items: center;\n  min-width: 0;\n  padding: 0 14px;\n  border-right-color: #d7e3fb;\n  overflow: hidden;\n}\n\n.hero-feature[_ngcontent-%COMP%]:first-child { padding-left: 0; }\n.hero-feature[_ngcontent-%COMP%]:last-child { padding-right: 0; border-right: 0; }\n\n.hero-feature[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  display: inline-grid;\n  width: 50px;\n  height: 50px;\n  flex-basis: 50px;\n  place-items: center;\n  border-radius: 10px;\n  font-size: 21px;\n  box-shadow: inset 0 1px 0 rgba(255,255,255,.8), 0 10px 22px rgba(24, 50, 100, .06);\n}\n\n.hero-feature[_ngcontent-%COMP%]:nth-child(1)   i[_ngcontent-%COMP%] { color: #075eff; border-color: #cbdcff; background: linear-gradient(145deg, #eef4ff, #ffffff); }\n.hero-feature[_ngcontent-%COMP%]:nth-child(2)   i[_ngcontent-%COMP%] { color: #20b746; border-color: #caefd4; background: linear-gradient(145deg, #effcf3, #ffffff); }\n.hero-feature[_ngcontent-%COMP%]:nth-child(3)   i[_ngcontent-%COMP%] { color: #6a38f0; border-color: #e0d5ff; background: linear-gradient(145deg, #f4efff, #ffffff); }\n.hero-feature[_ngcontent-%COMP%]:nth-child(4)   i[_ngcontent-%COMP%] { color: #ff6b1a; border-color: #ffe0ce; background: linear-gradient(145deg, #fff4ed, #ffffff); }\n\n.hero-feature[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] { min-width: 0; }\n.hero-feature[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], .hero-feature[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  max-width: 100%;\n  overflow: hidden;\n  text-overflow: clip;\n  white-space: nowrap;\n}\n.hero-feature[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] { color: #071747; font-size: 10.5px; line-height: 1.08; font-weight: 900; }\n.hero-feature[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] { margin-top: 6px; color: #4f5d8a; font-size: 9.5px; line-height: 1.08; font-weight: 700; }\n\n.hero-visual[_ngcontent-%COMP%] {\n  min-height: 350px;\n  overflow: visible;\n}\n\n.hero-content[_ngcontent-%COMP%]::before {\n  right: 48px;\n  top: 22px;\n  width: 520px;\n  height: 520px;\n  background: linear-gradient(135deg, rgba(198, 216, 255, .36), rgba(74, 126, 238, .54));\n}\n\n.hero-image-wrap[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 74px;\n  bottom: -8px;\n  z-index: 2;\n  width: min(520px, 86%);\n  filter: drop-shadow(0 24px 32px rgba(29, 78, 216, .18));\n}\n\n.hero-image-wrap[_ngcontent-%COMP%]::after {\n  content: \"\";\n  position: absolute;\n  left: 14%;\n  right: 9%;\n  bottom: 7px;\n  z-index: -1;\n  height: 26px;\n  border-radius: 50%;\n  background: rgba(28, 69, 140, .16);\n  filter: blur(12px);\n}\n\n.hero-laptop-image[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  height: auto;\n  object-fit: contain;\n}\n\n.stat-card[_ngcontent-%COMP%] {\n  width: 136px;\n  padding: 18px 18px;\n  border-radius: 13px;\n  background: rgba(255,255,255,.94);\n  box-shadow: 0 22px 42px rgba(23, 51, 111, .12);\n}\n.stat-card[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] { font-size: 27px; }\n.stat-card[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] { font-size: 28px; }\n.stat-card[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] { font-size: 13px; }\n.stat-card--left[_ngcontent-%COMP%] { left: 2px; top: 8px; }\n.stat-card--right[_ngcontent-%COMP%] { right: 22px; top: 138px; }\n.orbit--one[_ngcontent-%COMP%] { right: 56px; top: 24px; width: 228px; height: 228px; }\n.orbit--two[_ngcontent-%COMP%] { left: 46px; bottom: 30px; }\n.shape--triangle[_ngcontent-%COMP%] { left: -42px; top: 98px; }\n.shape--arrow[_ngcontent-%COMP%] { right: -10px; top: 74px; }\n\n.training-panel[_ngcontent-%COMP%] {\n  padding: 34px 36px 26px;\n  background: rgba(255,255,255,.92);\n}\n\n.training-toolbar[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 280px minmax(0, 1fr);\n  gap: 18px;\n  align-items: center;\n  margin-bottom: 34px;\n}\n\n.category-shell[_ngcontent-%COMP%] { display: grid; grid-template-columns: 42px minmax(0, 1fr) 42px; gap: 10px; min-width: 0; }\n.category-arrow[_ngcontent-%COMP%] { display: inline-grid; width: 42px; height: 42px; place-items: center; border: 1px solid #d8e3f8; border-radius: 9px; color: #071747; background: #fff; cursor: pointer; box-shadow: 0 10px 22px rgba(24, 50, 100, .06); transition: .22s ease; }\n.category-arrow[_ngcontent-%COMP%]:hover { color: #fff; border-color: #075eff; background: #075eff; transform: translateY(-1px); }\n.category-list[_ngcontent-%COMP%] { padding: 0 2px; }\n.category-pill[_ngcontent-%COMP%] { min-width: max-content; height: 46px; padding: 0 19px; border-radius: 10px; box-shadow: 0 10px 22px rgba(24, 50, 100, .04); }\n.search-field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] { height: 46px; border-radius: 10px; box-shadow: 0 10px 22px rgba(24, 50, 100, .04); }\n\n.training-grid[_ngcontent-%COMP%] { gap: 16px 20px; }\n.training-card[_ngcontent-%COMP%] { grid-template-columns: 116px minmax(0, 1fr); min-height: 222px; padding: 16px 16px 14px 14px; border-radius: 13px; }\n.training-card__media[_ngcontent-%COMP%] { width: 116px; min-width: 116px; height: 174px; min-height: 174px; align-self: start; border-radius: 10px; font-size: 60px; background: radial-gradient(ellipse 92px 34px at 28% 88%, rgba(255,255,255,.46) 0 58%, transparent 59%), radial-gradient(ellipse 100px 38px at 74% 92%, rgba(255,255,255,.34) 0 58%, transparent 59%), linear-gradient(145deg, color-mix(in srgb, var(--theme), #ffffff 8%), color-mix(in srgb, var(--theme), #001d6e 28%)); }\n.training-card__media[_ngcontent-%COMP%]::before, .training-card__media[_ngcontent-%COMP%]::after { content: \"\"; position: absolute; left: -18px; right: -18px; bottom: -16px; height: 62px; border-radius: 50% 50% 0 0; background: rgba(255,255,255,.22); }\n.training-card__media[_ngcontent-%COMP%]::after { left: 18px; right: -34px; bottom: -28px; height: 72px; background: rgba(255,255,255,.34); }\n.training-card__media[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] { position: relative; z-index: 1; }\n.training-card__content[_ngcontent-%COMP%] { padding-left: 22px; }\n.training-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] { min-height: 54px; margin: 8px 0 9px; font-size: 24px; line-height: 1.08; }\n.training-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] { min-height: 54px; margin-bottom: 13px; }\n.training-card__actions[_ngcontent-%COMP%] { grid-template-columns: minmax(0, .95fr) minmax(0, 1.08fr) minmax(0, .98fr); gap: 12px; }\n.card-btn[_ngcontent-%COMP%] { min-height: 40px; padding: 10px 12px; gap: 9px; font-size: 13px; border-radius: 8px; }\n\n@media (max-width: 1500px) {\n  .hero-content[_ngcontent-%COMP%] { padding-inline: 70px; }\n  .hero-copy[_ngcontent-%COMP%], .hero-features[_ngcontent-%COMP%] { max-width: 620px; }\n  #training-hero-title[_ngcontent-%COMP%] { font-size: clamp(45px, 3.65vw, 56px); }\n  .hero-image-wrap[_ngcontent-%COMP%] { right: 44px; width: min(470px, 82%); }\n  .stat-card--right[_ngcontent-%COMP%] { right: 10px; }\n  .hero-feature[_ngcontent-%COMP%] { grid-template-columns: 44px minmax(0, 1fr); padding-inline: 10px; }\n  .hero-feature[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] { width: 44px; height: 44px; flex-basis: 44px; }\n  .hero-feature[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] { font-size: 9.5px; }\n  .hero-feature[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] { font-size: 8.5px; }\n  .training-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] { font-size: 23px; }\n}\n\n@media (max-width: 1280px) {\n  .training-toolbar[_ngcontent-%COMP%] { grid-template-columns: 1fr; }\n  .hero-shell[_ngcontent-%COMP%], .hero-content[_ngcontent-%COMP%] { min-height: auto; }\n  .hero-content[_ngcontent-%COMP%] { grid-template-columns: 1fr; padding: 30px; align-items: center; }\n  .hero-copy[_ngcontent-%COMP%], #training-hero-title[_ngcontent-%COMP%], .hero-copy[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] { max-width: 100%; }\n  .hero-image-wrap[_ngcontent-%COMP%] { right: 50%; bottom: -26px; width: min(430px, 80%); transform: translateX(50%); }\n  .hero-content[_ngcontent-%COMP%]::before { right: 50%; top: auto; bottom: -70px; transform: translateX(50%); }\n  .hero-features[_ngcontent-%COMP%] { grid-template-columns: repeat(2, minmax(180px, 1fr)); max-width: 560px; overflow: visible; row-gap: 14px; }\n  .hero-feature[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] { font-size: 11px; }\n  .hero-feature[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] { font-size: 10.5px; }\n}\n\n@media (max-width: 860px) {\n  .demo-training[_ngcontent-%COMP%] { padding: 0; }\n  .hero-content[_ngcontent-%COMP%] { padding: 26px 18px 20px; }\n  #training-hero-title[_ngcontent-%COMP%] { font-size: clamp(40px, 8vw, 48px); }\n  .hero-visual[_ngcontent-%COMP%] { min-height: 330px; overflow: hidden; }\n  .hero-image-wrap[_ngcontent-%COMP%] { bottom: -10px; width: min(360px, 88%); }\n  .stat-card--left[_ngcontent-%COMP%] { left: 0; top: 12px; }\n  .stat-card--right[_ngcontent-%COMP%] { right: 0; top: 120px; }\n  .hero-features[_ngcontent-%COMP%] { grid-template-columns: 1fr; max-width: 100%; }\n  .hero-feature[_ngcontent-%COMP%] { grid-template-columns: 52px minmax(0, 1fr); padding-inline: 0; }\n  .hero-feature[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] { width: 52px; height: 52px; }\n  .hero-feature[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], .hero-feature[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] { font-size: 11px; white-space: normal; }\n  .training-panel[_ngcontent-%COMP%] { padding: 24px 16px; }\n  .training-card[_ngcontent-%COMP%] { grid-template-columns: 104px minmax(0, 1fr); }\n  .training-card__media[_ngcontent-%COMP%] { width: 104px; min-width: 104px; height: 160px; min-height: 160px; font-size: 52px; }\n  .training-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] { min-height: 0; font-size: 22px; }\n  .training-card__actions[_ngcontent-%COMP%] { grid-template-columns: repeat(2, minmax(0, 1fr)); }\n  .card-btn--test[_ngcontent-%COMP%] { grid-column: 1 / -1; }\n}\n\n@media (max-width: 560px) {\n  .category-shell[_ngcontent-%COMP%] { grid-template-columns: 38px minmax(0, 1fr) 38px; gap: 8px; }\n  .category-arrow[_ngcontent-%COMP%] { width: 38px; height: 42px; }\n  #training-hero-title[_ngcontent-%COMP%] { font-size: 40px; line-height: 1.04; }\n  .hero-image-wrap[_ngcontent-%COMP%] { width: min(320px, 92%); }\n  .training-card[_ngcontent-%COMP%] { grid-template-columns: 1fr; }\n  .training-card__media[_ngcontent-%COMP%] { width: 100%; min-width: 0; height: 148px; min-height: 148px; }\n  .training-card__actions[_ngcontent-%COMP%] { grid-template-columns: 1fr; }\n  .card-btn--test[_ngcontent-%COMP%] { grid-column: auto; }\n}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DemoComponent, [{
        type: Component,
        args: [{ selector: 'app-demo', template: "<div class=\"dms-shell\">\n  <aside class=\"dms-sidebar\">\n    <div class=\"brand-card\">\n      <div class=\"qlss-logo\">\n        <span></span><span></span><span></span><span></span>\n      </div>\n\n      <div>\n        <h2>QLSS</h2>\n        <p>Document Management System</p>\n      </div>\n    </div>\n\n    <nav class=\"sidebar-menu\">\n      <ng-container *ngFor=\"let group of menuGroups\">\n        <div class=\"menu-title\">{{ group.title }}</div>\n\n        <a\n          *ngFor=\"let item of group.items\"\n          class=\"menu-item\"\n          [class.active]=\"item.active\"\n        >\n          <i [class]=\"item.icon\"></i>\n          <span>{{ item.label }}</span>\n          <b *ngIf=\"item.badge\" [class]=\"item.badgeClass\">{{ item.badge }}</b>\n        </a>\n      </ng-container>\n    </nav>\n\n    <div class=\"sidebar-bottom\">\n      <div>\u00A9 2025 QLSS DMS</div>\n      <div>Version 1.0.0</div>\n      <button>\n        <i class=\"bi bi-box-arrow-right\"></i>\n        Logout\n      </button>\n    </div>\n  </aside>\n\n  <main class=\"dms-main\">\n    <header class=\"topbar\">\n      <div class=\"top-menu\">\n        <a><i class=\"bi bi-folder2-open\"></i> DMS</a>\n        <a><i class=\"bi bi-check2-square\"></i> Tasks</a>\n        <a><i class=\"bi bi-graph-up-arrow\"></i> KPI Entry</a>\n        <a><i class=\"bi bi-file-earmark-bar-graph\"></i> Reports</a>\n        <a><i class=\"bi bi-sliders\"></i> Administration</a>\n      </div>\n\n      <div class=\"top-right\">\n        <div class=\"search-box\">\n          <i class=\"bi bi-search\"></i>\n          <input type=\"text\" placeholder=\"Search documents, actions...\" />\n        </div>\n\n        <button class=\"notify-btn\">\n          <i class=\"bi bi-bell\"></i>\n          <span>5</span>\n        </button>\n\n        <div class=\"user-card\">\n          <div class=\"avatar\">A</div>\n          <div>\n            <strong>Admin User</strong>\n            <small>Administrator</small>\n          </div>\n        </div>\n      </div>\n    </header>\n\n    <section class=\"content-area\">\n      <div class=\"page-title\">\n        <div>\n          <span>Dashboard / Repository</span>\n          <h1>Document Repository</h1>\n        </div>\n\n        <button class=\"primary-action\">\n          <i class=\"bi bi-plus-circle\"></i>\n          New Document\n        </button>\n      </div>\n\n      <section class=\"stats-row\" style=\"display: none;\">\n        <div class=\"stat-card\">\n          <i class=\"bi bi-folder-check\"></i>\n          <div>\n            <strong>124</strong>\n            <span>Total Documents</span>\n          </div>\n        </div>\n\n        <div class=\"stat-card orange\">\n          <i class=\"bi bi-hourglass-split\"></i>\n          <div>\n            <strong>12</strong>\n            <span>In Review</span>\n          </div>\n        </div>\n\n        <div class=\"stat-card green\">\n          <i class=\"bi bi-check-circle\"></i>\n          <div>\n            <strong>89</strong>\n            <span>Approved</span>\n          </div>\n        </div>\n      </section>\n\n      <div class=\"dashboard-grid\">\n        <!-- Repository Tree -->\n        <section class=\"glass-card repository-card\">\n          <div class=\"card-head\">\n            <div>\n              <small>ISO 9001:2015</small>\n              <h3>Repository Tree</h3>\n            </div>\n\n            <div class=\"card-actions\">\n              <button><i class=\"bi bi-arrow-clockwise\"></i></button>\n              <button><i class=\"bi bi-arrows-fullscreen\"></i></button>\n              <button><i class=\"bi bi-folder-plus\"></i></button>\n            </div>\n          </div>\n\n          <div class=\"tree-search\">\n            <i class=\"bi bi-search\"></i>\n            <input type=\"text\" placeholder=\"Search in tree...\" />\n          </div>\n<div class=\"tree-box\">\n  <ng-container *ngFor=\"let node of repositoryTree\">\n    <ng-container\n      *ngTemplateOutlet=\"treeTemplate; context: { $implicit: node, level: 0 }\">\n    </ng-container>\n  </ng-container>\n</div>\n\n<ng-template #treeTemplate let-node let-level=\"level\">\n  <div class=\"tree-node\">\n    <div\n      class=\"tree-row\"\n      [style.--level]=\"level\"\n      (click)=\"toggleNode(node)\">\n\n      <button\n        class=\"expand-btn\"\n        type=\"button\"\n        *ngIf=\"node.type === 'folder'; else fileSpace\"\n        (click)=\"toggleNode(node); $event.stopPropagation()\">\n\n        <i\n          class=\"bi\"\n          [class.bi-dash]=\"node.expanded\"\n          [class.bi-plus]=\"!node.expanded\">\n        </i>\n      </button>\n\n      <ng-template #fileSpace>\n        <span class=\"expand-space\"></span>\n      </ng-template>\n\n      <i\n        class=\"node-icon bi\"\n        [class.bi-folder2-open]=\"node.type === 'folder' && node.expanded\"\n        [class.bi-folder-fill]=\"node.type === 'folder' && !node.expanded\"\n        [class.bi-file-earmark-pdf-fill]=\"node.type === 'file' && node.name?.toLowerCase().endsWith('.pdf')\"\n        [class.bi-file-earmark-word-fill]=\"node.type === 'file' && node.name?.toLowerCase().endsWith('.docx')\"\n        [class.bi-file-earmark-excel-fill]=\"node.type === 'file' && node.name?.toLowerCase().endsWith('.xlsx')\"\n        [class.bi-file-earmark-fill]=\"node.type === 'file'\">\n      </i>\n\n      <span class=\"node-title\">{{ node.name }}</span>\n\n      <small *ngIf=\"node.rev\">Rev {{ node.rev }}</small>\n    </div>\n\n    <div class=\"tree-children\" *ngIf=\"node.expanded && node.children?.length\">\n      <ng-container *ngFor=\"let child of node.children\">\n        <ng-container\n          *ngTemplateOutlet=\"treeTemplate; context: { $implicit: child, level: level + 1 }\">\n        </ng-container>\n      </ng-container>\n    </div>\n  </div>\n</ng-template>\n        </section>\n\n        <!-- Workflow -->\n        <section class=\"glass-card workflow-card\">\n          <div class=\"card-head\">\n            <div>\n              <small>Live Workflow</small>\n              <h3>8.5.2 Work Instruction - Production Flow.pdf</h3>\n            </div>\n            <button class=\"close-btn\">\u00D7</button>\n          </div>\n\n          <div class=\"current-status\">\n            <span>Current Status</span>\n            <b>In Review Level 1</b>\n          </div>\n\n          <div class=\"timeline\">\n            <div\n              class=\"timeline-step\"\n              *ngFor=\"let step of workflowSteps\"\n              [class.done]=\"step.status === 'done'\"\n              [class.active]=\"step.status === 'active'\"\n              [class.pending]=\"step.status === 'pending'\"\n            >\n              <div class=\"dot\">\n                <i [class]=\"step.icon\"></i>\n              </div>\n\n              <div class=\"step-content\">\n                <h4>{{ step.title }}</h4>\n                <p>{{ step.description }}</p>\n                <small>{{ step.date }}</small>\n                <em *ngIf=\"step.badge\">{{ step.badge }}</em>\n              </div>\n            </div>\n          </div>\n\n          <div class=\"comment-box\">\n            <h4>Comments / Rejection Reason</h4>\n            <p>No comments yet.</p>\n            <button>Open Workflow Popup</button>\n          </div>\n        </section>\n\n        <!-- Details -->\n        <section class=\"glass-card details-card\">\n          <div class=\"card-head\">\n            <div>\n              <small>Selected Document</small>\n              <h3>Document Details</h3>\n            </div>\n            <button class=\"edit-btn\">Edit</button>\n          </div>\n\n          <div class=\"doc-preview\">\n            <i class=\"bi bi-file-earmark-pdf-fill\"></i>\n            <div>\n              <h4>Work Instruction</h4>\n              <p>Production Flow</p>\n            </div>\n          </div>\n\n          <div class=\"details-list\">\n            <div *ngFor=\"let item of documentDetails\">\n              <label>{{ item.label }}</label>\n              <span>{{ item.value }}</span>\n            </div>\n          </div>\n\n          <button class=\"history-btn\">\n            <i class=\"bi bi-clock-history\"></i>\n            View Complete History\n          </button>\n        </section>\n\n\n        <div class=\"bottom-dashboard-grid\">\n  <!-- Organization Chart -->\n  <section class=\"dms-panel org-panel\">\n    <div class=\"panel-header\">\n      <h3>Organization Chart</h3>\n      <button class=\"icon-btn\" type=\"button\">\n        <i class=\"bi bi-arrows-fullscreen\"></i>\n      </button>\n    </div>\n\n    <div class=\"org-chart\">\n      <div class=\"org-row center\">\n        <div class=\"org-card\">\n          <div class=\"avatar blue\">IS</div>\n          <strong>Pravin</strong>\n          <span>Managing Director</span>\n        </div>\n      </div>\n\n      <div class=\"org-row heads\">\n        <div class=\"org-card\">\n          <div class=\"avatar pink\">SJ</div>\n          <strong>Suhas</strong>\n          <span>Operations Head</span>\n        </div>\n\n        <div class=\"org-card active\">\n          <div class=\"avatar green\">ED</div>\n          <strong>Makrand</strong>\n          <span>Technology Head</span>\n        </div>\n\n        <div class=\"org-card\">\n          <div class=\"avatar teal\">DL</div>\n          <strong>Kapil</strong>\n          <span>Quality Head</span>\n        </div>\n      </div>\n\n      <div class=\"org-row team\">\n        <div class=\"org-card small\">\n          <div class=\"avatar purple\">MB</div>\n          <strong>Amit</strong>\n          <span>Ops Executive</span>\n        </div>\n\n        <div class=\"org-card small\">\n          <div class=\"avatar orange\">RT</div>\n          <strong>Aniket</strong>\n          <span>Developer</span>\n        </div>\n\n        <div class=\"org-card small\">\n          <div class=\"avatar pink\">SJ</div>\n          <strong>Priya</strong>\n          <span>QA Engineer</span>\n        </div>\n\n        <div class=\"org-card small\">\n          <div class=\"avatar gray\">JW</div>\n          <strong>Nilesh</strong>\n          <span>Store Assistant</span>\n        </div>\n      </div>\n    </div>\n  </section>\n\n  <!-- My Actions -->\n  <section class=\"dms-panel actions-panel\">\n    <div class=\"panel-header\">\n      <h3>My Actions <span>(This Week)</span></h3>\n      <button class=\"export-btn\" type=\"button\">\n        <i class=\"bi bi-download\"></i>\n        Export\n      </button>\n    </div>\n\n    <div class=\"table-wrap\">\n      <table class=\"actions-table\">\n        <thead>\n          <tr>\n            <th>Action ID</th>\n            <th>Action / Task</th>\n            <th>Assigned To</th>\n            <th>Priority</th>\n            <th>Due Date</th>\n            <th>Status</th>\n          </tr>\n        </thead>\n\n        <tbody>\n          <tr>\n            <td>ACT-2025-001</td>\n            <td>Review Internal Audit Report</td>\n            <td>Priya Sharma</td>\n            <td><span class=\"badge high\">High</span></td>\n            <td>21-May-2025</td>\n            <td><span class=\"badge progress\">In Progress</span></td>\n          </tr>\n\n          <tr>\n            <td>ACT-2025-002</td>\n            <td>Update Quality Manual</td>\n            <td>Nikhil More</td>\n            <td><span class=\"badge medium\">Medium</span></td>\n            <td>22-May-2025</td>\n            <td><span class=\"badge pending\">Pending</span></td>\n          </tr>\n\n          <tr>\n            <td>ACT-2025-003</td>\n            <td>Check Supplier Evaluation</td>\n            <td>Rohit Gawade</td>\n            <td><span class=\"badge medium\">Medium</span></td>\n            <td>23-May-2025</td>\n            <td><span class=\"badge pending\">Pending</span></td>\n          </tr>\n\n          <tr>\n            <td>ACT-2025-004</td>\n            <td>Verify Training Records</td>\n            <td>Sneha Jadhav</td>\n            <td><span class=\"badge low\">Low</span></td>\n            <td>24-May-2025</td>\n            <td><span class=\"badge pending\">Pending</span></td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n  </section>\n</div>\n      </div>\n    </section>\n  </main>\n</div>", styles: [":host {\n  display: block;\n  min-height: 100vh;\n  font-family: \"Inter\", \"Segoe UI\", Arial, sans-serif;\n  color: #071b3a;\n  background: #f4f8ff;\n}\n\n*,\n*::before,\n*::after {\n  box-sizing: border-box;\n}\n\n:host {\n  --primary: #1769ff;\n  --primary-dark: #0b3b92;\n  --secondary: #13b8a6;\n  --success: #12b76a;\n  --warning: #f77009;\n  --danger: #f04438;\n  --ink: #071b3a;\n  --muted: #667085;\n  --soft: #eef5ff;\n  --line: rgba(160, 180, 210, 0.34);\n  --card: rgba(255, 255, 255, 0.82);\n  --shadow-sm: 0 10px 24px rgba(12, 33, 70, 0.08);\n  --shadow-md: 0 20px 48px rgba(12, 33, 70, 0.12);\n  --shadow-lg: 0 30px 70px rgba(12, 33, 70, 0.16);\n  --radius-sm: 14px;\n  --radius-md: 20px;\n  --radius-lg: 28px;\n}\n\n/* Shell */\n.dms-shell {\n  height: 100vh;\n  min-height: 100vh;\n  display: flex;\n  overflow: hidden;\n  background:\n    radial-gradient(circle at 8% 5%, rgba(23, 105, 255, 0.18), transparent 30%),\n    radial-gradient(circle at 92% 10%, rgba(19, 184, 166, 0.16), transparent 28%),\n    radial-gradient(circle at 55% 95%, rgba(247, 144, 9, 0.10), transparent 32%),\n    linear-gradient(135deg, #f7fbff 0%, #edf4ff 45%, #f8fbff 100%);\n}  \n.sidebar-menu {\n  flex: 1;\n  overflow-y: auto;\n}\n\n.dms-main {\n  flex: 1;\n  min-width: 0;\n  height: 100vh;\n  overflow-y: auto;\n  overflow-x: hidden;\n}\n\n.topbar {\n  position: sticky;\n  top: 0;\n  z-index: 50;\n}\n/* Sidebar */\n.dms-sidebar {\n  width: 265px;\n  flex: 0 0 265px;\n  height: 100vh;\n  min-height: 100vh;\n  position: sticky;\n  top: 0;\n  overflow: hidden;\n  width: 310px;\n  min-height: 100vh;\n  height: 100vh;\n  flex-shrink: 0;\n  position: sticky;\n  top: 0;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n  color: #ffffff;\n  background:\n    radial-gradient(circle at 18% 0%, rgba(59, 130, 246, 0.58), transparent 38%),\n    radial-gradient(circle at 100% 35%, rgba(20, 184, 166, 0.26), transparent 32%),\n    linear-gradient(168deg, #08214f 0%, #05142e 54%, #020917 100%);\n  box-shadow: 18px 0 52px rgba(7, 27, 58, 0.22);\n\n  &::before {\n    content: \"\";\n    position: absolute;\n    inset: 0;\n    background-image:\n      linear-gradient(rgba(255, 255, 255, 0.045) 1px, transparent 1px),\n      linear-gradient(90deg, rgba(255, 255, 255, 0.045) 1px, transparent 1px);\n    background-size: 30px 30px;\n    mask-image: linear-gradient(to bottom, #000, transparent 92%);\n    pointer-events: none;\n  }\n\n  &::after {\n    content: \"\";\n    position: absolute;\n    width: 180px;\n    height: 180px;\n    right: -80px;\n    bottom: 70px;\n    border-radius: 50%;\n    background: rgba(20, 184, 166, 0.16);\n    filter: blur(10px);\n    pointer-events: none;\n  }\n}\n\n.brand-card {\n  position: relative;\n  z-index: 1;\n  margin: 18px;\n  padding: 18px;\n  border-radius: 26px;\n  display: flex;\n  align-items: center;\n  gap: 15px;\n  background: linear-gradient(135deg, rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.06));\n  border: 1px solid rgba(255, 255, 255, 0.16);\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.18), 0 16px 34px rgba(0, 0, 0, 0.16);\n  backdrop-filter: blur(18px);\n\n  h2 {\n    margin: 0;\n    font-size: clamp(26px, 2.6vw, 34px);\n    line-height: 1;\n    letter-spacing: 1px;\n  }\n\n  p {\n    margin: 5px 0 0;\n    font-size: 12px;\n    color: rgba(220, 236, 255, 0.82);\n  }\n}\n\n.qlss-logo {\n  width: 58px;\n  height: 58px;\n  flex-shrink: 0;\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 5px;\n  padding: 4px;\n  border-radius: 18px;\n  background: rgba(255, 255, 255, 0.10);\n  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.18);\n\n  span {\n    border-radius: 9px;\n    box-shadow: inset 0 0 12px rgba(255, 255, 255, 0.26);\n\n    &:nth-child(1) { background: linear-gradient(135deg, #00c853, #7cffbd); }\n    &:nth-child(2) { background: linear-gradient(135deg, #ffd600, #fff59d); }\n    &:nth-child(3) { background: linear-gradient(135deg, #2979ff, #90c2ff); }\n    &:nth-child(4) { background: linear-gradient(135deg, #ff1744, #ff9aa5); }\n  }\n}\n\n.sidebar-menu {\n  position: relative;\n  z-index: 1;\n  flex: 1;\n  padding: 0 11px 18px;\n  overflow-y: auto;\n  scrollbar-width: thin;\n  scrollbar-color: rgba(255, 255, 255, 0.26) transparent;\n\n  &::-webkit-scrollbar {\n    width: 6px;\n  }\n\n  &::-webkit-scrollbar-thumb {\n    border-radius: 20px;\n    background: rgba(255, 255, 255, 0.22);\n  }\n}\n\n.menu-title {\n  margin: 20px 10px 9px;\n  color: rgba(195, 218, 246, 0.72);\n  font-size: 11px;\n  font-weight: 600;\n  letter-spacing: 1.2px;\n  text-transform: uppercase;\n}\n\n.menu-item {\n  min-height: 48px;\n  margin-bottom: 7px;\n  padding: 0;\n  display: flex;\n  align-items: center;\n  gap: 0;\n  border-radius: 17px;\n  color: rgba(232, 243, 255, 0.88);\n  text-decoration: none;\n  font-weight: 500;\n  position: relative;\n  cursor: pointer;\n  transition: transform 0.22s ease, background 0.22s ease, color 0.22s ease, box-shadow 0.22s ease;\n\n  i {\n    width: 24px;\n    font-size: 18px;\n    text-align: center;\n  }\n\n  &:hover,\n  &.active {\n    color: #ffffff;\n    background: linear-gradient(135deg, rgba(255, 255, 255, 0.20), rgba(255, 255, 255, 0.07));\n    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.14);\n    transform: translateX(5px);\n  }\n\n  &.active::before {\n    content: \"\";\n    position: absolute;\n    left: -16px;\n    width: 5px;\n    height: 30px;\n    border-radius: 0 12px 12px 0;\n    background: linear-gradient(180deg, #28f6a5, #19d3ff);\n    box-shadow: 0 0 18px rgba(40, 246, 165, 0.55);\n  }\n\n  b {\n    margin-left: auto;\n    min-width: 25px;\n    height: 25px;\n    padding: 0 8px;\n    border-radius: 999px;\n    display: grid;\n    place-items: center;\n    font-size: 12px;\n    color: #ffffff;\n    box-shadow: 0 8px 18px rgba(0, 0, 0, 0.16);\n\n    &.green { background: linear-gradient(135deg, #12b76a, #22e69a); }\n    &.orange { background: linear-gradient(135deg, #ff7a1a, #ffb703); }\n    &.blue { background: linear-gradient(135deg, #2979ff, #00bcd4); }\n  }\n}\n\n.sidebar-bottom {\n  position: relative;\n  z-index: 1;\n  margin: 0 18px 18px;\n  padding: 16px;\n  color: rgba(224, 239, 255, 0.78);\n  font-size: 12px;\n  border-radius: 22px;\n  background: rgba(255, 255, 255, 0.07);\n  border: 1px solid rgba(255, 255, 255, 0.10);\n\n  button {\n    margin-top: 10px;\n    border: 0;\n    color: #ffffff;\n    background: transparent;\n    font-weight: 700;\n    padding: 0;\n    cursor: pointer;\n\n    i {\n      margin-right: 8px;\n    }\n  }\n}\n\n/* Main */\n.dms-main {\n  flex: 1;\n  min-width: 0;\n}\n\n.topbar {\n  min-height: 86px;\n  padding: 16px 28px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 22px;\n  position: sticky;\n  top: 0;\n  z-index: 20;\n  background: rgba(255, 255, 255, 0.78);\n  border-bottom: 1px solid rgba(190, 205, 225, 0.58);\n  box-shadow: 0 12px 34px rgba(15, 31, 61, 0.05);\n  backdrop-filter: blur(22px);\n}\n\n.top-menu {\n  min-width: 0;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  overflow-x: auto;\n  scrollbar-width: none;\n\n  &::-webkit-scrollbar {\n    display: none;\n  }\n\n  a {\n    color: #0b2145;\n    text-decoration: none;\n    font-weight: 700;\n    white-space: nowrap;\n    padding: 11px 14px;\n    border-radius: 16px;\n    transition: 0.24s ease;\n\n    i {\n      margin-right: 8px;\n    }\n\n    &:hover {\n      color: var(--primary);\n      background: linear-gradient(135deg, #eef5ff, #ffffff);\n      box-shadow: var(--shadow-sm);\n      transform: translateY(-1px);\n    }\n  }\n}\n\n.top-right {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n}\n\n.search-box {\n  width: min(370px, 34vw);\n  height: 47px;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 0 15px;\n  background: rgba(255, 255, 255, 0.92);\n  border: 1px solid rgba(204, 219, 238, 0.86);\n  border-radius: 17px;\n  box-shadow: var(--shadow-sm);\n  transition: 0.24s ease;\n\n  &:focus-within {\n    border-color: rgba(23, 105, 255, 0.55);\n    box-shadow: 0 0 0 4px rgba(23, 105, 255, 0.10), var(--shadow-sm);\n  }\n\n  i {\n    color: #7b8ba5;\n  }\n\n  input {\n    width: 100%;\n    border: 0;\n    outline: 0;\n    font-size: 14px;\n    background: transparent;\n    color: var(--ink);\n\n    &::placeholder {\n      color: #98a2b3;\n    }\n  }\n}\n\n.notify-btn,\n.close-btn,\n.card-actions button {\n  display: grid;\n  place-items: center;\n}\n\n.notify-btn {\n  width: 47px;\n  height: 47px;\n  flex-shrink: 0;\n  border: 0;\n  border-radius: 17px;\n  background: #ffffff;\n  box-shadow: var(--shadow-sm);\n  position: relative;\n  cursor: pointer;\n  transition: 0.22s ease;\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: var(--shadow-md);\n  }\n\n  i {\n    font-size: 20px;\n    color: #10233f;\n  }\n\n  span {\n    position: absolute;\n    top: -7px;\n    right: -5px;\n    min-width: 22px;\n    height: 22px;\n    padding: 0 6px;\n    border-radius: 50%;\n    background: linear-gradient(135deg, #ff355d, #ff6b6b);\n    color: #ffffff;\n    font-size: 12px;\n    display: grid;\n    place-items: center;\n    border: 2px solid #ffffff;\n  }\n}\n\n.user-card {\n  display: flex;\n  align-items: center;\n  gap: 11px;\n  padding: 7px 12px 7px 7px;\n  border-radius: 19px;\n  background: #ffffff;\n  box-shadow: var(--shadow-sm);\n  white-space: nowrap;\n\n  .avatar {\n    width: 43px;\n    height: 43px;\n    border-radius: 15px;\n    display: grid;\n    place-items: center;\n    color: #ffffff;\n    font-weight: 700;\n    font-size: 20px;\n    background: linear-gradient(135deg, var(--primary), #00bcd4);\n    box-shadow: 0 10px 22px rgba(23, 105, 255, 0.24);\n  }\n\n  strong,\n  small {\n    display: block;\n  }\n\n  small {\n    color: var(--muted);\n  }\n}\n\n/* Content */\n.content-area {\n  padding: clamp(16px, 2vw, 28px);\n}\n\n.page-title {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 18px;\n  margin-bottom: 20px;\n\n  span {\n    color: var(--muted);\n    font-size: 13px;\n    font-weight: 500;\n  }\n\n  h1 {\n    margin: 4px 0 0;\n    font-size: clamp(24px, 2.2vw, 34px);\n    letter-spacing: -0.6px;\n  }\n}\n\n.primary-action,\n.history-btn {\n  border: 0;\n  color: #ffffff;\n  background: linear-gradient(135deg, var(--primary), var(--secondary));\n  font-weight: 700;\n  box-shadow: 0 16px 34px rgba(23, 105, 255, 0.25);\n  cursor: pointer;\n  transition: 0.23s ease;\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: 0 22px 44px rgba(23, 105, 255, 0.30);\n  }\n\n  i {\n    margin-right: 8px;\n  }\n}\n\n.primary-action {\n  padding: 13px 18px;\n  border-radius: 17px;\n}\n\n/* Stats */\n.stats-row {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(190px, 1fr));\n  gap: 16px;\n  margin-bottom: 20px;\n}\n\n.stat-card {\n  position: relative;\n  overflow: hidden;\n  display: flex;\n  align-items: center;\n  gap: 15px;\n  padding: 18px;\n  border-radius: 24px;\n  background: linear-gradient(135deg, #ffffff, #f0f6ff);\n  border: 1px solid rgba(207, 222, 242, 0.86);\n  box-shadow: var(--shadow-sm);\n  transition: 0.24s ease;\n\n  &::after {\n    content: \"\";\n    position: absolute;\n    right: -35px;\n    top: -35px;\n    width: 105px;\n    height: 105px;\n    border-radius: 50%;\n    background: rgba(23, 105, 255, 0.08);\n  }\n\n  &:hover {\n    transform: translateY(-3px);\n    box-shadow: var(--shadow-md);\n  }\n\n  i {\n    width: 50px;\n    height: 50px;\n    border-radius: 17px;\n    display: grid;\n    place-items: center;\n    color: #ffffff;\n    font-size: 23px;\n    background: linear-gradient(135deg, var(--primary), #6ea8ff);\n    box-shadow: 0 12px 26px rgba(23, 105, 255, 0.20);\n  }\n\n  strong {\n    display: block;\n    font-size: 26px;\n    line-height: 1;\n  }\n\n  span {\n    display: block;\n    margin-top: 5px;\n    color: var(--muted);\n    font-size: 13px;\n    font-weight: 500;\n  }\n\n  &.orange {\n    &::after { background: rgba(247, 144, 9, 0.10); }\n\n    i {\n      background: linear-gradient(135deg, #ff7a1a, #ffd166);\n    }\n  }\n\n  &.green {\n    &::after { background: rgba(18, 183, 106, 0.10); }\n\n    i {\n      background: linear-gradient(135deg, var(--success), #69f0ae);\n    }\n  }\n}\n\n/* Grid */\n.dashboard-grid {\n  display: grid;\n  grid-template-columns: minmax(330px, 1.25fr) minmax(330px, 1.1fr) minmax(280px, 0.9fr);\n  gap: 18px;\n  align-items: stretch;\n}\n\n.glass-card {\n  position: relative;\n  overflow: hidden;\n  background: var(--card);\n  border: 1px solid rgba(202, 216, 235, 0.9);\n  border-radius: var(--radius-lg);\n  padding: clamp(16px, 1.5vw, 22px);\n  box-shadow: var(--shadow-md), inset 0 1px 0 rgba(255, 255, 255, 0.82);\n  backdrop-filter: blur(18px);\n  transition: 0.25s ease;\n\n  &::before {\n    content: \"\";\n    position: absolute;\n    inset: 0 0 auto;\n    height: 4px;\n    background: linear-gradient(90deg, var(--primary), var(--secondary), #ffb703);\n    opacity: 0.85;\n  }\n\n  &:hover {\n    transform: translateY(-3px);\n    box-shadow: var(--shadow-lg), inset 0 1px 0 rgba(255, 255, 255, 0.82);\n  }\n}\n\n.card-head {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 14px;\n  margin-bottom: 18px;\n\n  small {\n    color: var(--primary);\n    font-weight: 700;\n    font-size: 12px;\n    text-transform: uppercase;\n    letter-spacing: 0.4px;\n  }\n\n  h3 {\n    margin: 4px 0 0;\n    font-size: 18px;\n    line-height: 1.3;\n  }\n}\n\n.card-actions {\n  display: flex;\n  gap: 8px;\n\n  button {\n    width: 38px;\n    height: 38px;\n    border: 1px solid #dce7f5;\n    border-radius: 14px;\n    background: #ffffff;\n    cursor: pointer;\n    transition: 0.22s ease;\n\n    &:hover {\n      color: var(--primary);\n      transform: translateY(-2px);\n      box-shadow: var(--shadow-sm);\n    }\n  }\n}\n\n/* Tree */\n.tree-search {\n  height: 46px;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  background: linear-gradient(135deg, #f8fbff, #ffffff);\n  border: 1px solid #d9e5f3;\n  border-radius: 17px;\n  padding: 0 14px;\n  margin-bottom: 18px;\n  transition: 0.24s ease;\n\n  &:focus-within {\n    border-color: rgba(23, 105, 255, 0.45);\n    box-shadow: 0 0 0 4px rgba(23, 105, 255, 0.10);\n  }\n\n  i {\n    color: #8493aa;\n  }\n\n  input {\n    width: 100%;\n    border: 0;\n    outline: 0;\n    background: transparent;\n    font-size: 14px;\n    color: var(--ink);\n  }\n}\n\n.tree-box { \n  overflow: auto;\n  padding: 4px 6px 4px 0;\n  scrollbar-width: thin;\n  scrollbar-color: rgba(23, 105, 255, 0.25) transparent;\n\n  &::-webkit-scrollbar {\n    width: 7px;\n  }\n\n  &::-webkit-scrollbar-thumb {\n    border-radius: 20px;\n    background: rgba(23, 105, 255, 0.22);\n  }\n}\n\n.tree-root {\n  min-height: 44px;\n  padding: 11px 13px;\n  border-radius: 17px;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  background: linear-gradient(135deg, #fff7e8, #ffffff);\n  border: 1px solid rgba(247, 144, 9, 0.18);\n  font-weight: 700;\n  box-shadow: var(--shadow-sm);\n\n  i {\n    color: #f5a000;\n  }\n}\n\n.tree-list {\n  margin-left: 16px;\n  padding-left: 14px;\n  border-left: 2px dashed #d7e2f0;\n}\n\n.tree-node {\n  --indent: 27px;\n}\n\n.tree-row,\n.tree-file {\n  min-height: 43px;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  margin: 5px 0;\n  border-radius: 15px;\n  transition: 0.22s ease;\n  color: #10233f;\n\n  > div {\n    display: flex;\n    align-items: center;\n    gap: 10px;\n    min-width: 0;\n  }\n\n  span {\n    overflow: hidden;\n    text-overflow: ellipsis;\n  }\n\n  &:hover {\n    background: linear-gradient(135deg, #eef6ff, #ffffff);\n    transform: translateX(4px);\n    box-shadow: 0 8px 18px rgba(23, 105, 255, 0.07);\n  }\n}\n\n.tree-row {\n  padding: 0 10px;\n  padding-left: calc(10px + (var(--level) * var(--indent)));\n  cursor: pointer;\n  font-weight: 600;\n\n  small {\n    color: #73839d;\n    font-size: 12px;\n    flex-shrink: 0;\n    margin-left: auto;\n  }\n\n  .folder-icon {\n    color: #f5a000;\n  }\n}\n\n.tree-file {\n  margin-left: 22px;\n  padding: 9px 10px;\n  color: #273b59;\n\n  small {\n    color: #7788a2;\n    white-space: nowrap;\n    margin-left: auto;\n  }\n}\n\n.expand-btn,\n.expand-space {\n  width: 25px;\n  height: 25px;\n  flex-shrink: 0;\n}\n\n.expand-btn {\n  border: 1px solid #d5e1f0;\n  border-radius: 9px;\n  background: #ffffff;\n  color: var(--primary);\n  font-weight: 700;\n  cursor: pointer;\n  display: grid;\n  place-items: center;\n  transition: 0.2s ease;\n\n  i {\n    font-size: 15px;\n    line-height: 1;\n  }\n\n  &:hover {\n    background: var(--primary);\n    color: #ffffff;\n    border-color: var(--primary);\n    transform: scale(1.05);\n  }\n}\n\n.expand-space {\n  display: inline-block;\n}\n\n.node-icon {\n  font-size: 18px;\n  flex-shrink: 0;\n}\n\n.bi-folder-fill,\n.bi-folder2-open {\n  color: #f5a000;\n}\n\n.bi-file-earmark-pdf-fill {\n  color: var(--danger);\n}\n\n.bi-file-earmark-word-fill {\n  color: #2563eb;\n}\n\n.bi-file-earmark-excel-fill {\n  color: #16a34a;\n}\n\n.bi-file-earmark-fill {\n  color: #64748b;\n}\n\n.node-title {\n  flex: 1;\n  min-width: 0;\n  font-size: 14px;\n  font-weight: 600;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.tree-children {\n  position: relative;\n\n  &::before {\n    content: \"\";\n    position: absolute;\n    left: 21px;\n    top: 0;\n    bottom: 4px;\n    width: 1px;\n    background: linear-gradient(to bottom, rgba(23, 105, 255, 0.18), transparent);\n  }\n}\n\n/* Workflow */\n.current-status {\n  padding: 15px;\n  border-radius: 20px;\n  background: linear-gradient(135deg, #fff4e8, #ffffff);\n  border: 1px solid rgba(247, 144, 9, 0.16);\n  display: flex;\n  justify-content: space-between;\n  gap: 12px;\n  margin-bottom: 22px;\n\n  span {\n    color: #6f7f97;\n    font-weight: 600;\n  }\n\n  b {\n    color: #d35400;\n  }\n}\n\n.timeline {\n  position: relative;\n}\n\n.timeline-step {\n  display: flex;\n  gap: 14px;\n  position: relative;\n  padding-bottom: 24px;\n\n  &::before {\n    content: \"\";\n    position: absolute;\n    left: 22px;\n    top: 46px;\n    bottom: 0;\n    width: 3px;\n    border-radius: 10px;\n    background: #d7e3f0;\n  }\n\n  &:last-child::before {\n    display: none;\n  }\n\n  .dot {\n    width: 46px;\n    height: 46px;\n    border-radius: 17px;\n    display: grid;\n    place-items: center;\n    flex-shrink: 0;\n    background: #eef3f8;\n    color: #7f8ea5;\n    border: 4px solid #ffffff;\n    box-shadow: 0 8px 20px rgba(15, 31, 61, 0.10);\n    z-index: 1;\n  }\n\n  &.done .dot {\n    background: linear-gradient(135deg, var(--success), #69f0ae);\n    color: #ffffff;\n  }\n\n  &.active .dot {\n    background: linear-gradient(135deg, var(--primary), #00bcd4);\n    color: #ffffff;\n    animation: pulse 1.8s infinite;\n  }\n\n  &.done::before {\n    background: linear-gradient(var(--success), var(--primary));\n  }\n}\n\n.step-content {\n  flex: 1;\n  padding: 13px 15px;\n  border-radius: 19px;\n  background: #ffffff;\n  border: 1px solid #e0e9f4;\n  box-shadow: 0 8px 18px rgba(15, 31, 61, 0.04);\n\n  h4 {\n    margin: 0 0 5px;\n    font-size: 15px;\n  }\n\n  p,\n  small {\n    margin: 0;\n    color: #52637c;\n    font-size: 13px;\n  }\n\n  em {\n    display: inline-block;\n    margin-top: 9px;\n    padding: 5px 10px;\n    border-radius: 999px;\n    background: #fff1df;\n    color: #d35400;\n    font-style: normal;\n    font-size: 12px;\n    font-weight: 700;\n  }\n}\n\n.comment-box {\n  border-top: 1px solid #d9e5f3;\n  padding-top: 16px;\n\n  h4 {\n    margin: 0 0 8px;\n  }\n\n  p {\n    color: #7b8ba5;\n  }\n\n  button {\n    border: 1px solid #d5e2f2;\n    background: #ffffff;\n    border-radius: 15px;\n    padding: 11px 15px;\n    font-weight: 700;\n    cursor: pointer;\n    transition: 0.22s ease;\n\n    &:hover {\n      color: var(--primary);\n      box-shadow: var(--shadow-sm);\n      transform: translateY(-2px);\n    }\n  }\n}\n\n/* Details */\n.close-btn,\n.edit-btn {\n  border: 1px solid #dce7f5;\n  background: #ffffff;\n  border-radius: 14px;\n  cursor: pointer;\n  transition: 0.22s ease;\n\n  &:hover {\n    color: var(--primary);\n    box-shadow: var(--shadow-sm);\n  }\n}\n\n.close-btn {\n  width: 38px;\n  height: 38px;\n  font-size: 24px;\n}\n\n.edit-btn {\n  padding: 10px 18px;\n  font-weight: 700;\n}\n\n.doc-preview {\n  padding: 18px;\n  border-radius: 24px;\n  background: linear-gradient(135deg, #fff0f0, #ffffff);\n  border: 1px solid rgba(240, 68, 56, 0.14);\n  display: flex;\n  align-items: center;\n  gap: 15px;\n  margin-bottom: 18px;\n\n  i {\n    width: 55px;\n    height: 55px;\n    border-radius: 19px;\n    background: #ffffff;\n    display: grid;\n    place-items: center;\n    color: var(--danger);\n    font-size: 28px;\n    box-shadow: 0 10px 24px rgba(227, 52, 47, 0.16);\n  }\n\n  h4 {\n    margin: 0;\n  }\n\n  p {\n    margin: 4px 0 0;\n    color: #6d7d95;\n  }\n}\n\n.details-list {\n  display: grid;\n  gap: 10px;\n\n  div {\n    padding: 12px 0;\n    display: grid;\n    grid-template-columns: 130px 1fr;\n    gap: 12px;\n    border-bottom: 1px dashed #d9e5f3;\n  }\n\n  label {\n    color: #7a8aa2;\n    font-size: 13px;\n    font-weight: 600;\n  }\n\n  span {\n    font-weight: 600;\n    font-size: 13px;\n    color: #233852;\n    line-height: 1.35;\n    word-break: break-word;\n  }\n}\n\n.history-btn {\n  width: 100%;\n  margin-top: 20px;\n  padding: 14px 16px;\n  border-radius: 18px;\n}\n\n/* Animations */\n@keyframes pulse {\n  0% {\n    box-shadow: 0 0 0 0 rgba(18, 102, 241, 0.35);\n  }\n\n  70% {\n    box-shadow: 0 0 0 13px rgba(18, 102, 241, 0);\n  }\n\n  100% {\n    box-shadow: 0 0 0 0 rgba(18, 102, 241, 0);\n  }\n}\n\n/* Responsive */\n@media (max-width: 1500px) {\n  .dashboard-grid {\n    grid-template-columns: 1fr 1fr;\n  }\n\n  .details-card {\n    grid-column: span 2;\n  }\n}\n\n@media (max-width: 1180px) {\n  .dms-shell {\n    flex-direction: column;\n    overflow: visible;\n  }\n\n  .dms-sidebar {\n    width: 100%;\n    min-height: auto;\n    height: auto;\n    position: relative;\n    border-radius: 0 0 28px 28px;\n  }\n\n  .brand-card {\n    margin-bottom: 12px;\n  }\n\n  .sidebar-menu {\n    display: grid;\n    grid-template-columns: repeat(2, minmax(220px, 1fr));\n    gap: 6px 12px;\n    max-height: 320px;\n  }\n\n  .menu-title {\n    grid-column: 1 / -1;\n  }\n\n  .sidebar-bottom {\n    display: none;\n  }\n\n  .topbar {\n    position: sticky;\n    top: 0;\n    flex-direction: column;\n    align-items: stretch;\n  }\n\n  .top-right {\n    flex-wrap: wrap;\n  }\n\n  .search-box {\n    width: 100%;\n    flex: 1 1 260px;\n  }\n}\n\n@media (max-width: 700px) {\n  .dashboard-grid,\n  .stats-row {\n    grid-template-columns: 1fr;\n  }\n\n  .details-card {\n    grid-column: auto;\n  }\n\n  .page-title {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n\n  .primary-action {\n    width: 100%;\n  }\n\n  .top-menu {\n    padding-bottom: 4px;\n  }\n\n  .user-card {\n    flex: 1 1 auto;\n  }\n}\n\n@media (max-width: 620px) {\n  .content-area {\n    padding: 14px;\n  }\n\n  .brand-card {\n    margin: 12px;\n    padding: 15px;\n    border-radius: 22px;\n  }\n\n  .qlss-logo {\n    width: 50px;\n    height: 50px;\n  }\n\n  .sidebar-menu {\n    grid-template-columns: 1fr;\n    padding: 0 12px 12px;\n    max-height: none;\n  }\n\n  .menu-item {\n    min-height: 44px;\n  }\n\n  .topbar {\n    padding: 14px;\n  }\n\n  .top-menu {\n    gap: 8px;\n\n    a {\n      font-size: 13px;\n      padding: 9px 11px;\n    }\n  }\n\n  .top-right {\n    gap: 10px;\n  }\n\n  .notify-btn {\n    width: 44px;\n    height: 44px;\n  }\n\n  .user-card {\n    width: 100%;\n  }\n\n  .glass-card {\n    padding: 15px;\n    border-radius: 22px;\n  }\n\n  .card-head {\n    flex-direction: column;\n  }\n\n  .stat-card {\n    padding: 15px;\n  }\n\n  .current-status {\n    flex-direction: column;\n  }\n\n  .details-list div {\n    grid-template-columns: 1fr;\n    gap: 4px;\n  }\n\n  .tree-box {\n    height: 440px;\n    max-height: 58vh;\n  }\n\n  .tree-node {\n    --indent: 18px;\n  }\n\n  .tree-row {\n    gap: 7px;\n    padding-right: 6px;\n  }\n\n  .tree-list {\n    margin-left: 4px;\n    padding-left: 10px;\n  }\n\n  .tree-file {\n    margin-left: 8px;\n  }\n\n  .node-title {\n    font-size: 13px;\n  }\n\n  .doc-preview {\n    align-items: flex-start;\n  }\n}\n\n/* Bottom Dashboard: Organization Chart + My Actions */\n.bottom-dashboard-grid {\n  display: grid;\n  //grid-template-columns: minmax(420px, 1.05fr) minmax(420px, 1fr);\n grid-template-columns: minmax(615px, 1.05fr) minmax(725px, 1fr);\n  gap: 18px;\n  margin-top: 18px;\n  align-items: stretch;\n}\n\n.dms-panel {\n  position: relative;\n  overflow: hidden;\n  background: var(--card);\n  border: 1px solid rgba(202, 216, 235, 0.9);\n  border-radius: var(--radius-lg);\n  box-shadow:\n    var(--shadow-md),\n    inset 0 1px 0 rgba(255, 255, 255, 0.82);\n  backdrop-filter: blur(18px);\n  transition: 0.25s ease;\n\n  &::before {\n    content: \"\";\n    position: absolute;\n    inset: 0 0 auto;\n    height: 4px;\n    background: linear-gradient(90deg, var(--primary), var(--secondary), #ffb703);\n    opacity: 0.85;\n  }\n\n  &:hover {\n    transform: translateY(-3px);\n    box-shadow:\n      var(--shadow-lg),\n      inset 0 1px 0 rgba(255, 255, 255, 0.82);\n  }\n}\n\n.panel-header {\n  min-height: 58px;\n  padding: 0 18px;\n  border-bottom: 1px solid rgba(220, 231, 245, 0.9);\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 14px;\n  background: rgba(255, 255, 255, 0.64);\n\n  h3 {\n    margin: 0;\n    font-size: 14px;\n    font-weight: 700;\n    color: var(--ink);\n    letter-spacing: -0.2px;\n\n    span {\n      font-size: 10px;\n      color: var(--muted);\n      font-weight: 600;\n    }\n  }\n}\n\n.icon-btn {\n  width: 34px;\n  height: 34px;\n  border: 1px solid #dce7f5;\n  border-radius: 12px;\n  background: #ffffff;\n  color: var(--ink);\n  cursor: pointer;\n  display: grid;\n  place-items: center;\n  box-shadow: var(--shadow-sm);\n  transition: 0.22s ease;\n\n  i {\n    font-size: 14px;\n  }\n\n  &:hover {\n    color: var(--primary);\n    transform: translateY(-2px);\n    box-shadow: var(--shadow-md);\n  }\n}\n\n/* Organization Chart */\n.org-chart {\n  padding: 28px 16px 14px;\n  overflow-x: auto;\n  scrollbar-width: thin;\n  scrollbar-color: rgba(23, 105, 255, 0.24) transparent;\n\n  &::-webkit-scrollbar {\n    height: 7px;\n  }\n\n  &::-webkit-scrollbar-thumb {\n    border-radius: 20px;\n    background: rgba(23, 105, 255, 0.22);\n  }\n}\n\n.org-row {\n  display: flex;\n  justify-content: center;\n  gap: 16px;\n  position: relative;\n  margin-bottom: 14px;\n}\n\n.org-row.center {\n  margin-bottom: 16px;\n}\n\n.org-row.heads,\n.org-row.team {\n  gap: 16px;\n}\n\n.org-row.team {\n  margin-bottom: 0;\n}\n\n.org-card {\n  width: 142px;\n  min-height: 84px;\n  padding: 10px;\n  border: 1px solid rgba(215, 228, 242, 0.95);\n  border-radius: 14px;\n  background:\n    radial-gradient(circle at top left, rgba(23, 105, 255, 0.07), transparent 38%),\n    linear-gradient(135deg, #ffffff, #f8fbff);\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 3px;\n  box-shadow: 0 8px 20px rgba(15, 31, 61, 0.05);\n  transition: 0.22s ease;\n\n  &:hover {\n    transform: translateY(-3px);\n    border-color: rgba(23, 105, 255, 0.45);\n    box-shadow: 0 14px 30px rgba(15, 31, 61, 0.10);\n  }\n\n  &.active {\n    border-color: var(--primary);\n    box-shadow:\n      0 0 0 1px rgba(23, 105, 255, 0.8),\n      0 14px 30px rgba(23, 105, 255, 0.14);\n  }\n\n  &.small {\n    width: 142px;\n    min-height: 82px;\n  }\n\n  strong {\n    font-size: 11px;\n    color: var(--ink);\n    line-height: 1.12;\n    font-weight: 700;\n  }\n\n  span {\n    font-size: 10px;\n    color: var(--muted);\n    text-align: center;\n    line-height: 1.2;\n  }\n}\n\n.avatar {\n  width: 38px;\n  height: 38px;\n  border-radius: 50%;\n  display: grid;\n  place-items: center;\n  color: #ffffff;\n  font-size: 11px;\n  font-weight: 700;\n  box-shadow: 0 10px 22px rgba(15, 31, 61, 0.16);\n}\n\n.avatar.blue { background: linear-gradient(135deg, #2563eb, #60a5fa); }\n.avatar.green { background: linear-gradient(135deg, #16a34a, #22c55e); }\n.avatar.teal { background: linear-gradient(135deg, #0f766e, #14b8a6); }\n.avatar.pink { background: linear-gradient(135deg, #db2777, #ec4899); }\n.avatar.purple { background: linear-gradient(135deg, #7c3aed, #8b5cf6); }\n.avatar.orange { background: linear-gradient(135deg, #f97316, #fb923c); }\n.avatar.gray { background: linear-gradient(135deg, #64748b, #94a3b8); }\n\n/* Actions Table */\n.export-btn {\n  height: 34px;\n  padding: 0 13px;\n  border: 0;\n  border-radius: 12px;\n  background: linear-gradient(135deg, var(--primary), #0f63ff);\n  color: #ffffff;\n  font-size: 11px;\n  font-weight: 700;\n  cursor: pointer;\n  box-shadow: 0 12px 24px rgba(23, 105, 255, 0.24);\n  transition: 0.22s ease;\n\n  i {\n    margin-right: 6px;\n    font-size: 12px;\n  }\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: 0 18px 34px rgba(23, 105, 255, 0.30);\n  }\n}\n\n.table-wrap {\n  padding: 14px 16px 16px;\n  overflow-x: auto;\n  scrollbar-width: thin;\n  scrollbar-color: rgba(23, 105, 255, 0.24) transparent;\n\n  &::-webkit-scrollbar {\n    height: 7px;\n  }\n\n  &::-webkit-scrollbar-thumb {\n    border-radius: 20px;\n    background: rgba(23, 105, 255, 0.22);\n  }\n}\n\n.actions-table {\n  width: 100%;\n  min-width: 680px;\n  border-collapse: separate;\n  border-spacing: 0;\n\n  th,\n  td {\n    padding: 10px 10px;\n    text-align: left;\n    font-size: 11px;\n    color: #1f3353;\n    border-bottom: 1px solid #e7eef7;\n    vertical-align: middle;\n    line-height: 1.32;\n  }\n\n  th {\n    background: linear-gradient(135deg, #f8fbff, #f1f6ff);\n    font-weight: 700;\n    color: #1b2f4f;\n    white-space: nowrap;\n  }\n\n  th:first-child {\n    border-top-left-radius: 12px;\n  }\n\n  th:last-child {\n    border-top-right-radius: 12px;\n  }\n\n  tbody tr {\n    transition: 0.18s ease;\n  }\n\n  tbody tr:hover {\n    background: #f8fbff;\n  }\n\n  tbody td {\n    font-weight: 500;\n  }\n}\n\n.badge {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 22px;\n  padding: 3px 9px;\n  border-radius: 8px;\n  font-size: 10px;\n  font-weight: 700;\n  line-height: 1;\n  white-space: nowrap;\n}\n\n.badge.high {\n  background: #ffe4e4;\n  color: #dc2626;\n}\n\n.badge.medium {\n  background: #fff0dc;\n  color: #d35400;\n}\n\n.badge.low {\n  background: #dcfce7;\n  color: #15803d;\n}\n\n.badge.progress {\n  background: #fff0dc;\n  color: #d35400;\n}\n\n.badge.pending {\n  background: #e8f1ff;\n  color: var(--primary);\n}\n\n/* Bottom Dashboard Responsive */\n@media (max-width: 1200px) {\n  .bottom-dashboard-grid {\n    grid-template-columns: 1fr;\n  }\n}\n\n@media (max-width: 700px) {\n  .bottom-dashboard-grid {\n    gap: 14px;\n  }\n\n  .panel-header {\n    min-height: auto;\n    padding: 12px 14px;\n    gap: 12px;\n    align-items: flex-start;\n    flex-direction: column;\n  }\n\n  .org-chart {\n    padding: 22px 12px 12px;\n  }\n\n  .org-row {\n    min-width: 540px;\n    gap: 12px;\n  }\n\n  .org-card,\n  .org-card.small {\n    width: 132px;\n  }\n\n  .table-wrap {\n    padding: 12px;\n  }\n}\n", "/* Final demo training page polish */\n.demo-training {\n  padding: 6px;\n  background:\n    radial-gradient(circle at 4% 4%, rgba(111, 86, 255, .12), transparent 26%),\n    radial-gradient(circle at 98% 8%, rgba(7, 94, 255, .14), transparent 30%),\n    linear-gradient(180deg, #f7faff 0%, #f3f7ff 100%);\n}\n\n.hero-shell,\n.training-panel {\n  width: min(calc(100% - 0px), 1800px);\n  border-color: rgba(188, 210, 250, .9);\n  box-shadow: 0 18px 55px rgba(24, 50, 100, .09);\n}\n\n.hero-shell {\n  min-height: 430px;\n  background:\n    radial-gradient(circle at 82% 50%, rgba(86, 133, 244, .36) 0 16%, rgba(86, 133, 244, .19) 17% 31%, transparent 32%),\n    linear-gradient(107deg, #ffffff 0 48%, #edf5ff 48.2% 100%);\n}\n\n.hero-content {\n  min-height: 430px;\n  grid-template-columns: minmax(0, 1.06fr) minmax(440px, .94fr);\n  gap: 20px;\n  padding: 70px 100px 26px 100px;\n  align-items: center;\n}\n\n.hero-copy {\n  max-width: 690px;\n  min-width: 0;\n}\n\n.eyebrow {\n  padding: 5px 14px;\n  border-color: rgba(7, 94, 255, .28);\n  color: #075eff;\n  background: rgba(244, 248, 255, .94);\n  font-size: 12px;\n  letter-spacing: .07em;\n}\n\n#training-hero-title {\n  max-width: 690px;\n  margin: 12px 0 12px;\n  color: #071747;\n  font-size: clamp(50px, 4vw, 66px);\n  line-height: 1.01;\n  letter-spacing: 0;\n}\n\n.hero-copy p {\n  max-width: 610px;\n  color: #52608d;\n  font-size: 17px;\n  line-height: 1.58;\n}\n\n.hero-features {\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n  gap: 0;\n  width: 100%;\n  max-width: 700px;\n  margin-top: 32px;\n  overflow: hidden;\n}\n\n.hero-feature {\n  display: grid;\n  grid-template-columns: 50px minmax(0, 1fr);\n  gap: 12px;\n  align-items: center;\n  min-width: 0;\n  padding: 0 14px;\n  border-right-color: #d7e3fb;\n  overflow: hidden;\n}\n\n.hero-feature:first-child { padding-left: 0; }\n.hero-feature:last-child { padding-right: 0; border-right: 0; }\n\n.hero-feature i {\n  display: inline-grid;\n  width: 50px;\n  height: 50px;\n  flex-basis: 50px;\n  place-items: center;\n  border-radius: 10px;\n  font-size: 21px;\n  box-shadow: inset 0 1px 0 rgba(255,255,255,.8), 0 10px 22px rgba(24, 50, 100, .06);\n}\n\n.hero-feature:nth-child(1) i { color: #075eff; border-color: #cbdcff; background: linear-gradient(145deg, #eef4ff, #ffffff); }\n.hero-feature:nth-child(2) i { color: #20b746; border-color: #caefd4; background: linear-gradient(145deg, #effcf3, #ffffff); }\n.hero-feature:nth-child(3) i { color: #6a38f0; border-color: #e0d5ff; background: linear-gradient(145deg, #f4efff, #ffffff); }\n.hero-feature:nth-child(4) i { color: #ff6b1a; border-color: #ffe0ce; background: linear-gradient(145deg, #fff4ed, #ffffff); }\n\n.hero-feature div { min-width: 0; }\n.hero-feature strong,\n.hero-feature span {\n  display: block;\n  max-width: 100%;\n  overflow: hidden;\n  text-overflow: clip;\n  white-space: nowrap;\n}\n.hero-feature strong { color: #071747; font-size: 10.5px; line-height: 1.08; font-weight: 900; }\n.hero-feature span { margin-top: 6px; color: #4f5d8a; font-size: 9.5px; line-height: 1.08; font-weight: 700; }\n\n.hero-visual {\n  min-height: 350px;\n  overflow: visible;\n}\n\n.hero-content::before {\n  right: 48px;\n  top: 22px;\n  width: 520px;\n  height: 520px;\n  background: linear-gradient(135deg, rgba(198, 216, 255, .36), rgba(74, 126, 238, .54));\n}\n\n.hero-image-wrap {\n  position: absolute;\n  right: 74px;\n  bottom: -8px;\n  z-index: 2;\n  width: min(520px, 86%);\n  filter: drop-shadow(0 24px 32px rgba(29, 78, 216, .18));\n}\n\n.hero-image-wrap::after {\n  content: \"\";\n  position: absolute;\n  left: 14%;\n  right: 9%;\n  bottom: 7px;\n  z-index: -1;\n  height: 26px;\n  border-radius: 50%;\n  background: rgba(28, 69, 140, .16);\n  filter: blur(12px);\n}\n\n.hero-laptop-image {\n  display: block;\n  width: 100%;\n  height: auto;\n  object-fit: contain;\n}\n\n.stat-card {\n  width: 136px;\n  padding: 18px 18px;\n  border-radius: 13px;\n  background: rgba(255,255,255,.94);\n  box-shadow: 0 22px 42px rgba(23, 51, 111, .12);\n}\n.stat-card i { font-size: 27px; }\n.stat-card strong { font-size: 28px; }\n.stat-card span { font-size: 13px; }\n.stat-card--left { left: 2px; top: 8px; }\n.stat-card--right { right: 22px; top: 138px; }\n.orbit--one { right: 56px; top: 24px; width: 228px; height: 228px; }\n.orbit--two { left: 46px; bottom: 30px; }\n.shape--triangle { left: -42px; top: 98px; }\n.shape--arrow { right: -10px; top: 74px; }\n\n.training-panel {\n  padding: 34px 36px 26px;\n  background: rgba(255,255,255,.92);\n}\n\n.training-toolbar {\n  display: grid;\n  grid-template-columns: 280px minmax(0, 1fr);\n  gap: 18px;\n  align-items: center;\n  margin-bottom: 34px;\n}\n\n.category-shell { display: grid; grid-template-columns: 42px minmax(0, 1fr) 42px; gap: 10px; min-width: 0; }\n.category-arrow { display: inline-grid; width: 42px; height: 42px; place-items: center; border: 1px solid #d8e3f8; border-radius: 9px; color: #071747; background: #fff; cursor: pointer; box-shadow: 0 10px 22px rgba(24, 50, 100, .06); transition: .22s ease; }\n.category-arrow:hover { color: #fff; border-color: #075eff; background: #075eff; transform: translateY(-1px); }\n.category-list { padding: 0 2px; }\n.category-pill { min-width: max-content; height: 46px; padding: 0 19px; border-radius: 10px; box-shadow: 0 10px 22px rgba(24, 50, 100, .04); }\n.search-field input { height: 46px; border-radius: 10px; box-shadow: 0 10px 22px rgba(24, 50, 100, .04); }\n\n.training-grid { gap: 16px 20px; }\n.training-card { grid-template-columns: 116px minmax(0, 1fr); min-height: 222px; padding: 16px 16px 14px 14px; border-radius: 13px; }\n.training-card__media { width: 116px; min-width: 116px; height: 174px; min-height: 174px; align-self: start; border-radius: 10px; font-size: 60px; background: radial-gradient(ellipse 92px 34px at 28% 88%, rgba(255,255,255,.46) 0 58%, transparent 59%), radial-gradient(ellipse 100px 38px at 74% 92%, rgba(255,255,255,.34) 0 58%, transparent 59%), linear-gradient(145deg, color-mix(in srgb, var(--theme), #ffffff 8%), color-mix(in srgb, var(--theme), #001d6e 28%)); }\n.training-card__media::before, .training-card__media::after { content: \"\"; position: absolute; left: -18px; right: -18px; bottom: -16px; height: 62px; border-radius: 50% 50% 0 0; background: rgba(255,255,255,.22); }\n.training-card__media::after { left: 18px; right: -34px; bottom: -28px; height: 72px; background: rgba(255,255,255,.34); }\n.training-card__media i { position: relative; z-index: 1; }\n.training-card__content { padding-left: 22px; }\n.training-card h3 { min-height: 54px; margin: 8px 0 9px; font-size: 24px; line-height: 1.08; }\n.training-card p { min-height: 54px; margin-bottom: 13px; }\n.training-card__actions { grid-template-columns: minmax(0, .95fr) minmax(0, 1.08fr) minmax(0, .98fr); gap: 12px; }\n.card-btn { min-height: 40px; padding: 10px 12px; gap: 9px; font-size: 13px; border-radius: 8px; }\n\n@media (max-width: 1500px) {\n  .hero-content { padding-inline: 70px; }\n  .hero-copy, .hero-features { max-width: 620px; }\n  #training-hero-title { font-size: clamp(45px, 3.65vw, 56px); }\n  .hero-image-wrap { right: 44px; width: min(470px, 82%); }\n  .stat-card--right { right: 10px; }\n  .hero-feature { grid-template-columns: 44px minmax(0, 1fr); padding-inline: 10px; }\n  .hero-feature i { width: 44px; height: 44px; flex-basis: 44px; }\n  .hero-feature strong { font-size: 9.5px; }\n  .hero-feature span { font-size: 8.5px; }\n  .training-card h3 { font-size: 23px; }\n}\n\n@media (max-width: 1280px) {\n  .training-toolbar { grid-template-columns: 1fr; }\n  .hero-shell, .hero-content { min-height: auto; }\n  .hero-content { grid-template-columns: 1fr; padding: 30px; align-items: center; }\n  .hero-copy, #training-hero-title, .hero-copy p { max-width: 100%; }\n  .hero-image-wrap { right: 50%; bottom: -26px; width: min(430px, 80%); transform: translateX(50%); }\n  .hero-content::before { right: 50%; top: auto; bottom: -70px; transform: translateX(50%); }\n  .hero-features { grid-template-columns: repeat(2, minmax(180px, 1fr)); max-width: 560px; overflow: visible; row-gap: 14px; }\n  .hero-feature strong { font-size: 11px; }\n  .hero-feature span { font-size: 10.5px; }\n}\n\n@media (max-width: 860px) {\n  .demo-training { padding: 0; }\n  .hero-content { padding: 26px 18px 20px; }\n  #training-hero-title { font-size: clamp(40px, 8vw, 48px); }\n  .hero-visual { min-height: 330px; overflow: hidden; }\n  .hero-image-wrap { bottom: -10px; width: min(360px, 88%); }\n  .stat-card--left { left: 0; top: 12px; }\n  .stat-card--right { right: 0; top: 120px; }\n  .hero-features { grid-template-columns: 1fr; max-width: 100%; }\n  .hero-feature { grid-template-columns: 52px minmax(0, 1fr); padding-inline: 0; }\n  .hero-feature i { width: 52px; height: 52px; }\n  .hero-feature strong, .hero-feature span { font-size: 11px; white-space: normal; }\n  .training-panel { padding: 24px 16px; }\n  .training-card { grid-template-columns: 104px minmax(0, 1fr); }\n  .training-card__media { width: 104px; min-width: 104px; height: 160px; min-height: 160px; font-size: 52px; }\n  .training-card h3 { min-height: 0; font-size: 22px; }\n  .training-card__actions { grid-template-columns: repeat(2, minmax(0, 1fr)); }\n  .card-btn--test { grid-column: 1 / -1; }\n}\n\n@media (max-width: 560px) {\n  .category-shell { grid-template-columns: 38px minmax(0, 1fr) 38px; gap: 8px; }\n  .category-arrow { width: 38px; height: 42px; }\n  #training-hero-title { font-size: 40px; line-height: 1.04; }\n  .hero-image-wrap { width: min(320px, 92%); }\n  .training-card { grid-template-columns: 1fr; }\n  .training-card__media { width: 100%; min-width: 0; height: 148px; min-height: 148px; }\n  .training-card__actions { grid-template-columns: 1fr; }\n  .card-btn--test { grid-column: auto; }\n}\r\n"] }]
    }], null, { categoryScroller: [{
            type: ViewChild,
            args: ['categoryScroller']
        }] }); })();
//# sourceMappingURL=demo.component.js.map