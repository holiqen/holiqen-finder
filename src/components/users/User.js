import React, { useContext, useEffect } from "react";
import Spinner from "../layout/Spinner";
import { Link, useParams } from "react-router-dom";
import Repos from "../repos/Repos";
import GithubContext from "../../context/github/githubContext";

const User = ({ match }) => {
  const githubContext = useContext(GithubContext);
  const { user, getUser, loading, repos, getUserRepos } = githubContext;
  const params = useParams();

  useEffect(() => {
    getUser(params.login);
    getUserRepos(params.login);

    // eslint-disable-next-line
  }, []);

  const {
    name,
    avatar_url,
    location,
    bio,
    blog,
    login,
    html_url,
    followers,
    following,
    public_repos,
    public_gists,
    hireable,
    company,
  } = user;

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <Link to="/" className="btn btn-light">
        Back to search
      </Link>
      Hireable:{" "}
      {hireable ? <i className="fas fa-check text-success" /> : <i className="fas fa-times-circle text-danger" />}
      <div className="card grid-2">
        <div className="all-center">
          <img src={avatar_url} className="round-img" alt="" style={{ width: "150px" }} />
          <h1>{name}</h1>
          <p>Location: {location}</p>
        </div>
        <div>
          {bio && (
            <>
              <h2>BIO</h2>
              <p>{bio}</p>
            </>
          )}
          <a href={html_url} className="btn btn-dark my-1">
            Visit Github profile
          </a>
          <ul>
            <li>
              {login && (
                <>
                  <strong>Username: {}</strong> {login}
                </>
              )}
            </li>
            <li>
              {company && (
                <>
                  <strong>Company: {}</strong> {company}
                </>
              )}
            </li>
            <li>
              {blog && (
                <>
                  <strong>Blog: {}</strong> {blog}
                </>
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className="card text-center">
        <div className="badge badge-primary">Followers: {followers}</div>
        <div className="badge badge-success">Following: {following}</div>
        <div className="badge badge-light">Public repos: {public_repos}</div>
        <div className="badge badge-dark">Public gists: {public_gists}</div>
      </div>
      <Repos repos={repos} />
    </>
  );
};

export default User;
