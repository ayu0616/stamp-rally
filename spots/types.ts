type SpotDataType = {
    name: string;
    latitude: number;
    longitude: number;
    /**acceptableRangeはメートル単位で指定 */
    acceptableRange: number;
}[];

export default SpotDataType;
