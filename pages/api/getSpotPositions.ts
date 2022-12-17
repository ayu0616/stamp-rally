// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Client } from "@googlemaps/google-maps-services-js";
import type { NextApiRequest, NextApiResponse } from "next";
import SpotDataType from "spots/types";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<SpotDataType>
) {
    const spots: string[] = JSON.parse(req.body);

    const key = process.env.GOOGLE_API_KEY;
    if (!key) {
        throw Error("APIキーが設定されていません");
    }
    const client = new Client({});
    const data: SpotDataType = [];
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
            acceptableRange: 0,
        });
    }
    res.status(200).json(data);
}
