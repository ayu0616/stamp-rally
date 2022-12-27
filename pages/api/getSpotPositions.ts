// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import getSpotPositions from "functions/getSpotPositions";
import type { NextApiRequest, NextApiResponse } from "next";
import { Spot } from "./event/types";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Spot[]>
) {
    const spots: string[] = JSON.parse(req.body);
    const data = await getSpotPositions(spots);
    res.status(200).json(data);
}
