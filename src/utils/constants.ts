export enum OUTBOX_TASK_STATUS {
  PENDING = "Pending",
  PROCESSING = "Processing",
  COMPLETED = "Completed",
  FAILED = "Failed",
}

export enum OUTBOX_JOB_TYPE {
  EMAIL_NOTIFICATION = "Email Notification",
  SLACK_NOTIFICATION = "Slack Notification",
}
