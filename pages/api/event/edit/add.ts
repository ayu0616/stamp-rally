// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import getSpotPositions from "functions/getSpotPositions";
import type { NextApiRequest, NextApiResponse } from "next";
import { ReqType, Spot } from "../types";

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
        fetch(url, {
            method: "POST",
            body: JSON.stringify(reqDataWithPos),
        }).then((r) => {
            try {
                r.json().then((j) => {
                    res.status(200).json(reqDataWithPos);
                });
            } catch {
                r.text().then((t) => {
                    res.status(400).json({ result: t });
                });
            }
        });
        // res.end()
    } else {
        res.status(500).json({ result: "SPREADSHEET_URL に不具合があります" });
    }
}
