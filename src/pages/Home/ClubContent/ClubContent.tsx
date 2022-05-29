import React from "react";
import { useState, useEffect } from "react";
import ClubDataType from "../../../types/clubDataType";
import getClubData from "../../../api/getClubData";
import styled from "@emotion/styled";
import ClubList from "../ClubList/ClubList";

export default function ClubContent() {
  const [clubData, setClubData] = useState<ClubDataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const CURRETMAXDATA = 7;
  const onHandleClubData = async () => {
    const clubData = await getClubData();
    const currentPageClubDataLength = currentPage * CURRETMAXDATA;
    setIsLoading(false);
    setClubData(clubData.slice(0, currentPageClubDataLength));
  };
  useEffect(() => {
    onHandleClubData();
  }, []);
  return (
    <>
      {!isLoading && (
        <StyledClubContainer>
          <h2>모든 클럽보기</h2>
          <StyledClubWrapper>
            {clubData.map((item) => (
              <ClubList clubData={item} />
            ))}
          </StyledClubWrapper>
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
