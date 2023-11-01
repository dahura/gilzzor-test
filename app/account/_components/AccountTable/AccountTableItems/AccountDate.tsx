import { useAccount } from "@/app/account/hooks/useAccount";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { FC } from "react";

interface AccountDateProps {
  itemId: number;
  date: dayjs.Dayjs;
  name: string;
}

const dateFormat = "DD/MM/YYYY";
export const AccountDate: FC<AccountDateProps> = ({ itemId, date, name }) => {
  const { editItemIndex, setEditableItem } = useAccount();
  const isEdit = editItemIndex === itemId;

  console.log(dayjs(date).format(dateFormat));
  return isEdit ? (
    <DatePicker
      defaultValue={dayjs("2023/10/31")}
      format={dateFormat}
      value={dayjs(date)}
      name={name}
      onSelect={(e) => setEditableItem({ [name]: e.toDate() })}
    />
  ) : (
    <a>{dayjs(date).format(dateFormat)}</a>
  );
};
