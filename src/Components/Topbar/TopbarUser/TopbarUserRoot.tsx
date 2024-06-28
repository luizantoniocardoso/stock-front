import React from "react";
import { TEDropdown, TEDropdownMenu, TEDropdownToggle } from "tw-elements-react";
import { DropdownItemProps } from "tw-elements-react/dist/types/components/Dropdown/DropdownItem/types";

interface TopbarUserProps {
  user: string;
  children: React.ReactElement<DropdownItemProps> | React.ReactElement<DropdownItemProps>[];
  name: string;
  empresa: string;
}

export const TopbarUserRoot = ({ user, children, name, empresa }: TopbarUserProps) => {
  return (
    <TEDropdown className="flex justify-end min-w-[33%]">
      <TEDropdownToggle className="flex items-center whitespace-nowrap rounded bg-backgroundVar-DEFAULT px-8 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-backgroundVar-600 focus:bg-backgroundVar-600 focus:outline-none focus:ring-0 active:bg-backgroundVar-700 motion-reduce:transition-none">
        <div className="flex items-center">
          <div className="mr-4">
            <p className="text-sm font-semibold text-textVar-600">{name}</p>
            <p className="text-xs text-left text-textVar-700">{empresa}</p>
          </div>
          <img src={user} alt="user" className="w-12 rounded-full" />
        </div>
      </TEDropdownToggle>
      <TEDropdownMenu>
        {children}
      </TEDropdownMenu>
    </TEDropdown>
  );
};
