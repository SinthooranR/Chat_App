import React from "react";
import App from "./App";
import {
  InMemoryCache,
  ApolloClient,
  createHttpLink,
  ApolloProvider,
  split,
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";

// Log any GraphQL errors or network error that occurred
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message }) =>
      console.log(`[GraphQL error]: Message: ${message} `)
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

// proxy for Production
const httpLink = createHttpLink({
  uri: "/graphql",
  credentials: "same-origin",
});

const devSubscriptionURL = "ws://localhost:5000/graphql";
const prodSubscritionURL = "wss://chat-app-postgres.herokuapp.com/graphql";

const wsLink = new WebSocketLink({
  uri:
    process.env.NODE_ENV === "production"
      ? prodSubscritionURL
      : devSubscriptionURL,
  options: {
    reconnect: true,
  },
});

const authLink = setContext(() => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  authLink.concat(wsLink),
  authLink.concat(httpLink)
);

const client = new ApolloClient({
  link: errorLink.concat(splitLink),
  cache: new InMemoryCache(),
});

export default (
  <ApolloProvider client={client}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>
);
