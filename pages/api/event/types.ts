export type Spot = {
    name: string;
    latitude: number;
    longitude: number;
    prefecture: string;
    city: string;
    /**acceptableRadiusはメートル単位で指定 */
    acceptableRadius: number;
    stamp: {
        stamped: boolean;
        timestamp: string | null;
    };
};

export type Event = {
    eventName: string;
    spots: Spot[];
};

export type ReqType = "add" | "edit";
