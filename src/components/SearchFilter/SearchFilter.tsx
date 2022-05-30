import React from "react";
import styled from "@emotion/styled";
import SearchFilterList from "../SearchFilterList/SearchFilterList";

type SearchFilterType = {
  title: string;
  active: boolean;
  content: { contentId: number; filterTitle: string; info?: string }[];
  filter: string;
  onClickFilterShowBtn: (title: string) => void;
  onClickFilterCloseBtn: (title: string) => void;
};

function SearchFilter({
  title,
  active,
  content,
  filter,
  onClickFilterShowBtn,
  onClickFilterCloseBtn,
}: SearchFilterType) {
  const clickFilterShowBtn = () => {
    onClickFilterShowBtn(title);
  };

  const clickFilterCloseBtn = () => {
    onClickFilterCloseBtn(title);
  };

  return (
    <StyledSearchFilterWrapper>
      <button className="searchFillterShowBtn" onClick={clickFilterShowBtn}>
        {title}
      </button>
      <StyledSearchFilterListContainer active={active}>
        <button className="searchFilterCancelBtn" onClick={clickFilterCloseBtn}>
          X
        </button>
        <ul className="searchFilterListWrapper">
          {content.map((item) => (
            <SearchFilterList
              key={item.contentId}
              filterTitle={item.filterTitle}
              info={item.info}
              filter={filter}
            />
          ))}
        </ul>
      </StyledSearchFilterListContainer>
    </StyledSearchFilterWrapper>
  );
}

const StyledSearchFilterListContainer = styled.div<{ active: boolean }>`
  display: ${(props) => !props.active && "none"};
  position: absolute;
  width: 300px;
  top: 36px;
  padding: 1rem;
  left: 0;
  background: white;
  box-shadow: rgb(0 0 0 / 16%) 0px 4px 10px;
  z-index: 999;
  .searchFilterCancelBtn {
    color: black;
    position: absolute;
    background: rgb(247, 247, 245);
    padding: 0.4rem;
    margin-left: 0.5rem;
    border-radius: 5px;
    font-size: 11px;
    right: 8px;
    top: 8px;
  }
`;

const StyledSearchFilterWrapper = styled.div`
  margin-right: 15px;
  .searchFillterShowBtn {
    padding: 6px 10px;
    color: ${({ theme }) => theme.color.main};
    font-weight: 600;
    border: 1px solid ${({ theme }) => theme.color.main};
    border-radius: 3px;
    font-size: 14px;
    background: inherit;
  }
`;

export default SearchFilter;
