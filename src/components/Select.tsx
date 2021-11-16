import React, { useCallback, useState } from "react";

export default function Select({
  items,
  value,
  onSelect,
}: {
  items: string[];
  value: string;
  onSelect: (value: string) => void;
}) {
  const [isOpen, setOpen] = useState(false);

  const handleSelectOption = useCallback((value) => {
    onSelect(value);
    setOpen(false);
  }, []);

  return (
    <div>
      <button onClick={() => setOpen(true)}>{value}</button>

      {isOpen &&
        items.map((item) => (
          <p onClick={() => handleSelectOption(item)} key={item}>
            {item}
          </p>
        ))}
    </div>
  );
}
