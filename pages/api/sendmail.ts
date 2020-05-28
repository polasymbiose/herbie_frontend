import fetch from "node-fetch";
import { NextApiRequest, NextApiResponse } from "next";
import { host } from "../../src/helper/fetch";

// @ts-ignore
module.exports = async (req: NextApiRequest, res: NextApiResponse) => {

  const raw = JSON.stringify({
    ...req.body,
    to: 'info@herbie-unverpackt.de'
  })

  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: raw,
    redirect: 'follow' as RequestRedirect
  }

  try {
    const response = await fetch(`${host()}/sendmail`, options)
    console.log('response', response)
    res.status(200).json({foo: 'bar'})
    if (!response.ok) throw new Error('error postRequest')
    return
  } catch (error) {
    return error
  }
};



// now dns add <DOMAIN> <SUBDOMAIN> <A | AAAA | ALIAS | CNAME | TXT>  <VALUE>