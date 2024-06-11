
"use client";
import Ourproducts from "./home/Ourproducts";
import Categories from "./home/Categories";
import Thismonth from "./home/Thismonth";
import Services from "./Services";
import Featured from "./home/Featured";
import Todays from "./home/Todays";
import Navbar from "./Navbar";
import Navbanner from "./home/Navbanner";
import ScrollToTop from "./ScorllToTop";

export default function Home() {

  return (
    <div>
      <Navbar   />
      <Navbanner /> 
      <Todays />
      <Categories />
      <Thismonth />
      <Ourproducts />
      <Featured />
      <Services />
      <ScrollToTop />
    </div>
  );
}
