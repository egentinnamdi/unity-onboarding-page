import { cn } from "@/utils/helpers";
import { CSSProperties, ChangeEvent } from "react";

type CheckboxProps = {
  label: string;
  labelClassName?: string;
  checkboxClassname?: string;
  checkboxStyle?: CSSProperties;
  readOnly?: boolean;
  checked?: boolean;
  handleChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const Checkbox = ({
  label,
  labelClassName,
  checkboxClassname,
  checkboxStyle,
  readOnly,
  checked = false,
  handleChange,
}: CheckboxProps) => {
  return (
    <div className={"flex h-[45px] items-center gap-2"}>
      <div className="form-control">
        <label className="label flex h-[45px] cursor-pointer items-center gap-2">
          <input
            onChange={
              typeof handleChange === "function"
                ? handleChange
                : () => console.log("Change!")
            }
            type="checkbox"
            className={cn(
              "checkbox",
              readOnly ? "opacity-[.5]" : "opacity-[1]",
              checkboxClassname,
            )}
            style={{ ...checkboxStyle }}
            readOnly={readOnly}
            name={label}
            checked={checked}
          />
          <span className={cn("text-md font-medium", labelClassName)}>{label}</span>
        </label>
      </div>
    </div>
  );
};
