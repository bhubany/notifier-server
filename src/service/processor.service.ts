import { config } from "dotenv";
import * as outboxService from "./outbox.service";
config();

const SUPRESS_NOTIFICATION = process.env.SUPRESS_NOTIFICATION;
const INTERVAL_MS = Number(process.env.TASK_INTERVAL_MS);
let processing = false;
let saving = false;

export function start() {
  console.log("Background task processor started");

  const intervalId = setInterval(() => {
    if (SUPRESS_NOTIFICATION && SUPRESS_NOTIFICATION == "true") {
      console.log(
        `SUPRESS_NOTIFICATION is set to : ${SUPRESS_NOTIFICATION} . So supressing all the notification process`
      );
    } else {
      // outboxService.s
      outboxService.processTask();
    }
  }, INTERVAL_MS);

  process.on("SIGINT", () => {
    clearInterval(intervalId);
    console.log("Background task processor stopped.");
    process.exit();
  });
}
