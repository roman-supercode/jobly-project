import { useAppContext } from "../context/appContext";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import Wrapper from "../assets/wrappers/PageBtnContainer";


const PageBtnContainer = () => {
  const { numOfPage, page } = useAppContext();
  return <div>PageBtnContainer</div>;
};
export default PageBtnContainer;
