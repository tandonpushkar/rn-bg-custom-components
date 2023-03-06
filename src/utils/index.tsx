const randomColor = () => Math.floor(Math.random() * 16777215).toString(16);

export const TabData = [
  {
    screenId: 1,
    bgColor: '#' + randomColor(),
  },
];

export const generateNewTabData = (id: number) => {
  return [
    {
      screenId: id,
      bgColor: '#' + randomColor(),
    },
  ];
};
