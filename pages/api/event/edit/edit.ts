// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ReqType, Spot } from "../types";

export type ReqData = {
    type: ReqType;
    body: { eventName: string; spots: Spot[] };
};

type ResData = {};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResData>
) {
    const reqData: ReqData = JSON.parse(req.body);

    const url = process.env.SPREADSHEET_URL;
    if (url) {
        const r = await fetch(url, {
            method: "POST",
            body: JSON.stringify(reqData),
        }).then((r) => {
            try {
                return r.json();
            } catch (e) {
                return r.text();
            }
        });
        if (typeof r == "string") {
            res.status(400).json({ result: r });
        } else {
            res.status(200).json({ result: r });
        }
    } else {
        res.status(500).json({ result: "SPREADSHEET_URL に不具合があります" });
    }
}
