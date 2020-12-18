export interface IEvent {
  name: string;
  createTime: string;
  updateTime?: string;
  deleteTime?: string | null;
  createBy: string;
  startTime: string;
  endTime: string;
  appointment: {
    lead: string;
    appointmentType: string;
    payment: boolean;
    subject: string;
  };
  day?: number;
}
