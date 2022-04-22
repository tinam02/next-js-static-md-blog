// dynamic
import React from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import Link from "next/link";
import Image from "next/image";
const PostPage = ({
  frontmatter: { title, date, cover_image },
  slug,
  content,
}) => {
  return (
    <>
      <Link href="/">
        <a className="btn btn-back"> Go back</a>
      </Link>
      <div className="card card-page">
        <h1 className="post-title">{title}</h1>
        <div className="post-date">Posted on {date}</div>
        <Image
          width="100%"
          height="100%"
          layout="responsive"
          objectFit="contain"
          src={cover_image}
          alt="cover"
        />

        <div className="post-body">
          <div dangerouslySetInnerHTML={{ __html: marked(content) }}></div>
        </div>
      </div>
    </>
  );
};

export default PostPage;

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join("posts")); //files from posts folder

  //   generate paths
  const paths = files.map((file) => ({
    params: {
      // replace extension w/ nothing
      slug: file.replace(".md", ""),
    },
  }));
  console.log(paths);
  return {
    //   array that has objects in it
    paths,
    fallback: false, //404
  };
}

export async function getStaticProps({ params: { slug } }) {
  console.log(slug); //click on read more -- logs title of post
  const markdownWithMeta = fs.readFileSync(
    path.join("posts", `${slug}.md`),
    "utf8"
  );
  const { data: frontmatter, content } = matter(markdownWithMeta);

  return {
    props: {
      frontmatter,
      slug,
      content,
    },
  };
}
