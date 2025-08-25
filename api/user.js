import { Configuration, NeynarAPIClient } from "@neynar/nodejs-sdk";

export default async function handler(req, res) {
  const { username, fid, address } = req.query;

  if (!username && !fid && !address) {
    return res.status(400).json({
      error:
        "Harap isi salah satu query param: ?username= atau ?fid= atau ?address=",
    });
  }

  try {
    const client = new NeynarAPIClient(
      new Configuration({ apiKey: process.env.NEYNAR_API_KEY })
    );

    let response;

    if (username) {
      response = await client.lookupUserByUsername(username);
    } else if (fid) {
      response = await client.fetchUser(fid);
    } else if (address) {
      response = await client.fetchBulkUsersByEthOrSolAddress({
        addresses: [address],
        address_types: ["verified_address"],
      });
    }

    res.status(200).json(response);
  } catch (err) {
    console.error("Error fetch Neynar:", err);
    res.status(500).json({ error: "Gagal fetch dari Neynar" });
  }
}
