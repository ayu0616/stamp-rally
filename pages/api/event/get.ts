// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type ResData = {};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResData>
) {
    const url = process.env.SPREADSHEET_URL;
    if (url) {
        const r = await fetch(url).then((r) => r.json());
        res.status(200).json(r);
    } else {
        res.status(500).json({ result: "SPREADSHEET_URL に不具合があります" });
    }
}
