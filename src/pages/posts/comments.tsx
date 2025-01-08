import React, { useEffect, useState } from "react";
import Giscus from "@giscus/react";

interface CommentsProps {
  repo: string;
  repoId: string;
  category: string;
  categoryId: string;
}

const Comments: React.FC<CommentsProps> = ({
  repo,
  repoId,
  category,
  categoryId,
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;
  const isValidRepo = repo && repo.includes("/") ? repo : "";
  
  return (
    <div>
      {isValidRepo ? (
        <Giscus
          repo={isValidRepo as `${string}/${string}`}
          repoId={repoId}
          category={category}
          categoryId={categoryId}
          mapping="title"
          reactionsEnabled="1"
          emitMetadata="0"
          theme="catppuccin_latte"
          inputPosition="top"
          lang="id"
        />
      ) : null}
    </div>
  );
};

export default Comments;