export interface Strategy {
    name: string;
    market: string;
    granularity: string;
    active: boolean;
    startDate: Date;
    endDate: Date;
    count: number;
    lastUpdated: Date;
  }
