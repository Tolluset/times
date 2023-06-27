import fs from "fs";

const TEMPLATE = "template.md";
const YESTERDAY = `${convertFormat(
  new Date(getToday().getTime() - 24 * 60 * 60 * 1000)
)}.md`;
const TODAY = `${convertFormat(getToday())}.md`;

(function main() {
  if (isFileExist(TODAY)) process.exit(1);

  if (isFileExist(YESTERDAY)) {
    const yesterdayContents = readFile(YESTERDAY);
    addFile(TODAY, yesterdayContents);
  } else {
    const templateContents = readFile(TEMPLATE);
    addFile(TODAY, templateContents);
  }
})();

function getToday() {
  const kstOffset = 9 * 60 * 60 * 1000;
  return new Date(new Date().getTime() + kstOffset);
}

function convertFormat(date) {
  return date.toISOString().slice(0, 10).replace(/-/g, "");
}

function isFileExist(fileName) {
  if (fs.existsSync(fileName)) {
    console.info(`기존 파일이 존재합니다. ${fileName}`);

    return true;
  } else return false;
}

function addFile(fileName, contents) {
  fs.writeFile(fileName, contents, (err) => {
    if (err) throw err;
    console.info(`${fileName} 파일이 생성되었습니다.`);
  });
}

function readFile(fileName) {
  return fs.readFileSync(fileName, "utf8", (err, data) => {
    if (err) {
      console.error("파일 읽기 에러:", err);
      return;
    }
  });
}
