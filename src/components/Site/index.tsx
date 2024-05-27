import Header from "../Header";
import Footer from "../Footer";

const Sites = ({ children }: any) => {
  return (
    <div className="">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Sites;
