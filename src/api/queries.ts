import { gql } from "@apollo/client";

//GraphQL queries to get the data
export const FETCH_MORE_MESSAGES = gql`
    query FetchMoreMessages($channelId: String!, $messageId: String!, $old: Boolean!) {
        fetchMoreMessages(
            channelId: $channelId
            messageId: $messageId
            old: $old
        ) {
            userId
            messageId
            text
            datetime
        }
    }
`;

export const FETCH_LATEST_MESSAGES = gql`
    query FetchLatestMessages($channelId: String!) {
        fetchLatestMessages(channelId: $channelId) {
            userId
            messageId
            text
            datetime
        }
    }
`;