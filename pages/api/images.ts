import fetch from "node-fetch";
import { parse } from "url";
import { NextApiRequest, NextApiResponse } from "next";
module.exports = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { url }
  } = parse(req.url || "", true);
  const r = await fetch(
    // we get images from notion, but you could get them from AWS etc.
    `http://localhost:1337${url as string}`,
    {
      headers: {
        "content-type": "image/jpeg",
        // maybe an auth header
      }
    }
  );
  res.setHeader("content-type", r.headers.get("content-type"));
  res.setHeader("cache-control", "s-maxage=1, stale-while-revalidate");
  r.body.pipe(res);
};

