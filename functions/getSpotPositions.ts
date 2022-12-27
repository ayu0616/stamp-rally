import { Client } from "@googlemaps/google-maps-services-js";
import { Spot } from "pages/api/event/types";

export default async function getSpotPositions(spots: string[]) {
    const key = process.env.GOOGLE_API_KEY;
    if (!key) {
        throw Error("APIキーが設定されていません");
    }
    const client = new Client({});
    const data: Spot[] = [];
    for (let spot of spots) {
        const args = {
            params: {
                key: key,
                address: spot,
            },
        };
        const res = await client.geocode(args);
        data.push({
            name: spot,
            latitude: res.data.results[0].geometry.location.lat,
            longitude: res.data.results[0].geometry.location.lng,
            prefecture: "",
            city: "",
            acceptableRadius: 50,
            stamped: false,
        });
    }
    return data;
}
