import React from "react";

import "./Style/App.css";

import { ApolloProvider } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client";

import CountriesList from "./Components/CountriesList";

function App() {
  const client = new ApolloClient({
    uri: "https://countries.trevorblades.com/graphql",
    cache: new InMemoryCache(),
  });

  return (
    // ApolloProvider ile sarmalamak, Apollo Client'ın tüm uygulama boyunca kullanılabilir olmasını sağlamaktadır.

    <div className="App">
      <ApolloProvider client={client}>
        <CountriesList />
      </ApolloProvider>
    </div>
  );
}

export default App;
