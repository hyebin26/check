import React, { FormEvent, useState } from "react";
import SearchFilter from "../../../components/SearchFilter/SearchFilter";
import styled from "@emotion/styled";
import { useSearchParams } from "react-router-dom";
import { useRef } from "react";
import filterCategory from "../../../assets/data/filterCategory";

function Search() {
  const [activedFilterCategory, setActivedFilterCategory] = useState([
    {
      id: 0,
      active: false,
    },
    {
      id: 1,
      active: false,
    },
  ]);

  const [searchParams, setSearchParams] = useSearchParams();
  const searchRef = useRef<HTMLInputElement | null>(null);

  const onClickFilterShowBtn = (id: number) => {
    const filteredFilterCategory = activedFilterCategory.map((item) => {
      if (item.id === id && !item.active) {
        return { ...item, active: true };
      }
      if (item.active) {
        return { ...item, active: false };
      }
      return item;
    });
    setActivedFilterCategory(filteredFilterCategory);
  };

  const onSubmitSearchForm = (event: FormEvent) => {
    event.preventDefault();
    if (searchParams.get("searchKeyword")) {
      searchParams.delete("searchKeyword");
      searchParams.append("searchKeyword", searchRef.current!.value);
    }
    if (!searchParams.get("searchKeyword")) {
      searchParams.append("searchKeyword", searchRef.current!.value);
    }
    setSearchParams(searchParams);
  };

  const onClickFilterCloseBtn = (id: number) => {
    const filteredFilterCategory = activedFilterCategory.map((item) => {
      if (item.id === id) {
        return { ...item, active: false };
      }
      return item;
    });
    setActivedFilterCategory(filteredFilterCategory);
  };

  const onClickInitializationBtn = () => {
    for (let filter of Array.from(searchParams.keys())) {
      searchParams.delete(filter);
    }
    setActivedFilterCategory((prev) => {
      return prev.map((item) => {
        if (item.active) {
          return { ...item, active: false };
        }
        return item;
      });
    });
    setSearchParams(searchParams);
  };

  return (
    <StyledSearchContainer>
      <div>
        <h2>TREVARI</h2>
      </div>
      <div className="searchContainer">
        <button
          className="searchInitializationBtn"
          onClick={onClickInitializationBtn}
        >
          ?????????
        </button>
        <div className="searchFilterContainer">
          {filterCategory.map((item) => (
            <SearchFilter
              key={item.id}
              id={item.id}
              active={activedFilterCategory[item.id].active}
              title={item.title}
              content={item.content}
              filter={item.filter}
              onClickFilterShowBtn={onClickFilterShowBtn}
              onClickFilterCloseBtn={onClickFilterCloseBtn}
            />
          ))}
        </div>
        <form className="searchForm" onSubmit={onSubmitSearchForm}>
          <button>
            <img src="search.svg" alt="search" />
          </button>
          <input type="text" placeholder="????????? ???????????????." ref={searchRef} />
        </form>
      </div>
    </StyledSearchContainer>
  );
}

const StyledSearchContainer = styled.section`
  padding: 1rem 2rem;
  width: ${({ theme }) => theme.size.xLarge};
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .searchContainer {
    display: flex;
    align-items: center;
    .searchInitializationBtn {
      margin-right: 10px;
      text-decoration: underline;
      font-weight: 550;
    }
  }
  .searchForm {
    width: 284px;
    height: 40px;
    position: relative;
    button {
      width: 17px;
      height: 17px;
      position: absolute;
      top: 11px;
      left: 10px;
      img {
        filter: invert(97%) sepia(0%) saturate(129%) hue-rotate(153deg)
          brightness(88%) contrast(86%);
      }
    }
    input {
      background: rgb(247, 247, 245);
      width: 100%;
      padding: 12px;
      padding-left: 33px;
      border-radius: 15px;
      font-size: 14px;
      font-weight: 550;
    }
    input::placeholder {
      color: rgb(203, 204, 201);
      font-size: 14px;
    }
  }
  .searchFilterContainer {
    display: flex;
    position: relative;
  }
`;

export default Search;
