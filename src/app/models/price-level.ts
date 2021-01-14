export interface PriceLevel
{
    id: number;
    market: string;
    granularity: string;

    active: boolean;
    outsideRange: boolean;
    outsideRangeDate: Date;

    levelsBroken : number
    levelBroken: boolean;
    levelBrokenDate: boolean;

    levelExpired: boolean;
    levelExpiredDate: boolean;

    candlesElapsedLevelBroken: number;
    tradeType: string;
    trade: string;

    buySell: string;
    candleType: string;
    timeStamp: Date;
    strategy: string;

    bidPrice: number;
    bidPriceRange: number;

    askPrice: number;
    askPriceRange: number;

    lastUpdated: Date;
}
