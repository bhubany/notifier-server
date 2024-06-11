import { ObjectId, UpdateQuery } from "mongoose";
import * as repository from "../repository/outbox.repository";
import { OUTBOX_JOB_TYPE, OUTBOX_TASK_STATUS } from "../utils/constants";
import { Outbox } from "./../schemas/outbox.schema";
import * as notificationService from "./notification.service";

export async function save(
  data: Object,
  taskType: OUTBOX_JOB_TYPE
): Promise<Outbox> {
  return repository.save(data, taskType);
}

async function findPendingWithLimit(limit = 50): Promise<Outbox[]> {
  return repository.findAllWithLimit(
    { status: OUTBOX_TASK_STATUS.PENDING, retries: { $lte: 3 } },
    limit
  );
}

export async function updateStatus(
  status: OUTBOX_TASK_STATUS,
  __id: ObjectId
): Promise<void> {
  const updateQuery: UpdateQuery<Outbox> = {
    $set: { status },
  };

  if (status === OUTBOX_TASK_STATUS.FAILED) {
    updateQuery.$inc = { retries: 1 };
  }

  repository.updateStatus({ __id: __id }, { $set: { status: status } });
}

export async function processTask() {
  let tasks: Outbox[] = await findPendingWithLimit();
  for (let task of tasks) {
    let res = await notificationService.send(task);
    if (res) {
      console.log(`${task.taskType} sent sucessfully`);
      await updateStatus(OUTBOX_TASK_STATUS.COMPLETED, task.__id);
    } else {
      console.log(`Failed to send ${task.taskType} for task id: ${task.__id}`);
      await updateStatus(OUTBOX_TASK_STATUS.FAILED, task.__id);
    }
  }
}
