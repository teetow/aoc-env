const getUrl = async (url: string) => {
  console.log(url);
  const htmlContent: any = await fetch(url, { mode: "no-cors" }).then((res) => {
    return res.text().then((res) => {
      return res;
    });
  });
  return htmlContent;
};

export const getDayDescription = async (year: number, day: number) => {
  const htmlContent = await getUrl(
    `https://adventofcode.com/${year}/day/${day}`
  ).then((res) => {
    console.log(res);
  });
  return htmlContent;
};
