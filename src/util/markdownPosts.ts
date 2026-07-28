/**
 * Markdown Post API Helpers
 * Credit for original Zack Robinson <z@robinsonz.me>
 * https://github.com/swat-sccs/sauce/blob/master/src/util/markdownPosts.ts
 */
import { existsSync, promises as fsPromises } from "node:fs";
import matter, { type GrayMatterFile } from "gray-matter";
import path from "path";

const POST_NAME = "post.md";

export interface PostFile extends GrayMatterFile<string> {
  data: {
    date: Date;
    title: string;
    cover: string;
    path: string;
  };
}

const options: Bun.markdown.Options = {
  wikiLinks: true,
};

const callbacks: Bun.markdown.RenderCallbacks = {
  heading: (children, { level }) => `<h${level}>${children}</h${level}>`,
  paragraph: (children) => `<p>${children}</p>`,
  strong: (children) => `<strong>${children}</strong>`,
  emphasis: (children) => `<em>${children}</em>`,
  codespan: (children) => `<code>${children}</code>`,
  code: (children, meta) =>
    meta?.language
      ? `<pre><code class="language-${meta.language}">${children}</code></pre>`
      : `<pre><code>${children}</code></pre>`,
  link: (children, { href, title }) =>
    title
      ? `<a href="${href}" title="${title}">${children}</a>`
      : `<a href="${href}">${children}</a>`,
  image: (children, { src, title }) =>
    title
      ? `<img src="${src}?quality=80&size=1080" class="max-w-lg place-self-center" loading="lazy" alt="${children}" title="${title}" />`
      : `<img src="${src}?quality=80&size=1080" class="max-w-lg place-self-center" loading="lazy" alt="${children}" />`,
  list: (children, { ordered, start }) =>
    ordered ? `<ol start="${start}">${children}</ol>` : `<ul>${children}</ul>`,
  listItem: (children) => `<li>${children}</li>`,
  blockquote: (children) => `<blockquote>${children}</blockquote>`,
  hr: () => `<hr />`,
  strikethrough: (children) => `<del>${children}</del>`,
  table: (children) => `<table>${children}</table>`,
  thead: (children) => `<thead>${children}</thead>`,
  tbody: (children) => `<tbody>${children}</tbody>`,
  tr: (children) => `<tr>${children}</tr>`,
  th: (children) => `<th>${children}</th>`,
  td: (children) => `<td>${children}</td>`,
};

const excerptCallbacks: Bun.markdown.RenderCallbacks = {
  ...callbacks,
  image: (children, { src, title }) => "",
};

const isPostFile = (file: GrayMatterFile<string>): file is PostFile => {
  return file.data.date && file.data.title;
};

export const getPost = async (file: string): Promise<PostFile | null> => {
  const postsPath = path.join("./", process.env.POSTS_DIR || "_posts/", file);

  if (existsSync(postsPath)) {
    const fileData = matter(
      await Bun.file(path.join(postsPath, POST_NAME)).text(),
    );
    fileData.content = Bun.markdown.render(
      fileData.content,
      callbacks,
      options,
    );
    if (fileData.excerpt) {
      fileData.excerpt = Bun.markdown.render(
        fileData.excerpt,
        excerptCallbacks,
        options,
      );
    }
    if (!fileData.data.date) {
      console.log(`${file} is missing required front matter: date`);
    }
    if (!fileData.data.title) {
      console.log(`${file} is missing required front matter: title`);
    }
    if (!fileData.data.path) {
      fileData.data.path = fileData.data.title
        .split(" ")
        .join("-")
        .replaceAll(/[^a-zA-Z0-9-_]/g, "");
    }
    return isPostFile(fileData) ? fileData : null;
  } else {
    console.log(`Post folder ${postsPath} does not exist`);
    return null;
  }
};

export const getPosts = async (): Promise<PostFile[] | null> => {
  const postsPath = path.join("./", process.env.POSTS_DIR || "_posts/");

  if (existsSync(postsPath)) {
    const dirs = await fsPromises.readdir(postsPath);

    const parsedFiles = (
      await Promise.all(
        dirs.map(async (dir) => {
          const fileData = matter(
            await Bun.file(path.join(postsPath, dir, POST_NAME)).text(),
          );
          fileData.content = Bun.markdown.render(
            fileData.content,
            callbacks,
            options,
          );
          if (fileData.excerpt) {
            fileData.excerpt = Bun.markdown.render(
              fileData.excerpt,
              excerptCallbacks,
              options,
            );
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
            fileData.data.path = fileData.data.title
              .split(" ")
              .join("-")
              .replaceAll(/[^a-zA-Z0-9-_]/g, "");
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
