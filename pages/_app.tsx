import "../styles/globals.scss";

type MyAppProps = {
  Component: any,
  pageProps: any
}

const MyApp:React.FC<MyAppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
}

export default MyApp;
