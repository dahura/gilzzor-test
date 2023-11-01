import { useAccount } from "@/app/account/hooks/useAccount";
import TextArea from "antd/es/input/TextArea";
import { FC } from "react";

interface AccountProps {
  itemId: number;
  note: string;
  name: string;
}

export const AccountTextArea: FC<AccountProps> = ({ itemId, note, name }) => {
  const { editItemIndex, setEditableItem } = useAccount();
  const isEdit = itemId === editItemIndex;

  return isEdit ? (
    <TextArea
      defaultValue={note}
      name="name"
      onChange={(e) => setEditableItem({ [name]: e.target.value })}
    />
  ) : (
    <div>{note}</div>
  );
};
