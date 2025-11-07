export interface TimeEntry {
  id: number;
  workspace_id: number;
  project_id: number;
  task_id: number | null;
  billable: boolean;
  start: string;
  stop: string | null;
  duration: number;
  description: string;
  tags: string[];
  tag_ids: number[];
  duronly: boolean;
  at: string;
  server_deleted_at: string | null;
  user_id: number;
  uid: number;
  wid: number;
  pid: number;
  client_name: string;
  project_name: string;
  project_color: string;
  project_active: boolean;
  project_billable: boolean;
  user_name: string;
  user_avatar_url: string;
}

export interface TimeEntrySummary {
  totalDuration: number;
  entries: TimeEntry[];
  formattedTotal: string;
}

