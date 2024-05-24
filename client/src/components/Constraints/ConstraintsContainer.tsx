import styled from "styled-components";
import ConstraintBox from "./ConstraintBox";
import {
  eConstraintType,
  eDayInTheWeek,
  eShitType,
  iConstraint,
  useConstraintContext,
} from "../Contexts/ConstraintContext/ConstraintsProvider";
import { ePeopleOptions } from "../Contexts/ConstraintContext/people";
import { v4 as uuidv4 } from "uuid";

const ConstraintsContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 30px 0 0;
  width: 30%;
  gap: 10px;

  @media only screen and (max-width: 600px) {
    max-width: 100px;
  }
`;

const AddConstraintsButton = styled.button`
  align-self: start;
  border-radius: 30px;
  padding: 5px;
`;
const ADD_CONSTRAINT_BUTTON_TEXT = "הוסף אילוץ";

const getNewDefaultConstraint = (): iConstraint => {
  return {
    id: uuidv4(),
    constraintType: eConstraintType.CANNOT,
    person: ePeopleOptions.IDO,
    shiftType: eShitType.MORNING,
    day: eDayInTheWeek.SUNDAY,
  };
};

const ConstraintsContainer: React.FC = () => {
  const {
    constraints,
    addNewConstraint,
    editExistingConstraint,
    deleteConstraint,
  } = useConstraintContext();

  const handleOnClickAddConstraint = () => {
    addNewConstraint(getNewDefaultConstraint());
  };

  return (
    <>
      <ConstraintsContainerDiv>
        <AddConstraintsButton onClick={handleOnClickAddConstraint}>
          <span>{ADD_CONSTRAINT_BUTTON_TEXT}</span>
        </AddConstraintsButton>
        {constraints.map((constraint: iConstraint) => (
          <ConstraintBox
            key={constraint.id}
            currentConstraint={constraint}
            setConstraint={editExistingConstraint}
            deleteConstraint={deleteConstraint}
          />
        ))}
      </ConstraintsContainerDiv>
    </>
  );
};

export default ConstraintsContainer;
