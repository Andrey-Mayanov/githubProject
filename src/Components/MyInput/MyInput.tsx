import React, { useEffect } from "react";
import { Input } from "antd";

type MyInputProps = {
  placeholder: string;
  setIsTyping: Function;
  value: string;
  setValue: Function;
};

const MyInput = ({
  placeholder,
  setIsTyping,
  setValue,
  value,
}: MyInputProps) => {
  const handleOnChange = ({
    target: { value },
  }: {
    target: { value: string };
  }) => {
    setIsTyping(true);
    setValue(value);
  };

  // сомнительный хендлинг остановки печати
  useEffect(() => {
    const timeoutId = setTimeout(() => setIsTyping(false), 1000);
    return () => clearTimeout(timeoutId);
  }, [value, setIsTyping]);

  return (
    <Input onChange={handleOnChange} value={value} placeholder={placeholder} />
  );
};

export default MyInput;
