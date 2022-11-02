import type { Post } from "(typings)/post";
import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "/app/posts/[id]");

export function getAllPostIDs() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.reduce<Array<{ id: string }>>((acc, fileName) => {
    if (fileName.endsWith(".md")) {
      acc.push({
        id: fileName.replace(/\.md$/, ""),
      });
    }
    return acc;
  }, []);
}

export async function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...matterResult.data,
  } as Post;
}

export async function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = getAllPostIDs();
  const allPostsData = await Promise.all(
    fileNames.map(({ id }) => getPostData(id))
  );
  // Sort posts by date
  return allPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });
}
