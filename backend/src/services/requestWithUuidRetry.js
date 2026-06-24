import { BadRequest } from "../errors/BadRequest.js";
import { isBadRequest, isInvalidDistributionError } from "./cmsErrors.js";

async function requestWithUuidRetry({
  getUuid,
  fetchUuid,
  request,
  maxRetries = 1,
}) {
  let uuid = getUuid();

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await request(uuid);
    } catch (err) {
      const canRetry = attempt < maxRetries && isInvalidDistributionError(err);

      if (!canRetry) {
        if (isBadRequest) {
          throw new BadRequest("Invalid CMS Request");
        }
        throw err;
      }

      uuid = await fetchUuid();
    }
  }
}

export default requestWithUuidRetry;
