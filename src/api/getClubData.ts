const fetchClubData = () => {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: "Bearer 22swko029o3wewjovgvs9wcqmk8p3ttrepueemyj",
    },
  };
  return fetch(
    "https://api.json-generator.com/templates/ePNAVU1sgGtQ/data",
    requestOptions
  );
};

const getClubData = async () => {
  try {
    const data = await fetchClubData();
    const clubData = await data.json();
    return clubData;
  } catch (e) {
    console.log(e);
    // 에러페이지로 이동시키기
  }
};

export default getClubData;
