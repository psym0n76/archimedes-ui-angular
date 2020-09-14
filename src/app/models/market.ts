export interface Market {
    name: string;
    interval: number;
    timeFrame: string;
    active: boolean;
    maxDate: Date;
    lastUpdated: Date;
    timeFrameInterval: string;
    brokerTimeMinInterval: string;
    brokerTimeInterval: string;
  }
