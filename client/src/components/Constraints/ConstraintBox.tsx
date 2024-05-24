import styled from "styled-components";
import Dropdown from "../DropDown/DropDown";
import {
  eConstraintType,
  eDayInTheWeek,
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
`;

const TrushIcon = styled.img`
  width: 20px;
  cursor: pointer;
`;

const POSSIBLE_PEOPLE = Object.values(ePeopleOptions);
const POSSIBLE_CONSTRAINT_TYPES = Object.values(eConstraintType);
const POSSIBLE_DAYS = Object.values(eDayInTheWeek);
const POSSIBLE_SHIFTS = Object.values(eShitType);

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
  const handleChangeDay = (newDay: string) => {
    setConstraint({
      ...currentConstraint,
      day: newDay as eDayInTheWeek,
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
        possibleStates={POSSIBLE_PEOPLE}
      />
      <Dropdown
        currentFilter={currentConstraint.constraintType}
        handleClickItem={handleChangeConstraintType}
        possibleStates={POSSIBLE_CONSTRAINT_TYPES}
      />
      <Dropdown
        currentFilter={currentConstraint.day}
        handleClickItem={handleChangeDay}
        possibleStates={POSSIBLE_DAYS}
      />
      <Dropdown
        currentFilter={currentConstraint.shiftType}
        handleClickItem={handleChangeShiftType}
        possibleStates={POSSIBLE_SHIFTS}
      />
      <TrushIcon src="/icons/trash.svg" onClick={handleDeleteConstraint} />
    </ConstraintBoxDiv>
  );
};

export default ConstraintBox;
