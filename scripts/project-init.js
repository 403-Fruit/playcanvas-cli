import spawn from "cross-spawn";
import path from "path";
import fs from "fs-extra";

export const projectInit = (
  projectName,
  settingsJson,
  template = "hot-reload"
) => {
  const templatePath = path.join(__dirname, "..", "template", template);
  const distPath = path.join(__dirname, projectName);

  if (!fs.existsSync(distPath)) {
    const settingsFilePath = path.join(distPath, "settings.json");
    fs.copySync(templatePath, distPath);
    fs.writeFileSync(settingsFilePath, JSON.stringify(settingsJson), "utf8");

    const packageJson = path.join(distPath, "package.json");
    if (fs.existsSync(packageJson)) {
      spawn("npm", ["install", "--prefix", distPath], {
        stdio: "inherit"
      });
    }
  } else {
    console.log("This project already exists");
  }
};

// [x] フォルダをプログラムの置いてあるファイルへ作成
// [x] settings.jsonを設置

// [] フォルダをプログラムを実行した場所へ作成
// Firebasetools
