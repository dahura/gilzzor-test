import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { DataType } from "../types";
import { useEffect, useMemo } from "react";
import dayjs from "dayjs";

interface AccountStore {
  items: DataType[];
  currentEditableItem: DataType;
  editItemIndex: number | null;
  totalAmount: number | null;
  setEdit: (id: number | null) => void;
  setInitialItems: (items: DataType[]) => void;
  setTotalAmmount: (items: DataType[]) => void;
  deleteItem: (key: DataType["key"]) => void;
  addNewRow: () => void;
  editItem: (key: DataType["key"], item: DataType) => void;
  setEditableItem: (item: Partial<DataType>) => void;
}

const initialEditableItem: DataType = {
  amount: 0,
  date: dayjs("2023/10/31"),
  key: 0,
  note: "",
  type: "expenses",
};

export const calculateTotal = (items: AccountStore["items"]) => {
  return items.reduce(
    (total, item) =>
      total + (item.type === "income" ? item.amount : -item.amount),
    0
  );
};

export const useAccountStore = create<AccountStore>()(
  persist(
    (set, get) => {
      return {
        items: [],
        editItemIndex: -1,
        totalAmount: null,

        currentEditableItem: initialEditableItem,
        setEdit: (index) =>
          set({
            editItemIndex: index,
          }),
        setInitialItems: (items) => set({ items }),
        setTotalAmmount: (items) => set({ totalAmount: calculateTotal(items) }),
        setEditableItem: (item) =>
          set({
            currentEditableItem: { ...get().currentEditableItem, ...item },
          }),
        addNewRow: () => {
          const itemKey = get().items.length + 1;
          set({
            items: [
              ...get().items,
              { ...initialEditableItem, key: itemKey, isInitial: true },
            ],
            editItemIndex: itemKey,
            currentEditableItem: {
              ...initialEditableItem,
              key: itemKey,
              isInitial: true,
            },
          });
        },
        editItem: (key, newItem) => {
          const updatedItems = [...get().items];
          const index = updatedItems.findIndex((item) => item.key === key);

          if (index !== -1) {
            updatedItems[index] = {
              ...newItem,
              isInitial: false,
            };
            set({ items: updatedItems });
          }
        },

        deleteItem: (key) =>
          set({ items: get().items.filter((item) => item.key !== key) }),
      };
    },
    { name: "account", storage: createJSONStorage(() => localStorage) }
  )
);

export const useAccount = () => {
  const { setTotalAmmount, setInitialItems, items, ...store } =
    useAccountStore();

  useEffect(() => {
    setTotalAmmount(items);
  }, [items, setInitialItems, setTotalAmmount]);
  return useMemo(() => ({ ...store, items }), [items, store]);
};
