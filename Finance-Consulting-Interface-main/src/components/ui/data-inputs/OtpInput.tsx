import { cn } from "@/utils/helpers";
import React, { MutableRefObject, RefObject, createRef, useMemo, useRef } from "react";

type OtpInputProps = {
  numberOfInputs: number;
  onChangeText: (text: string) => void;
  otp: string;
  containerClassname?: string;
  inputClassname?: string;
  disableInputs?: boolean;
};
export const OtpInput = ({
  numberOfInputs = 5,
  onChangeText,
  otp,
  containerClassname,
  inputClassname,
  disableInputs,
}: OtpInputProps) => {
  const ref: MutableRefObject<RefObject<HTMLInputElement>[]> = useRef(
    Array(numberOfInputs)
      .fill(null)
      .map(() => createRef<HTMLInputElement>())
  );

  const regex = useMemo(() => {
    return new RegExp(/^\d+$/);
  }, []);

  const focusToNextInput = (target: HTMLElement) => {
    const nextElementSibling =
      target.nextElementSibling as HTMLInputElement | null;

    if (nextElementSibling) {
      nextElementSibling.focus();
    }
  };
  const focusToPrevInput = (target: HTMLElement) => {
    const previousElementSibling =
      target.previousElementSibling as HTMLInputElement | null;

    if (previousElementSibling) {
      previousElementSibling.focus();
    }
  };

  const inputOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;
    const target = e.target as HTMLInputElement;
    const targetValue = target.value;

    if (key === "ArrowRight" || key === "ArrowDown") {
      e.preventDefault();
      return focusToNextInput(target);
    }

    if (key === "ArrowLeft" || key === "ArrowUp") {
      e.preventDefault();
      return focusToPrevInput(target);
    }

    if (e.key !== "Backspace" || target.value !== "") {
      return;
    }

    target.setSelectionRange(0, targetValue.length);
    focusToPrevInput(target);
  };

  const inputOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const { target } = e;

    target.setSelectionRange(0, target.value.length);
  };

  const otpItems = useMemo(() => {
    const otpArray = otp.split("");
    const items: Array<string> = [];

    for (let i = 0; i < numberOfInputs; i++) {
      const char = otpArray[i];

      if (regex.test(char)) {
        items.push(char);
      } else {
        items.push("");
      }
    }

    return items;
  }, [otp, numberOfInputs, regex]);

  const handleOnChangeText = (
    e: React.ChangeEvent<HTMLInputElement>,
    i: number
  ) => {
    const target = e.target;
    let targetValue = target.value.trim();
    const isTargetValueDigit = regex.test(targetValue);

    if (!isTargetValueDigit && targetValue !== "") {
      return;
    }

    targetValue = isTargetValueDigit ? targetValue : " ";

    const targetValueLength = targetValue.length;

    if (targetValueLength === 1) {
      const newValue = otp.substring(0, i) + targetValue + otp.substring(i + 1);

      onChangeText(newValue);

      if (!isTargetValueDigit) {
        return;
      }

      focusToNextInput(target);
    } else if (targetValueLength === numberOfInputs) {
      onChangeText(targetValue);

      target.blur();
    }
  };

  return (
    <div
      className={cn(
        "mb-5 mt-5 flex h-[auto] w-full select-none items-center justify-center gap-3 max-[440px]:flex-wrap",
        containerClassname
      )}
    >
      {otpItems?.map((_, i) => {
        return (
          <input
            disabled={disableInputs}
            inputMode="numeric"
            pattern="\d{1}"
            value={_}
            key={i}
            ref={ref.current[i]}
            // onKeyUp={(e) => handleKeyUp(e.key, i)}
            onKeyDown={inputOnKeyDown}
            onChange={(e) => handleOnChangeText(e, i)}
            onFocus={inputOnFocus}
            maxLength={1}
            className={cn(
              "font-500  h-[70px] w-[80px] select-none rounded-[10px] border-[2px] border-[#E9E9E9] bg-inherit text-center text-lg text-[#232323] selection:bg-transparent lg:text-[30px]",
              otpItems[i] !== "" && "border-[#232323]",
              inputClassname
            )}
          />
        );
      })}
    </div>
  );
};
