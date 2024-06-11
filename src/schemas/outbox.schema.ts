import mongoose, { ObjectId, Schema } from "mongoose";
import { OUTBOX_JOB_TYPE, OUTBOX_TASK_STATUS } from "../utils/constants";

export interface Outbox extends Document {
  __id: ObjectId;
  data: Record<string, any>;
  taskType: OUTBOX_JOB_TYPE;
  status: string;
  retries: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const outboxSchema = new Schema<Outbox>(
  {
    data: {
      type: Object,
      required: true,
    },
    taskType: {
      type: String,
      enum: OUTBOX_JOB_TYPE,
      required: true,
    },
    status: {
      type: String,
      enum: OUTBOX_TASK_STATUS,
      required: true,
    },
    retries: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
    versionKey: "__v",
    optimisticConcurrency: true,
  }
);

const OutboxModel = mongoose.model<Outbox>("Outbox", outboxSchema);

export default OutboxModel;
