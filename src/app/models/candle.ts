export interface Candle
{
    market: string;
    marketId: number;
    granularity: string;
    dateFrom: Date;
    dateTo: Date;

    bidOpen: number;
    bidHigh: number;
    bidLow: number;
    bidClose: number;

    askOpen: number;
    askHigh: number;
    askLow: number;
    askClose: number;

    tickQty: number;
    timeStamp: Date;
}
