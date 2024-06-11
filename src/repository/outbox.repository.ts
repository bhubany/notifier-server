import { FilterQuery, UpdateQuery } from "mongoose";
import OutboxModel, { Outbox } from "../schemas/outbox.schema";
import { OUTBOX_JOB_TYPE, OUTBOX_TASK_STATUS } from "../utils/constants";

export async function save(data: Object, taskType: OUTBOX_JOB_TYPE) {
  const outbox = new OutboxModel({
    data,
    taskType,
    status: OUTBOX_TASK_STATUS.PENDING,
  });
  return await outbox.save();
}

export async function findAllWithLimit(
  outboxFilterQuery: FilterQuery<Outbox>,
  limit: number
): Promise<Outbox[]> {
  return OutboxModel.find(outboxFilterQuery).limit(limit);
}

export async function updateStatus(
  filter: FilterQuery<Outbox>,
  update: UpdateQuery<Outbox>
): Promise<Outbox | null> {
  return OutboxModel.findOneAndUpdate(filter, update, { new: true });
}
