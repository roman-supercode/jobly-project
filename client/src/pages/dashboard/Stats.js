import { useEffect } from "react";
import { StatsContainer, Loading, ChartsContainer } from "../../components";
import { useAppContext } from "../../context/appContext";

const Stats = () => {
  const { showStats, isLaoding, monthlyApplications } = useAppContext();

  useEffect(() => {
    showStats();
    // eslint-disable-next-line
  }, []);

  if (isLaoding) {
    return <Loading center />;
  }
  return (
    <>
      <h1>Stats Page</h1>
      <StatsContainer />
      {monthlyApplications.length > 0 && <ChartsContainer />}
    </>
  );
};

export default Stats;
