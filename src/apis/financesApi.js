import AxiosInstance from "@/utils/axiosInstance";
import { requestHandler } from "@/utils/tools";

async function getAccount() {
  return requestHandler(AxiosInstance.get(`/finances`));
}

export { getAccount };
