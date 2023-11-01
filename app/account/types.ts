import dayjs from "dayjs";

export interface DataType {
  key: number;
  date: dayjs.Dayjs;
  amount: number;
  type: "income" | "expenses";
  note: string;
  isInitial?: boolean;
}
