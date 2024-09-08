import { useState, useEffect, useRef } from "react";
import { ArrowUpRight } from "@/icons";

interface DropdownProps {
  title: string;
  items: {
    name: string;
    href: string;
  }[];
  outlined?: boolean;
}

const Dropdown = ({ outlined = true, title, items }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        id="dropdownDividerButton"
        onClick={() => setIsOpen(!isOpen)}
        className={`${
          !outlined
            ? "bg-green hover:bg-dark-green"
            : "bg-transparent text-dark-green border-dark-green border-[1px] hover:border-green hover:text-green"
        }   focus:ring-transparent focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-[14px] lg:text-sm px-[12px] lg:px-[28px] py-[8px] text-center inline-flex items-center`}
        type="button"
      >
        {title}
        <svg
          className="w-2.5 h-2.5 ms-3 "
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          id="dropdownDivider"
          style={{ transform: "translateX(-50%)" }}
          className="z-10 w-[190px] bg-white divide-y divide-gray-100 rounded-lg shadow absolute mt-2 left-[70%] tablet:left-[50%]"
        >
          <ul
            className="py-2 text-sm text-gray-700 "
            aria-labelledby="dropdownDividerButton"
          >
            {items?.map((item, index) => (
              <li key={index} onClick={() => setIsOpen(false)}>
                <a
                  target="_blank"
                  href={item.href}
                  rel="noreferrer noopener"
                  className="px-3 py-2 hover:bg-gray-100 flex items-center gap-2"
                >
                  {item.name}
                  <ArrowUpRight />
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
