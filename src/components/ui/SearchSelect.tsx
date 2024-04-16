import useClickOutside from "@/hooks/useClickOutside";
import { useEffect, useState, useRef } from "react";

type SearchSelectOption = {
  id: number;
  value: string;
};

type SearchSelectProps = {
  selectedValue: string;
  options: SearchSelectOption[];
  onSelect: (id: number) => void;
};

const SearchSelect = ({
  selectedValue,
  options,
  onSelect,
}: SearchSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState<SearchSelectOption[]>(
    []
  );

  const dropdownRef = useRef<HTMLDivElement>(null);

  function toggleOpen() {
    setIsOpen((prev) => !prev);
  }

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
  }

  function handleOnSelect(id: number) {
    toggleOpen();
    onSelect(id);
  }

  useEffect(() => {
    setFilteredOptions(options);
  }, []);

  useEffect(() => {
    const filteredResult = options.filter(({ value }) => {
      return value
        .toLocaleLowerCase()
        .trim()
        .includes(searchTerm.toLocaleLowerCase().trim());
    });

    setFilteredOptions(filteredResult);
  }, [searchTerm, options]);

  useClickOutside(dropdownRef, () => {
    toggleOpen();
    setSearchTerm("");
  });

  return (
    <div className="relative inline-block">
      <div
        className="px-1 border rounded-sm cursor-pointer"
        onClick={toggleOpen}
      >
        {selectedValue ? (
          <span>{selectedValue}</span>
        ) : (
          <span className="text-gray-400">Select...</span>
        )}
        <span className="ml-2">▾</span>
      </div>
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute bg-white border shadow-md z-10 rounded-sm"
        >
          <div className="p-2 pb-2 border-b">
            <input
              autoFocus
              type="search"
              placeholder="Search"
              className="border rounded-md outline-none px-1"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          <ul className="max-h-40 overflow-y-auto">
            {filteredOptions.map(({ id, value }) => (
              <li
                key={id}
                className={`cursor-pointer px-2 hover:bg-slate-100 ${
                  selectedValue === value
                    ? "bg-slate-200 hover:bg-slate-200"
                    : ""
                }`}
                onClick={() => handleOnSelect(id)}
              >
                {value}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchSelect;
