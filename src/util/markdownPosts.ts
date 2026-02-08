/**
 * Markdown Post API Helpers
 * Credit for original Zack Robinson <z@robinsonz.me>
 * https://github.com/swat-sccs/sauce/blob/master/src/util/markdownPosts.ts
 */
import { existsSync, promises as fsPromises } from 'node:fs';
import matter, { type GrayMatterFile } from 'gray-matter';
import path from 'path';

const POST_NAME = 'post.md';

export interface PostFile extends GrayMatterFile<string> {
  data: {
    date: Date;
    title: string;
    cover: string;
    path: string;
  };
}

const isPostFile = (file: GrayMatterFile<string>): file is PostFile => {
  return file.data.date && file.data.title;
};

export const getPost = async (file: string): Promise<PostFile | null> => {
  const postsPath = path.join('./', process.env.POSTS_DIR || '_posts/', file);

  if (existsSync(postsPath)) {
    const fileData = matter(await Bun.file(path.join(postsPath, POST_NAME)).text());
    fileData.content = Bun.markdown.html(fileData.content);
    if (fileData.excerpt) {
      fileData.excerpt = Bun.markdown.html(fileData.excerpt);
    }
    if (!fileData.data.date) {
      console.log(`${file} is missing required front matter: date`);
    }
    if (!fileData.data.title) {
      console.log(`${file} is missing required front matter: title`);
    }
    if (!fileData.data.path) {
      fileData.data.path = fileData.data.title.split(" ").join("-").replaceAll(/[^a-zA-Z0-9-_]/g, "");
    }
    return isPostFile(fileData) ? fileData : null;
  } else {
    console.log(`Post folder ${postsPath} does not exist`);
    return null;
  }
}

export const getPosts = async (): Promise<PostFile[] | null> => {
  const postsPath = path.join('./', process.env.POSTS_DIR || '_posts/');

  if (existsSync(postsPath)) {
    const dirs = await fsPromises.readdir(postsPath);

    const parsedFiles = (
      await Promise.all(
        dirs.map(async (dir) => {
          const fileData = matter(await Bun.file(path.join(postsPath, dir, POST_NAME)).text());
          fileData.content = Bun.markdown.html(fileData.content);
          if (fileData.excerpt) {
            fileData.excerpt = Bun.markdown.html(fileData.excerpt);
          }
          if (!fileData.data.date) {
            console.log(`${dir} is missing required front matter: date`);
          }
          if (!fileData.data.title) {
            console.log(`${dir} is missing required front matter: title`);
          }
          if (!fileData.data.cover) {
            console.log(`${dir} is missing required front matter: cover`);
          }
          if (!fileData.data.path) {
            fileData.data.path = fileData.data.title.split(" ").join("-").replaceAll(/[^a-zA-Z0-9-_]/g, "");
          }
          return fileData;
        }),
      )
    )
      .filter(isPostFile)
      .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

    if (parsedFiles.length === 0) {
      return null;
    } else {
      return parsedFiles;
    }
  } else {
    console.log(`Post folder ${postsPath} does not exist`);
    return null;
  }
};
