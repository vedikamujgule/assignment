export enum Status {
  Uploaded = "Uploaded",
  Connected = "Connected",
  Failed = "Failed",
}
export type Datasource = {
  datasource: string;
  type: string;
  status: string;
  createdBy: string;
  createdAt: Date;
};
