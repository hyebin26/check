import React, { useState } from "react";
import styled from "@emotion/styled";
import { useSearchParams } from "react-router-dom";

type FilterListType = {
  info?: string;
  filterTitle: string;
  filter: string;
};

export default function SearchFilterList({
  filterTitle,
  info,
  filter,
}: FilterListType) {
  const [isActive, setIsActive] = useState(false);
  let [searchParams, setSearchParams] = useSearchParams();

  const onClickCheckBox = () => {
    const currentIsActive = !isActive;
    const isHasFilter = searchParams.has(filter);
    if (currentIsActive) {
      if (isHasFilter) {
        const currentParams = searchParams.get(filter);
        const addCurrentParams = currentParams + "%" + filterTitle;
        searchParams.delete(filter);
        searchParams.append(filter, addCurrentParams);
      }
      if (!isHasFilter) {
        searchParams.append(filter, `%${filterTitle}`);
      }
    }
    if (!currentIsActive) {
      const currentParams = searchParams.get(filter);
      const hello = currentParams?.replace(`%${filterTitle}`, "");
      searchParams.delete(filter);
      searchParams.append(filter, hello as string);
    }
    setIsActive(currentIsActive);
    setSearchParams(searchParams);
  };

  return (
    <StyledFilterList>
      <div>
        <input type="checkbox" id="check" />
        <StyledInputLabel
          htmlFor="check"
          isActive={isActive}
          onClick={onClickCheckBox}
        >
          <img src="check.svg" alt="check" />
        </StyledInputLabel>
      </div>
      <div>
        <p className="filterTitle">{filterTitle}</p>
        <p className="filterInfo">{info}</p>
      </div>
    </StyledFilterList>
  );
}

const StyledFilterList = styled.li`
  display: flex;
  margin-bottom: 10px;
  font-size: 20px;
  .filterInfo {
    font-size: 12px;
    color: ${({ theme }) => theme.color.grey};
  }
  .filterTitle {
    font-size: 16px;
  }
  input[type="checkbox"] {
    display: none;
  }
`;

const StyledInputLabel = styled.label<{ isActive: boolean }>`
  width: 13px;
  height: 13px;
  cursor: pointer;
  display: flex;
  border-radius: 2px;
  margin-right: 10px;
  margin-top: 6px;
  justify-content: center;
  align-items: center;
  background: ${(props) =>
    props.isActive ? props.theme.color.main : "rgb(202, 202, 200)"};
  img {
    filter: invert(100%) sepia(100%) saturate(2%) hue-rotate(291deg)
      brightness(106%) contrast(101%);
    width: 9px;
  }
`;
