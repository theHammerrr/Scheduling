import { useContext, useState } from "react";
import { ePeopleOptions } from "./people";
import React from "react";

export enum eShitType {
  MORNING = "בוקר",
  NIGHT = "ערב",
}

export enum eConstraintType {
  CANNOT = "לא יכול",
  MUST = "חייב",
  Prefer = "מעדיף",
}

export enum eDayInTheWeek {
  SUNDAY = "ראשון",
  MONDAY = "שני",
  TUESDAY = "שלישי",
  WEDNESDAY = "רביעי",
  THURSDAY = "חמישי",
  FRIDAY = "שישי",
  SATURDAY = "שבת",
}

export interface iConstraint {
  id: string;
  person: ePeopleOptions;
  constraintType: eConstraintType;
  shiftType: eShitType;
  day: eDayInTheWeek;
}

export interface iConstraintContext {
  constraints: iConstraint[];
  addNewConstraint: (newConstraint: iConstraint) => void;
  editExistingConstraint: (editedConstraint: iConstraint) => void;
  deleteConstraint: (constraint: iConstraint) => void;
}

const ConstraintContext = React.createContext<iConstraintContext>({
  constraints: [],
  addNewConstraint: () => console.log("out of context"),
  editExistingConstraint: () => console.log("out of context"),
  deleteConstraint: () => console.log("out of context"),
});

const useConstraintContext = () => useContext(ConstraintContext);

const ConstraintProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [constraints, setConstraints] = useState<iConstraint[]>([]);

  const addNewConstraint = (newConstraint: iConstraint) => {
    setConstraints([...constraints, newConstraint]);
  };

  const editExistingConstraint = (editedConstraint: iConstraint) => {
    const newConstraintArray = constraints.map((currentConstraint) =>
      currentConstraint.id === editedConstraint.id
        ? editedConstraint
        : currentConstraint
    );

    setConstraints(newConstraintArray);
  };

  const deleteConstraint = (constraint: iConstraint) => {
    setConstraints(
      constraints.filter(
        (currnetConstraint) => currnetConstraint.id !== constraint.id
      )
    );
  };

  return (
    <ConstraintContext.Provider
      value={{
        constraints,
        addNewConstraint,
        editExistingConstraint,
        deleteConstraint,
      }}
    >
      {children}
    </ConstraintContext.Provider>
  );
};

export default ConstraintProvider;
export { useConstraintContext };
