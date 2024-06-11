import { executeThirdPartyApi } from "../utils";

const url = String(process.env.WEBHOOK_URL);

export async function send(messaeg: string) {
  let body = JSON.stringify({ text: messaeg });
  return await executeThirdPartyApi(url, body);
}
