import React, { useRef } from "react";
import { useState, useEffect } from "react";
import ClubDataType from "../../../types/clubDataType";
import getClubData from "../../../api/getClubData";
import styled from "@emotion/styled";
import ClubList from "../ClubList/ClubList";
import { useSearchParams } from "react-router-dom";

export default function ClubContent() {
  const [clubData, setClubData] = useState<ClubDataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const lastElementRef = useRef(null);
  const CURRENTMAXDATA = 7;

  const onHandleClubData = async () => {
    const clubData = await getClubData();
    const currentPageClubDataLength = currentPage * CURRENTMAXDATA;
    setClubData(clubData.slice(0, currentPageClubDataLength));
    setIsLoading(false);
  };

  const onFilterClubData = async () => {
    const clubData = await getClubData();
    const searchParamsPlace = searchParams.get("placeFilter");
    const searchParamsName = searchParams.get("searchKeyword");
    const searchParamsType = searchParams.get("typeFilter");
    let filteredClubData: ClubDataType[] = clubData;

    if (searchParamsPlace) {
      const placeSearchParams = searchParamsPlace
        .split("%")
        .filter((item) => item !== "")
        .map((item) =>
          item === "강남 아지트" || item === "안국 아지트"
            ? item.replace(" 아지트", "")
            : item
        );
      filteredClubData = filteredClubData.filter((item) =>
        placeSearchParams.includes(item.club.place)
      );
    }
    if (searchParamsType) {
      const typeSearchParams = searchParamsType
        .split("%")
        .filter((item) => item !== "");
      filteredClubData = filteredClubData.filter((item) =>
        typeSearchParams.includes(item.club.type)
      );
    }
    if (searchParamsName) {
      filteredClubData = filteredClubData.filter((item) =>
        item.club.name.includes(searchParamsName)
      );
    }
    setClubData(filteredClubData.slice(0, currentPage * CURRENTMAXDATA));
    setIsLoading(false);
  };

  useEffect(() => {
    if (isLoading) return;

    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0,
    };
    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        setCurrentPage((prev) => prev + 1);
      }
    }, option);
    if (lastElementRef.current) observer.observe(lastElementRef.current);
  }, [isLoading]);

  useEffect(() => {
    const isExistedSearchParams =
      searchParams.has("placeFilter") ||
      searchParams.has("typeFilter") ||
      searchParams.has("searchKeyword");

    if (isExistedSearchParams) {
      onFilterClubData();
    }
    if (!isExistedSearchParams) {
      onHandleClubData();
    }
  }, [currentPage, searchParams]);

  return (
    <>
      {isLoading && (
        <StyledLoadingContainer>
          <h2>로딩중입니다. 잠시만 기다려주세요!</h2>
        </StyledLoadingContainer>
      )}
      {!isLoading && (
        <StyledClubContainer>
          <h2>모든 클럽보기</h2>
          <StyledClubWrapper>
            {clubData.map((item, idx) => (
              <ClubList clubData={item} key={idx} />
            ))}
            {clubData.length === 0 && <div>정보가 존재하지 않습니다.</div>}
          </StyledClubWrapper>
          <div ref={lastElementRef}></div>
        </StyledClubContainer>
      )}
    </>
  );
}

const StyledLoadingContainer = styled.div`
  text-align: center;
  padding-top: 100px;
`;

const StyledClubWrapper = styled.ul`
  display: grid;
  column-gap: 24px;
  row-gap: 40px;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 20px 0;
`;

const StyledClubContainer = styled.section`
  padding: 1rem 2rem;
  width: ${({ theme }) => theme.size.xLarge};
  margin: 0 auto;
`;
