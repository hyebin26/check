import React, { useRef } from "react";
import { useState, useEffect } from "react";
import ClubDataType from "../../../types/clubDataType";
import getClubData from "../../../api/getClubData";
import styled from "@emotion/styled";
import ClubList from "../ClubList/ClubList";

export default function ClubContent() {
  const [clubData, setClubData] = useState<ClubDataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const lastElementRef = useRef(null);
  const CURRENTMAXDATA = 7;

  const onHandleClubData = async () => {
    const clubData = await getClubData();
    const currentPageClubDataLength = currentPage * CURRENTMAXDATA;
    setIsLoading(false);
    setClubData(clubData.slice(0, currentPageClubDataLength));
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
    onHandleClubData();
  }, [currentPage]);
  return (
    <>
      {!isLoading && (
        <StyledClubContainer>
          <h2>모든 클럽보기</h2>
          <StyledClubWrapper>
            {clubData.map((item, idx) => (
              <ClubList clubData={item} key={idx} />
            ))}
          </StyledClubWrapper>
          <div ref={lastElementRef}></div>
        </StyledClubContainer>
      )}
    </>
  );
}

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
