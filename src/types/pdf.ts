export interface RecentAudit {
  id: number;
  auditDate: string;
}

export interface ChartData {
  name: string;
  completed: number;
  pending: number;
}

export interface PieData {
  name: string;
  value: number;
}

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export interface PageData {
  totalAudits: number;
  completedAudits: number;
  pendingAudits: number;
  recentAudits: RecentAudit[];
  chartData: ChartData[];
  pieData: PieData[];
  dateRange: DateRange;
}

export interface ApiResponse {
  data: {
    status: string;
    documentUrl: string;
    errorMessage?: string;
  };
  status: number;
}
