"use client";

import { Button, Table } from "antd";
import { columns } from "./columns";
import { useAccount } from "../../hooks/useAccount";
import { AccountTableFooter } from "./AccountTableFooter";

export const AccoutTable = () => {
  const { items, addNewRow, currentEditableItem: newItem } = useAccount();

  return (
    <main className="space-y-2">
      <Button className="primary" onClick={addNewRow}>
        Add New
      </Button>
      <Table
        columns={columns}
        dataSource={items}
        footer={() => <AccountTableFooter />}
      />
    </main>
  );
};
