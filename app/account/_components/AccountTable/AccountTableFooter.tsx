import { FC } from "react";
import { useAccount } from "../../hooks/useAccount";
import { SUPPORTED_CURRENCY } from "./constant";
import { cn } from "@/app/_utils/classnames";

export const AccountTableFooter: FC = () => {
  const { totalAmount } = useAccount();
  return (
    <div className="flex space-x-1 font-bold">
      <div>total:</div>
      <div
        className={cn({
          "text-red-600": Number(totalAmount) < 0,
          "text-green-600": Number(totalAmount) > 0,
        })}
      >
        {totalAmount}
        {SUPPORTED_CURRENCY}
      </div>
    </div>
  );
};
