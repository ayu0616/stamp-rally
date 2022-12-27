// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import getSpotPositions from "functions/getSpotPositions";
import type { NextApiRequest, NextApiResponse } from "next";
import { Spot } from "../types";

type ReqType = "add" | "edit";

export type ReqData = {
    type: ReqType;
    body: { eventName: string; spots: string[] };
};

export type ReqDataWithPos = {
    type: ReqType;
    body: { eventName: string; spots: Spot[] };
};

type ResData = {};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResData>
) {
    const reqData: ReqData = req.body;
    const spotsWithPos: Spot[] = await getSpotPositions(reqData.body.spots);
    const reqDataWithPos: ReqDataWithPos = {
        type: reqData.type,
        body: {
            eventName: reqData.body.eventName,
            spots: spotsWithPos,
        },
    };

    const url = process.env.SPREADSHEET_URL;
    if (url) {
        const r = await fetch(url, {
            method: "POST",
            body: JSON.stringify(reqDataWithPos),
        }).then((r) => r.json());
        res.status(200).json(reqDataWithPos);
    } else {
        res.status(500).json({ result: "SPREADSHEET_URL に不具合があります" });
    }
}
