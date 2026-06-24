import { getFacilityData } from "../services/cmsApiService.js";

async function requestFacilityData(req, res, next) {
  const { ccn } = req.params;

  try {
    const facility = await getFacilityData(ccn);

    // Response: {"status": 200, data: [...]}
    return res.status(200).json({ data: facility });
  } catch (err) {
    // Send to error handling middleware
    next(err);
  }
}

export default requestFacilityData;
