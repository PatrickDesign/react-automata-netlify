import React from "react"
import { useService } from "@xstate/react"

const Subreddit = ({ service }) => {
  const [current, send] = useService(service)

  if(current.matches("failure"))
  {
      return(
          <div>
              Failed to load posts.... <button onClick={e => send("RETRY")}>Retry?</button>
          </div>
      )
  }

  const { subreddit, posts, lastUpdated } = current.context

  return (
    <div>
      {current.matches("loading") && <div>Loading reddit posts....</div>}
      {posts && (
        <>
          <h2>{subreddit}</h2>
          <small>
            Last updated: {lastUpdated}{" "}
            <button onClick={_ => send("REFRESH")}>Refresh</button>
          </small>
          <ul>
            {posts.map(post => <li key={post.id}><a href={"https://reddit.com" + post.permalink}>{post.title}</a></li>)}
          </ul>
        </>
      )}
    </div>
  )
}

export default Subreddit
