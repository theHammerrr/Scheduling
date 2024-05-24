import styled from "styled-components";
import ConstraintBox from "./ConstraintBox";
import {
  eConstraintType,
  eShitType,
  iConstraint,
  useConstraintContext,
} from "../Contexts/ConstraintContext/ConstraintsProvider";
import { ePeopleOptions } from "../Contexts/ConstraintContext/people";
import { v4 as uuidv4 } from "uuid";

const ConstraintsContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 10px;
  top: 10px;
  min-width: 350px;
  gap: 10px;
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
