import React, { useState, useEffect } from "react";
import RepoTimeline from "../../components/timeline";
import { useRouter } from "next/router";
import getUserRepositories from "../../api/";

function User() {
  const router = useRouter();
  const username = router.query.user;
  const [repositories, setRepositories] = useState();
  const [apiLimitError, setApiLimitError] = useState("");

  useEffect(() => {
    getUserRepositories(username).then((repositoriesResponse) => {
      !repositoriesResponse.message
        ? setRepositories(repositoriesResponse)
        : setApiLimitError(repositoriesResponse.message);
    });
  }, [username]);

  return (
    <>
      <RepoTimeline repositories={repositories} apiLimitError={apiLimitError} />
    </>
  );
}

export default User;
