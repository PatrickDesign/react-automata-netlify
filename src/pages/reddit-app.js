import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Subreddit from "../components/Subreddit"

import { useMachine } from "@xstate/react";
import { redditMachine } from "../scripts/machines/reddit/redditMachine";

const subreddits = ["frontend", "reactjs", "vuejs"]

const Reddit = () => {

  const [current, send] = useMachine(redditMachine);
  const { subreddit } = current.context;

  return (
    <Layout>
      <SEO title="Reddit app" />
      <h1>React-Automata</h1>

      <select onChange={(e) => send("SELECT", { name: e.target.value })}>
        <option disabled selected>
          Select one
        </option>
        {subreddits.map(subreddit => (
          <option key={subreddit}>{subreddit}</option>
        ))}
      </select>

      <div>
        <h1>{current.matches("idle") ? "Select a subreddit" : null}</h1>
        {subreddit && <Subreddit service={subreddit} key={subreddit.id} />}
      </div>

      <Link to="/">Go back to the homepage</Link>
    </Layout>
  )
}

export default Reddit
