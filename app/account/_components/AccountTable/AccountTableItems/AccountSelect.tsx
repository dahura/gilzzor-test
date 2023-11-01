import { useAccount } from "@/app/account/hooks/useAccount";
import { Select } from "antd";
import { FC, ReactNode } from "react";

interface AccountSelectProps {
  itemId: number;
  type: string;
  options: { value: string; label: string }[];
  children: ReactNode;
  name: string;
}
export const AccountSelect: FC<AccountSelectProps> = ({
  itemId,
  options,
  type,
  children,
  name,
}) => {
  const { editItemIndex, setEditableItem } = useAccount();
  const isEdit = itemId === editItemIndex;

  return isEdit ? (
    <Select
      data-name={name}
      options={options}
      className="w-full"
      defaultValue={type}
      onChange={(e) => setEditableItem({ [name]: e })}
    />
  ) : (
    <>{children}</>
  );
};
