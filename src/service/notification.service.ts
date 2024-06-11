import { config } from "dotenv";
import { Outbox } from "../schemas/outbox.schema";
import { OUTBOX_JOB_TYPE } from "../utils/constants";
import * as slack from "./slack-notification.service";
config();

export async function send(task: Outbox): Promise<boolean> {
  try {
    switch (task.taskType) {
      case OUTBOX_JOB_TYPE.EMAIL_NOTIFICATION:
        break;

      case OUTBOX_JOB_TYPE.SLACK_NOTIFICATION:
        return (await slack.send(task.data.message)) == "ok";

      default:
        break;
    }
  } catch (error) {
    console.log("Error occured: ", error);
  }
  return false;
}
