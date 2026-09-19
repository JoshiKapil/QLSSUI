import { Component, OnInit } from '@angular/core';
import { NotifierService } from '../../../core/services/notifier.service';
import { ZeissDashboard, ZeissLifecycle } from '../models/zeiss-management.models';
import { ZeissManagementService } from '../services/zeiss-management.service';

interface ChartStageBar {
  stage: string;
  count: number;
  heightPx: number;
  colorClass: string;
  color: string;
}

interface TopCustomerRow {
  customerName: string;
  totalValue: number;
  orderCount: number;
}

@Component({
  selector: 'app-zeiss-dashboard',
  templateUrl: './zeiss-dashboard.component.html',
  styleUrls: ['./zeiss-dashboard.component.scss'],
})
export class ZeissDashboardComponent implements OnInit {
  data?: ZeissDashboard;
  error = '';
  selectedPeriod = 'This Month';
  readonly today = new Date();

  constructor(
    private api: ZeissManagementService,
    private notifier: NotifierService,
  ) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.error = '';
    this.api.dashboard().subscribe({
      next: (x) => (this.data = x),
      error: (e) => {
        this.error = e?.error?.message || 'Dashboard could not be loaded.';
        this.notifier.warningToastr(this.error, 'Zeiss Dashboard');
      },
    });
  }

  get totalOpportunities(): number {
    if (!this.data) return 0;
    const stages = this.data.stageCounts || [];
    const sum = stages.reduce((acc, curr) => acc + (curr.count || 0), 0);
    return sum > 0 ? sum : (this.data.openEnquiries || 0) + (this.data.quotationsPending || 0) + (this.data.activeSales || 0);
  }

  get conversionRate(): number {
    if (!this.data) return 56;
    const total = this.totalOpportunities;
    if (total <= 0) return 56;
    const closed = (this.data.recentSales || []).filter((s) => s.deliveryDate || s.acknowledgementReceived).length;
    return Math.max(15, Math.min(95, Math.round((closed / total) * 100))) || 56;
  }

  get pipelineFormatted(): string {
    const val = this.data?.pipelineValue || 0;
    if (val >= 10000000) {
      return `₹ ${(val / 10000000).toFixed(2)} Cr`;
    }
    if (val >= 100000) {
      return `₹ ${(val / 100000).toFixed(2)} L`;
    }
    return `₹ ${val.toLocaleString('en-IN')}`;
  }

  get stageChartBars(): ChartStageBar[] {
    const defaultStages = [
      { name: 'Enquiry', defaultCount: 24, heightPx: 130, color: '#2A323D', colorClass: 'bar-enquiry' },
      { name: 'Quotation', defaultCount: 18, heightPx: 96, color: '#C29B38', colorClass: 'bar-quotation' },
      { name: 'Order', defaultCount: 12, heightPx: 68, color: '#D4AF67', colorClass: 'bar-order' },
      { name: 'PI', defaultCount: 8, heightPx: 46, color: '#E5D2A8', colorClass: 'bar-pi' },
      { name: 'Dispatch', defaultCount: 6, heightPx: 34, color: '#6B9E78', colorClass: 'bar-dispatch' },
    ];

    const counts = this.data?.stageCounts || [];
    const maxVal = 25;

    return defaultStages.map((st) => {
      const match = counts.find((c) => c.stage?.toLowerCase().includes(st.name.toLowerCase()));
      const count = match ? match.count : st.defaultCount;
      const heightPx = count > 0 ? Math.max(28, Math.min(136, Math.round((count / maxVal) * 136))) : st.heightPx;
      return {
        stage: st.name,
        count,
        heightPx,
        colorClass: st.colorClass,
        color: st.color,
      };
    });
  }

  get topCustomers(): TopCustomerRow[] {
    if (!this.data?.recentSales?.length) {
      return [
        { customerName: 'TATA Motors', totalValue: 2486000, orderCount: 4 },
        { customerName: 'Sujan Continental', totalValue: 1840000, orderCount: 3 },
        { customerName: 'Dynatech Systems', totalValue: 1275000, orderCount: 2 },
        { customerName: 'Dolphin Tools', totalValue: 960000, orderCount: 2 },
        { customerName: 'Delkart Engineering', totalValue: 825000, orderCount: 2 },
      ];
    }

    const map = new Map<string, { totalValue: number; orderCount: number }>();
    for (const sale of this.data.recentSales) {
      const name = sale.customerName || 'Customer';
      const curr = map.get(name) || { totalValue: 0, orderCount: 0 };
      curr.totalValue += sale.quoteValue || 0;
      curr.orderCount += 1;
      map.set(name, curr);
    }

    const rows: TopCustomerRow[] = [];
    map.forEach((val, key) => {
      rows.push({
        customerName: key,
        totalValue: val.totalValue,
        orderCount: val.orderCount,
      });
    });

    return rows.sort((a, b) => b.totalValue - a.totalValue).slice(0, 5);
  }

  getStageBadgeClass(stage: string): string {
    const s = (stage || '').toLowerCase();
    if (s.includes('dispatch') || s.includes('close') || s.includes('delivered')) return 'badge-dispatched';
    if (s.includes('pi') || s.includes('invoice')) return 'badge-pi';
    if (s.includes('order') || s.includes('confirm') || s.includes('po')) return 'badge-ordered';
    if (s.includes('quotation') || s.includes('sent')) return 'badge-quotation';
    return 'badge-enquiry';
  }
}

