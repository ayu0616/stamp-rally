export type Spot = {
    name: string;
    latitude: number;
    longitude: number;
    /**acceptableRadiusはメートル単位で指定 */
    acceptableRadius: number;
    stamped: boolean;
};

export type Event = {
    eventName: string;
    spots: Spot[];
};

export type ReqType = "add" | "edit";
