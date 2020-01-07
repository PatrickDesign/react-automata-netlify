import { Machine, assign, spawn } from "xstate";
import { createSubredditMachine } from "./subredditMachine";

export const redditMachine = Machine({
    id: "reddit",
    initial: "idle",
    context: {
        subreddits: {},
        subreddit: null
    },
    states: { idle: {}, selected: {} },
    on: {
        SELECT: {
            target: ".selected",
            actions: assign((context, event) => {
                // Use the existing subreddit actor if one doesn't exist
                let subreddit = context.subreddits[event.name];

                if (subreddit) {
                    return {
                        ...context,
                        subreddit
                    };
                }

                // Otherwise, spawn a new subreddit actor and
                // save it in the subreddits object
                subreddit = spawn(createSubredditMachine(event.name));

                return {
                    subreddits: {
                        ...context.subreddits,
                        [event.name]: subreddit
                    },
                    subreddit
                };
            })
        }
    }
});
