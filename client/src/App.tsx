import styled from "styled-components";
import ConstraintsContainer from "./components/Constraints/ConstraintsContainer";
import ConstraintProvider from "./components/Contexts/ConstraintContext/ConstraintsProvider";

const AppDiv = styled.div`
  display: flex;
  direction: rtl;
  background-color: #87ad4752;
  width: 100vw;
  height: 100vh;
`;

const App: React.FC = () => {
  return (
    <AppDiv>
      <ConstraintProvider>
        <ConstraintsContainer />
      </ConstraintProvider>
    </AppDiv>
  );
};

export default App;
