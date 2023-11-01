import { useAccount } from "@/app/account/hooks/useAccount";
import { InputNumber } from "antd";
import { FC, ReactNode } from "react";

interface AccountInputNumberProps {
  itemId: number;
  defaultValue: number;
  children: ReactNode;
  name: string;
}

export const AccountInputNumber: FC<AccountInputNumberProps> = ({
  itemId,
  defaultValue,
  children,
  name,
}) => {
  const { editItemIndex, setEditableItem } = useAccount();
  const isEdit = itemId === editItemIndex;

  const handleKeyDown = (e: any) => {
    const isValidChar = /^\d+$/.test(e.key) || e.key === "Backspace";
    if (!isValidChar) {
      e.preventDefault();
    }
  };

  return isEdit ? (
    <InputNumber
      min={Number.NEGATIVE_INFINITY}
      max={Number.POSITIVE_INFINITY}
      defaultValue={defaultValue}
      name={name}
      onKeyDown={handleKeyDown}
      onChange={(e) => setEditableItem({ [name]: e })}
    />
  ) : (
    children
  );
};
