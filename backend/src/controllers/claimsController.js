import { getClaimsData } from "../services/cmsApiService.js";

async function requestClaimsData(req, res, next) {
  const { ccn } = req.params;

  try {
    const claims = await getClaimsData(ccn);

    // Response: {"status": 200, data: [...]}
    return res.status(200).json({ data: claims });
  } catch (err) {
    // Send to error handling middleware
    next(err);
  }
}

export default requestClaimsData;
