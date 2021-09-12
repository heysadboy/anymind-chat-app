import {gql} from "@apollo/client";

//GraphQL queries to post the data
export const SEND_MESSAGE = gql`
        mutation MutationPostMessages($channelId: String!, $text: String!, $userId: String!) {
            postMessage(channelId: $channelId, text: $text, userId: $userId) {
                userId
                text
                messageId
                datetime
            }
        }
`;