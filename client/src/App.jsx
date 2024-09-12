import './App.css';
import {ApolloClient, InMemoryCache, ApolloProvider, createHttpLink} from '@apollo/client'
import { Outlet } from 'react-router-dom';
import { setContext } from '@apollo/client/link/context';
import AuthService from './utils/auth'
import Navbar from './components/Navbar';

const httpLink = createHttpLink({
  uri: '/graphql',
});

//context to support jwt
const authLink = setContext((request, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = AuthService.loggedIn() ? AuthService.getToken() : null;
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Navbar />
      <Outlet />
    </ApolloProvider>
  );
}

export default App;
