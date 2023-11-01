import { Button, Dropdown, Form, MenuProps } from "antd";
import { FC, useEffect } from "react";
import { useAccount } from "../../hooks/useAccount";

import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

const menuItems: MenuProps["items"] = [
  {
    label: "Edit",
    key: "edit",
  },
  {
    label: "Delete",
    key: "delete",
    danger: true,
  },
];

interface Props {
  itemId: number;
  isInitial: boolean;
}
export const AccountActionMenu: FC<Props> = ({ itemId, isInitial }) => {
  const {
    setEdit,
    editItemIndex,
    currentEditableItem,
    setEditableItem,
    editItem,
    items,
  } = useAccount();
  const { deleteItem } = useAccount();

  useEffect(() => {
    if (itemId === editItemIndex) {
      setEditableItem(items[itemId]);
    }
  }, [editItemIndex, itemId, items, setEditableItem]);

  const isEdit = itemId === editItemIndex;
  const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
    if (key === "delete") {
      deleteItem(itemId);
    }
    if (key === "edit") {
      setEdit(itemId);
    }
  };

  const handleUpdateItem = async () => {
    editItem(itemId, currentEditableItem);
    setEdit(null);
  };

  const handleCancelUpdate = () => {
    setEdit(null);
  };

  return !isEdit ? (
    <Dropdown menu={{ items: menuItems, onClick: handleMenuClick }}>
      <Button className="font-bold flex items-center">&#8942;</Button>
    </Dropdown>
  ) : (
    <div className="flex space-x-1">
      {!isInitial ? (
        <CloseOutlined
          className="text-red-600 cursor-pointer"
          onClick={handleCancelUpdate}
        />
      ) : (
        <CloseOutlined
          className="text-red-600 cursor-pointer"
          onClick={() => deleteItem(itemId)}
        />
      )}

      <CheckOutlined
        className="text-green-600 cursor-pointer"
        onClick={handleUpdateItem}
      />
    </div>
  );
};
