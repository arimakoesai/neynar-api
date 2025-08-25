import { Configuration, NeynarAPIClient } from "@neynar/nodejs-sdk";

export default async function handler(req, res) {
  const { address } = req.query;

  if (!address) {
    return res.status(400).json({ error: "Query param ?address= wajib diisi" });
  }

  try {
    const client = new NeynarAPIClient(
      new Configuration({ apiKey: process.env.NEYNAR_API_KEY })
    );

    const response = await client.fetchBulkUsersByEthOrSolAddress({
      addresses: [address],
      address_types: ["verified_address"],
    });

    res.status(200).json(response);
  } catch (err) {
    console.error("Error fetch Neynar:", err.response?.data || err.message);
    res.status(500).json({ error: "Gagal fetch dari Neynar" });
  }
}
