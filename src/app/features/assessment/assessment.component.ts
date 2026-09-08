import { Component, OnInit } from '@angular/core';
import { NotifierService } from '../../core/services/notifier.service';
import { GharAssessmentSaveRequest, GharAssessmentTab } from './assessment.models';
import { AssessmentPdfService } from './services/assessment-pdf.service';
import { GharAssessmentService } from './services/ghar-assessment.service';

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.scss'],
})
export class AssessmentComponent implements OnInit {
  readonly comingSoon = false;
  readonly ratingStars = [1, 2, 3, 4, 5];
  readonly frequencyOptions = ['Monthly', 'Quarterly', 'Bi-Annually', 'Annually'];
  readonly riskLevels = ['Low', 'Medium', 'High'];
  readonly actionStatuses = ['Pending', 'In Progress', 'Completed', 'On Hold'];
  readonly months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

  readonly tabs: GharAssessmentTab[] = [
    { code: 'WEEKLY_5S', shortTitle: 'Weekly 5S', title: 'Ghar 9001: Weekly 5S Family Patrol', icon: 'fa-list-check' },
    {
      code: 'PM_MATRIX',
      shortTitle: 'PM Matrix',
      title: 'Ghar 9001: Household Preventive Maintenance (PM) Matrix',
      icon: 'fa-screwdriver-wrench',
    },
    {
      code: 'FMR',
      shortTitle: 'Family Review',
      title: 'Ghar 9001: Family Management Review (FMR)',
      icon: 'fa-people-roof',
    },
    {
      code: 'CAPA_FMEA',
      shortTitle: 'CAPA / FMEA',
      title: 'Ghar 9001: Quick-Response Corrective Action (CAPA) / FMEA',
      icon: 'fa-shield-halved',
    },
    {
      code: 'EHS',
      shortTitle: 'Safety & EHS',
      title: 'Ghar 9001: Safety and Environment (EHS)',
      icon: 'fa-person-circle-check',
    },
    {
      code: 'MUDA',
      shortTitle: '8 Wastes',
      title: 'Ghar 9001: Lean 8 Wastes (MUDA) Household Assessment',
      icon: 'fa-recycle',
    },
    { code: 'KPI', shortTitle: 'Monthly KPI', title: 'Ghar 9001: Monthly Family KPI Dashboard', icon: 'fa-chart-line' },
  ];

  activeTab = 'WEEKLY_5S';
  isSaving = false;
  lastSavedEntryNo = '';
  private readonly clientReferences: { [key: string]: string } = {};

  tab1: any = {};
  tab2: any = {};
  tab3: any = {};
  tab4: any = {};
  tab5: any = {};
  tab6: any = {};
  tab7: any = {};

  constructor(
    private readonly assessmentService: GharAssessmentService,
    private readonly pdfService: AssessmentPdfService,
    private readonly notifier: NotifierService,
  ) {}

  ngOnInit(): void {
    this.initializeForms();
  }

  selectTab(code: string): void {
    this.activeTab = code;
    this.lastSavedEntryNo = '';
  }

  setRating(row: any, score: number): void {
    row.score = score;
  }

  addFmrAction(): void {
    this.tab3.actionItems.push({ actionItem: '', responsibility: '', targetDate: '', status: 'Pending' });
  }

  removeFmrAction(index: number): void {
    if (this.tab3.actionItems.length > 1) this.tab3.actionItems.splice(index, 1);
  }

  addCapaRow(): void {
    this.tab4.rows.push({ failureMode: '', rootCause: '', impact: '', preventiveAction: '' });
  }

  removeCapaRow(index: number): void {
    if (this.tab4.rows.length > 1) this.tab4.rows.splice(index, 1);
  }

  updateKpiStatus(row: any, monthIndex: number): void {
    const actual = this.toNumber(row.actual[monthIndex]);
    const target = this.toNumber(row.targetValue);
    if (actual === null || target === null) {
      row.status[monthIndex] = '';
      return;
    }

    if (actual === target) {
      row.status[monthIndex] = 'Yellow';
      return;
    }

    const comparison = row.comparison || '<';
    const isGreen = comparison === '>' ? actual > target : actual < target;
    row.status[monthIndex] = isGreen ? 'Green' : 'Red';
  }

  updateAllKpiStatuses(row: any): void {
    for (let index = 0; index < 12; index += 1) this.updateKpiStatus(row, index);
  }

  hasKpiCorrectiveAction(row: any): boolean {
    return row.status.some((status: string) => status === 'Yellow' || status === 'Red');
  }

  statusClass(status: string): string {
    return status ? `status-${status.toLowerCase()}` : 'status-empty';
  }

  saveCurrent(downloadAfterSave: boolean): void {
    if (this.isSaving) return;

    this.refreshKpiStatuses();
    const currentTab = this.tabs.find((tab) => tab.code === this.activeTab);
    if (!currentTab) return;

    const data = this.getCurrentData();
    const meta = this.getCurrentMeta();
    const request: GharAssessmentSaveRequest = {
      clientReference: this.getClientReference(this.activeTab),
      tabCode: currentTab.code,
      tabTitle: currentTab.title,
      formDate: meta.formDate || null,
      displayName: meta.displayName || null,
      referenceText: meta.referenceText || null,
      payloadJson: JSON.stringify(data),
    };

    this.isSaving = true;
    this.assessmentService.save(request).subscribe({
      next: async (result) => {
        this.lastSavedEntryNo = result.entryNo;
        this.notifier.successToastr(`${currentTab.shortTitle} saved successfully as ${result.entryNo}.`);
        if (downloadAfterSave) {
          try {
            await this.pdfService.download(currentTab.title, data, result.entryNo);
          } catch (pdfError) {
            console.error('[Assessment] PDF generation failed.', pdfError);
            this.notifier.warningToastr(
              'The assessment was saved, but the PDF could not be generated. You can download it later from Admin Entries.',
            );
          }
        }
      },
      error: (error) => {
        this.isSaving = false;
        this.notifier.warningToastr(error?.error?.message || error?.message || 'Assessment could not be saved.');
      },
      complete: () => (this.isSaving = false),
    });
  }

  async downloadBlankFormat(): Promise<void> {
    const currentTab = this.tabs.find((tab) => tab.code === this.activeTab);
    if (!currentTab) return;
    try {
      await this.pdfService.downloadBlank(currentTab.title, this.getCurrentData());
      this.notifier.successToastr(`${currentTab.shortTitle} blank printable format downloaded.`);
    } catch (error) {
      console.error('[Assessment] Blank PDF generation failed.', error);
      this.notifier.warningToastr('The blank printable assessment could not be generated.');
    }
  }

  private initializeForms(): void {
    const today = this.today();
    const year = new Date().getFullYear();

    this.tab1 = {
      date: today,
      areaAudited: '',
      leadAuditor: '',
      areaOwner: '',
      criteria: [
        {
          pillar: '1. Sort (Seiri)',
          checkpoint:
            'Are there any unused clothes, old mail, or unnecessary items cluttering the space that need to be donated or discarded?',
          score: 1,
          remarks: '',
        },
        {
          pillar: '2. Set in Order (Seiton)',
          checkpoint:
            'Does every item have a designated "home"? Are frequently used items easily accessible without searching?',
          score: 1,
          remarks: '',
        },
        {
          pillar: '3. Shine (Seiso)',
          checkpoint: 'Are the floors, surfaces, and appliances clean, safe, and in good working condition?',
          score: 1,
          remarks: '',
        },
        {
          pillar: '4. Standardize (Seiketsu)',
          checkpoint:
            'Are visual labels, color codes, or household rules being followed? Is the daily chore chart respected?',
          score: 1,
          remarks: '',
        },
        {
          pillar: '5. Sustain (Shitsuke)',
          checkpoint: 'Is the space being maintained naturally, without the need for constant reminders or arguments?',
          score: 1,
          remarks: '',
        },
      ],
      topIssue: '',
      proposedSolution: '',
    };

    this.tab2 = {
      year,
      familyPmLead: '',
      objective: 'To achieve Zero Breakdowns and Zero Accidents through planned, proactive household care.',
      rows: [
        this.pmRow(
          'Health & Safety',
          'Kitchen Fire Extinguisher',
          'Check pressure gauge (must be in the green zone) and expiry date.',
          'Monthly',
        ),
        this.pmRow(
          'Health & Safety',
          'First-Aid Kit',
          'Discard expired medicines; replenish bandages and ointments.',
          'Quarterly',
        ),
        this.pmRow(
          'Health & Safety',
          'LPG / Gas Pipeline',
          'Inspect rubber tubing for cracks, stiffness, or leaks.',
          'Quarterly',
        ),
        this.pmRow(
          'Health & Safety',
          'Main Electrical Panel',
          'Check for tripped breakers, loose wires, or burning smells. Test ELCB/MCB.',
          'Bi-Annually',
        ),
        this.pmRow(
          'Water & Plumbing',
          'RO Water Purifier',
          'Replace sediment/carbon filters and check TDS levels.',
          'Bi-Annually',
        ),
        this.pmRow(
          'Water & Plumbing',
          'Overhead/Underground Tanks',
          'Deep clean and sanitize water storage tanks.',
          'Bi-Annually',
        ),
        this.pmRow(
          'Water & Plumbing',
          'Bathroom & Sink Drains',
          'Prevent clogs by clearing hair/debris and flushing with hot water.',
          'Monthly',
        ),
        this.pmRow(
          'HVAC & Appliances',
          'Air Conditioner (AC)',
          'Clean indoor dust filters. Schedule professional deep service before summer.',
          'Quarterly',
        ),
        this.pmRow(
          'HVAC & Appliances',
          'Washing Machine',
          'Run a drum-clean cycle with descaler to remove hard-water buildup.',
          'Monthly',
        ),
        this.pmRow(
          'HVAC & Appliances',
          'Refrigerator',
          'Clean back coils for energy efficiency; check door gasket seals.',
          'Bi-Annually',
        ),
        this.pmRow(
          'Vehicles & Admin',
          'Two-Wheeler / Car',
          'Check tire pressure, engine oil, and coolant levels.',
          'Monthly',
        ),
        this.pmRow(
          'Vehicles & Admin',
          'Vehicle Compliance',
          'Renew Motor Insurance and valid PUC (Pollution Under Control) certificate.',
          'Annually',
        ),
        this.pmRow(
          'Vehicles & Admin',
          'Pest Control',
          'Schedule professional treatment to prevent infestations.',
          'Annually',
        ),
      ],
    };

    this.tab3 = {
      dateTime: '',
      location: '',
      chairperson: '',
      attendees: '',
      previousActionsCompleted: 'Yes',
      pendingItems: '',
      contextChanges: '',
      financialHealthNotes: '',
      healthWellnessNotes: '',
      operations5sNotes: '',
      resourceAdequacyNotes: '',
      familySatisfactionNotes: '',
      kaizenIdea: '',
      upcomingPlan: '',
      actionItems: [
        { actionItem: 'Remove old medicines', responsibility: 'Pravin', targetDate: '', status: 'Pending' },
        { actionItem: 'Fix wardrobe hinge', responsibility: 'Anuja / Kids', targetDate: '', status: 'Pending' },
      ],
      signatureChairperson: '',
      signatureFamilyMembers: '',
    };

    this.tab4 = {
      date: today,
      facilitator: '',
      objective:
        'Move away from blaming individuals for mistakes and instead focus on fixing the process so the problem never happens again.',
      rows: [{ failureMode: '', rootCause: '', impact: '', preventiveAction: '' }],
    };

    this.tab5 = {
      date: today,
      safetyOfficer: '',
      rows: [
        this.ehsRow(
          'Kitchen (Fire & Cuts)',
          'LPG Cylinder & Stove',
          'Are burners clean (blue flame, not red)? Is the rubber tube free of cracks?',
          'High',
        ),
        this.ehsRow(
          'Kitchen (Fire & Cuts)',
          'Sharp Objects',
          'Are knives stored safely in a block or drawer, away from counter edges?',
          'Medium',
        ),
        this.ehsRow(
          'Kitchen (Fire & Cuts)',
          'Process Control',
          'Is anyone leaving cooking unattended (e.g., milk boiling over)?',
          'High',
        ),
        this.ehsRow(
          'Electrical (Shock & Fire)',
          'Overloading',
          'Are any spike guards overloaded with multiple heavy-draw appliances?',
          'High',
        ),
        this.ehsRow(
          'Electrical (Shock & Fire)',
          'Water & Electricity',
          'Are wet hands strictly prohibited when operating switches, irons, or the washing machine?',
          'High',
        ),
        this.ehsRow(
          'Electrical (Shock & Fire)',
          'Cables',
          'Are all charging cables intact with no exposed wires or taped joints?',
          'Medium',
        ),
        this.ehsRow(
          'Bathroom (Slips & Suffocation)',
          'Gas Geyser (Confined Space)',
          'Is the bathroom exhaust fan working? Is there adequate ventilation?',
          'High',
        ),
        this.ehsRow(
          'Bathroom (Slips & Suffocation)',
          'Slip Hazard',
          'Are bathroom mats anti-slip? Is standing water cleared immediately?',
          'Medium',
        ),
        this.ehsRow(
          'Environment (Aspect/Impact)',
          'Waste Segregation',
          'Is wet waste (food) and dry waste (plastic/paper) strictly separated in different bins?',
          'Low',
        ),
        this.ehsRow(
          'Environment (Aspect/Impact)',
          'Water Conservation',
          'Are there any leaking taps? Is water turned off while brushing teeth?',
          'Low',
        ),
      ],
    };

    this.tab6 = {
      processBeingAssessed: '',
      rows: [
        this.mudaRow(
          'D - Defects',
          'Mistakes that require rework (e.g., burning the toast, forgetting a textbook, washing clothes on the wrong setting).',
        ),
        this.mudaRow(
          'O - Overproduction',
          'Making more than needed (e.g., cooking too much food that goes bad, buying excess groceries that expire).',
        ),
        this.mudaRow(
          'W - Waiting',
          'Idle time (e.g., waiting for the bathroom to be free, waiting for clothes to dry to iron them, waiting for the geyser).',
        ),
        this.mudaRow(
          'N - Non-Utilized Talent',
          'Not sharing the load (e.g., Mom doing everything while kids/Dad are capable of helping but are not assigned tasks).',
        ),
        this.mudaRow(
          'T - Transportation',
          'Unnecessary movement of things (e.g., carrying laundry back and forth across the house multiple times).',
        ),
        this.mudaRow(
          'I - Inventory',
          'Piling up things (e.g., the infamous chair of clothes, expired medicines, hoarding plastic bags).',
        ),
        this.mudaRow(
          'M - Motion',
          'Unnecessary movement of people (e.g., walking across the kitchen 10 times to get spices because they are not near the stove).',
        ),
        this.mudaRow(
          'E - Extra-Processing',
          'Doing more work than adds value (e.g., ironing bedsheets, striving for a perfectly round roti instead of just cooking it).',
        ),
      ],
    };

    this.tab7 = {
      monthYear: this.currentMonth(),
      reviewedBy: '',
      rows: [
        this.kpiRow('Financial Health', 'Total Household Expenses', 'Stay under budget', '<'),
        this.kpiRow('Financial Health', 'Utility Bills (Electricity / Gas)', 'Set maximum units / cylinders', '<'),
        this.kpiRow('Financial Health', 'Unplanned / Impulse Purchases', 'Maximum 2 per month', '<', 2),
        this.kpiRow('Health & Safety (EHS)', 'Health Issues / Sick Days', '0 Sick Days', '<', 0),
        this.kpiRow('Health & Safety (EHS)', 'Safety Incidents (Near-misses)', '0 (No cuts, burns, trips)', '<', 0),
        this.kpiRow('Operations (TPM & 5S)', 'Junk Food / Outside Meals', 'Maximum 3 times/month', '<', 3),
        this.kpiRow('Operations (TPM & 5S)', 'Equipment Breakdowns', '0 Unplanned repairs', '<', 0),
        this.kpiRow('Operations (TPM & 5S)', 'Weekly 5S Patrol Average Score', '> 4.0 out of 5.0', '>', 4),
        this.kpiRow('Operations (TPM & 5S)', 'Pending Maintenance Tasks', '0 tasks carried over', '<', 0),
        this.kpiRow('Family Dynamics & Joy', 'Guests Hosted (Social Capital)', '1 to 2 Visits', '>', 1),
        this.kpiRow('Family Dynamics & Joy', 'Dedicated Family Time (Unplugged)', '> 10 Hours/month', '>', 10),
        this.kpiRow('Family Dynamics & Joy', 'Kaizen Ideas Submitted (Kids)', 'Minimum 1 new idea', '>', 1),
      ],
    };
  }

  private pmRow(category: string, equipment: string, actionRequired: string, frequency: string): any {
    return { category, equipment, actionRequired, frequency, lastChecked: '', nextDue: '', responsibility: '' };
  }

  private ehsRow(zone: string, hazard: string, checkpoint: string, riskLevel: string): any {
    return { zone, hazard, checkpoint, riskLevel, control: '' };
  }

  private mudaRow(waste: string, translation: string): any {
    return { waste, translation, observedWaste: '', kaizenIdea: '', riskLevel: 'Low' };
  }

  private kpiRow(
    category: string,
    indicator: string,
    targetStandard: string,
    comparison: string,
    targetValue: number | null = null,
  ): any {
    return {
      category,
      indicator,
      targetStandard,
      comparison,
      targetValue,
      actual: new Array(12).fill(null),
      status: new Array(12).fill(''),
      correctiveAction: '',
    };
  }

  private refreshKpiStatuses(): void {
    if (this.activeTab !== 'KPI') return;
    this.tab7.rows.forEach((row: any) => this.updateAllKpiStatuses(row));
  }

  private getCurrentData(): any {
    const map: any = {
      WEEKLY_5S: this.tab1,
      PM_MATRIX: this.tab2,
      FMR: this.tab3,
      CAPA_FMEA: this.tab4,
      EHS: this.tab5,
      MUDA: this.tab6,
      KPI: this.tab7,
    };
    return map[this.activeTab];
  }

  private getCurrentMeta(): { formDate?: string; displayName?: string; referenceText?: string } {
    switch (this.activeTab) {
      case 'WEEKLY_5S':
        return { formDate: this.tab1.date, displayName: this.tab1.leadAuditor, referenceText: this.tab1.areaAudited };
      case 'PM_MATRIX':
        return {
          formDate: `${this.tab2.year}-01-01`,
          displayName: this.tab2.familyPmLead,
          referenceText: `Year ${this.tab2.year}`,
        };
      case 'FMR':
        return {
          formDate: this.tab3.dateTime ? String(this.tab3.dateTime).slice(0, 10) : '',
          displayName: this.tab3.chairperson,
          referenceText: this.tab3.location,
        };
      case 'CAPA_FMEA':
        return {
          formDate: this.tab4.date,
          displayName: this.tab4.facilitator,
          referenceText: 'Corrective Action / FMEA',
        };
      case 'EHS':
        return {
          formDate: this.tab5.date,
          displayName: this.tab5.safetyOfficer,
          referenceText: 'Household EHS / HIRA Audit',
        };
      case 'MUDA':
        return { displayName: '', referenceText: this.tab6.processBeingAssessed };
      case 'KPI':
        return {
          formDate: this.tab7.monthYear ? `${this.tab7.monthYear}-01` : '',
          displayName: this.tab7.reviewedBy,
          referenceText: this.tab7.monthYear,
        };
      default:
        return {};
    }
  }

  private getClientReference(tabCode: string): string {
    if (!this.clientReferences[tabCode]) this.clientReferences[tabCode] = this.newGuid();
    return this.clientReferences[tabCode];
  }

  private newGuid(): string {
    const cryptoApi: any = window.crypto as any;
    if (cryptoApi && typeof cryptoApi.randomUUID === 'function') return cryptoApi.randomUUID();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
      const random = (Math.random() * 16) | 0;
      const value = char === 'x' ? random : (random & 0x3) | 0x8;
      return value.toString(16);
    });
  }

  private toNumber(value: any): number | null {
    if (value === null || value === undefined || value === '') return null;
    const number = Number(value);
    return Number.isFinite(number) ? number : null;
  }

  private today(): string {
    const date = new Date();
    const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return local.toISOString().slice(0, 10);
  }

  private currentMonth(): string {
    return this.today().slice(0, 7);
  }
}
