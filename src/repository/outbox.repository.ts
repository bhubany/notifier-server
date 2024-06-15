import { FilterQuery, UpdateQuery } from "mongoose";
import OutboxModel, { Outbox } from "../schemas/outbox.schema";
import { OUTBOX_JOB_TYPE, OUTBOX_TASK_STATUS } from "../utils/constants";

export interface TaskRequest {
  data: object;
  taskType: OUTBOX_JOB_TYPE;
  status: OUTBOX_TASK_STATUS;
}

export async function saveAll(request: TaskRequest[]) {
  return OutboxModel.insertMany(request);
}

export async function save(request: TaskRequest) {
  const outbox = new OutboxModel(request);
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
