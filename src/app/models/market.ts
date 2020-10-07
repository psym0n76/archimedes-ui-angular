export interface Market {
    name: string;
    interval: number;
    timeFrame: string;
    active: boolean;
    minDate: Date;
    maxDate: Date;
    lastUpdated: Date;
    timeFrameInterval: string;
    brokerTimeMinInterval: string;
    brokerTimeInterval: string;
    quantity: number;
  }
