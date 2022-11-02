import Date from "date";
import { getAllPostIDs, getPostData } from "utils";

import utilStyles from "utils.module.css";

export default async function Post({ params }: { params: any }) {
  const postData = await getPostData(params?.id as string);
  return (
    <article>
      <h1 className={utilStyles.headingXl}>{postData.title}</h1>
      <div className={utilStyles.lightText}>
        <Date dateString={postData.date} />
      </div>
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </article>
  );
}

export async function generateStaticParams() {
  return getAllPostIDs();
}
