import styled from "styled-components";
import Dropdown from "../DropDown/DropDown";
import {
  eConstraintType,
  eShitType,
  iConstraint,
} from "../Contexts/ConstraintContext/ConstraintsProvider";
import { ePeopleOptions } from "../Contexts/ConstraintContext/people";

export interface iConstraintBoxProps {
  currentConstraint: iConstraint;
  setConstraint: (editedConstraint: iConstraint) => void;
  deleteConstraint: (constraint: iConstraint) => void;
}

const ConstraintBoxDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-style: solid;
  padding: 7px;
  gap: 10px;
  border-radius: 30px;
  @media only screen and (max-width: 600px) {
  }
`;

const TrushIcon = styled.img`
  width: 20px;
  cursor: pointer;
`;

const ConstraintBox: React.FC<iConstraintBoxProps> = ({
  currentConstraint,
  setConstraint,
  deleteConstraint,
}: iConstraintBoxProps) => {
  const handleChangePerson = (newPerson: string) => {
    setConstraint({
      ...currentConstraint,
      person: newPerson as ePeopleOptions,
    });
  };

  const handleChangeConstraintType = (newConstraintType: string) => {
    setConstraint({
      ...currentConstraint,
      constraintType: newConstraintType as eConstraintType,
    });
  };
  const handleChangeShiftType = (newShiftType: string) => {
    setConstraint({
      ...currentConstraint,
      shiftType: newShiftType as eShitType,
    });
  };

  const handleDeleteConstraint = () => {
    deleteConstraint(currentConstraint);
  };

  return (
    <ConstraintBoxDiv>
      <Dropdown
        currentFilter={currentConstraint.person}
        handleClickItem={handleChangePerson}
        possibleStates={Object.values(ePeopleOptions)}
      />
      <Dropdown
        currentFilter={currentConstraint.constraintType}
        handleClickItem={handleChangeConstraintType}
        possibleStates={Object.values(eConstraintType)}
      />
      <Dropdown
        currentFilter={currentConstraint.shiftType}
        handleClickItem={handleChangeShiftType}
        possibleStates={Object.values(eShitType)}
      />
      <TrushIcon src="/icons/trash.svg" onClick={handleDeleteConstraint} />
    </ConstraintBoxDiv>
  );
};

export default ConstraintBox;
