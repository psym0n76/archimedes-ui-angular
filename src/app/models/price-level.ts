export interface PriceLevel
{
    market: string;
    granularity: string;
    active: boolean;
    tradeType: string;
    candleType: string;
    timeStamp: Date;
    strategy: string;

    bidPrice: number;
    bidPriceRange: number;

    askPrice: number;
    askPriceRange: number;

    lastUpdated: Date;
}
