"use client";
import { Button, Dropdown, MenuProps, Space, Tag, message } from "antd";
import { ColumnsType } from "antd/es/table";
import { DataType } from "../../types";
import { transformDate } from "../../utils/transformDate";
import { SUPPORTED_CURRENCY } from "./constant";
import { AccountActionMenu } from "./AccountActionMenu";
import { AccountDate } from "./AccountTableItems/AccountDate";
import { AccountSelect } from "./AccountTableItems/AccountSelect";
import TextArea from "antd/es/input/TextArea";
import { AccountTextArea } from "./AccountTableItems/AccountTextArea";
import { AccountInputNumber } from "./AccountTableItems/AccountInputNumber";
import FormItem from "antd/es/form/FormItem";
import dayjs from "dayjs";

const date = dayjs("2018-08-08");

export const columns: ColumnsType<DataType> = [
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    render: (_, { date, key }) => (
      <AccountDate date={date} itemId={key} name="date" />
    ),
    sorter: {
      compare: (a, b) =>
        dayjs(a.date).toDate().getTime() - dayjs(a.date).toDate().getTime(),
    },
  },
  {
    title: "Ammount",
    dataIndex: "Ammount",
    key: "ammount",
    sorter: {
      compare: (a, b) => a.type.localeCompare(b.type),
    },
    render: (_, { amount, type, key }) => (
      <AccountInputNumber itemId={key} defaultValue={amount} name="amount">
        <>
          {type === "expenses" ? (
            <div className="text-red-600">
              -{amount}
              {SUPPORTED_CURRENCY}
            </div>
          ) : (
            <div className="text-green-600">
              {amount}
              {SUPPORTED_CURRENCY}
            </div>
          )}
        </>
      </AccountInputNumber>
    ),
  },
  {
    title: "type",
    dataIndex: "type",
    key: "type",
    render: (_, { key, type }) => (
      <AccountSelect
        name="type"
        type={type}
        itemId={key}
        options={[
          { value: "expenses", label: "expenses" },
          { value: "income", label: "income" },
        ]}
      >
        {type}
      </AccountSelect>
    ),
  },
  {
    title: "Note",
    key: "note",
    dataIndex: "note",
    render: (_, { note, key }) => (
      <AccountTextArea itemId={key} note={note} name="note" />
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (_, { key, isInitial }) => (
      <AccountActionMenu itemId={key} isInitial={!!isInitial} />
    ),
  },
];
