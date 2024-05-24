import styled from "styled-components";
import { useConstraintContext } from "../Contexts/ConstraintContext/ConstraintsProvider";
import { shiftSchedulingGA } from "../../Static/GenerateScheduals/GenerateSchedual";
import { ePeopleOptions } from "../Contexts/ConstraintContext/people";
import { iShiftSchedulingGA } from "../../Static/GenerateScheduals/Types";
import { useState } from "react";
import Loader from "../Loader/Loader";

const GENERATE_BUTTON_TEXT = "לחץ כאן לקבלת משמרות";

const SchedualsContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const GeneratorButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const GeneratorButton = styled.button`
  height: 50px;
  width: 200px;
  border-radius: 40px;
`;

// const worker = new Worker("./worker.js");

const SchedulesContainer: React.FC = () => {
  const [showScheduleLoader, setShowScheduleLoader] = useState<boolean>(false);

  const { constraints } = useConstraintContext();

  const handleGenerateSchedualsClick = async () => {
    const shifts = await shiftSchedulingGA({
      people: Object.values(ePeopleOptions),
      constraints,
    } as iShiftSchedulingGA);
    console.log(shifts);
  };

  return (
    <SchedualsContainerDiv>
      <GeneratorButtonContainer>
        <GeneratorButton onClick={handleGenerateSchedualsClick}>
          <Loader showLoader={showScheduleLoader}>
            <span>{GENERATE_BUTTON_TEXT}</span>
          </Loader>
          {/* {GENERATE_BUTTON_TEXT} */}
        </GeneratorButton>
      </GeneratorButtonContainer>
    </SchedualsContainerDiv>
  );
};

export default SchedulesContainer;
