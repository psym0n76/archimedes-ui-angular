export interface Candle
{
    market: string;
    granularity: string;
    bidOpen: number;
    bidHigh: number;
    bidLow: number;
    bidClose: number;

    askOpen: number;
    askHigh: number;
    askLow: number;
    askClose: number;

    tickQty: number;
    timestamp: Date;
}
