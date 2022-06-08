const filterCategory = [
  {
    id: 0,
    title: "장소",
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
];

export default filterCategory;
