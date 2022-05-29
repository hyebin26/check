import React, { FormEvent, useState } from "react";
import SearchFilter from "../../../components/SearchFilter/SearchFilter";
import styled from "@emotion/styled";
import { useSearchParams } from "react-router-dom";
import { useRef } from "react";

function Search() {
  const [filterCategory, setFilterCategory] = useState([
    {
      id: 0,
      title: "장소",
      active: false,
      filter: "placeFilter",
      content: [
        { contentId: 0, filterTitle: "강남 아지트" },
        { contentId: 1, filterTitle: "안국 아지트" },
        { contentId: 2, filterTitle: "온라인" },
        { contentId: 3, filterTitle: "롯데백화점 잠실점" },
      ],
    },
    {
      id: 1,
      title: "클럽유형",
      filter: "typeFilter",
      active: false,
      content: [
        {
          contentId: 0,
          filterTitle: "클럽장 클럽",
          info: "해당 분야의 전문가인 클럽장님이 함께 읽을 책을 선정하고 대화를 이끌어 나갑니다.",
        },
        {
          contentId: 1,
          filterTitle: "함께 만드는 클럽",
          info: "클럽장님의 강연으로 구성된 세션을 함께 듣습니다.",
        },
      ],
    },
  ]);

  const searchRef = useRef<HTMLInputElement | null>(null);
  let [searchParams, setSearchParams] = useSearchParams();

  const onClickFilterShowBtn = (title: string) => {
    const filteredFilterCategory = filterCategory.map((item) => {
      if (item.title === title && !item.active) {
        return { ...item, active: true };
      }
      if (item.active) {
        return { ...item, active: false };
      }
      return item;
    });
    setFilterCategory(filteredFilterCategory);
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

  const onClickFilterCloseBtn = (title: string) => {
    const filteredFilterCategory = filterCategory.map((item) => {
      if (item.title === title) {
        return { ...item, active: false };
      }
      return item;
    });
    setFilterCategory(filteredFilterCategory);
  };
  const onClickInitializationBtn = () => {
    for (let filter of Array.from(searchParams.keys())) {
      searchParams.delete(filter);
    }
    setFilterCategory((prev) => {
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
          초기화
        </button>
        <div className="searchFilterContainer">
          {filterCategory.map((item) => (
            <SearchFilter
              key={item.id}
              active={item.active}
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
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            ref={searchRef}
          />
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
