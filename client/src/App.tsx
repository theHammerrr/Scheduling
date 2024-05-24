import styled from "styled-components";
import ConstraintsContainer from "./components/Constraints/ConstraintsContainer";
import ConstraintProvider from "./components/Contexts/ConstraintContext/ConstraintsProvider";
import SchedulesContainer from "./components/Scheduals/SchedulesContainer";

const AppDiv = styled.div`
  display: flex;
  direction: rtl;
  flex-direction: column;
`;

const UpperPage = styled.div`
  flex-direction: row;
`;

const LowerPage = styled.div`
  flex-direction: row;
  margin-top: 50px;
`;

const App: React.FC = () => {
  return (
    <AppDiv>
      <ConstraintProvider>
        <UpperPage>
          <ConstraintsContainer />
        </UpperPage>
        <LowerPage>
          <SchedulesContainer />
        </LowerPage>
      </ConstraintProvider>
    </AppDiv>
  );
};

export default App;
