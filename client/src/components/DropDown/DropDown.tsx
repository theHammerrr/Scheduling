import styled from "styled-components";

interface iDropdownProps {
  currentFilter?: string;
  handleClickItem: (state: string) => void;
  possibleStates: string[];
}

const Select = styled.select`
  cursor: pointer;
  border-radius: 30px;
  padding: 5px;
`;

const Dropdown: React.FC<iDropdownProps> = ({
  currentFilter,
  handleClickItem,
  possibleStates,
}: iDropdownProps) => {
  const handleOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    handleClickItem(event.target.value);
  };

  return (
    <div>
      <Select
        className="dropdown-select"
        onChange={handleOnChange}
        value={currentFilter}
      >
        {possibleStates.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </Select>
    </div>
  );
};

export default Dropdown;
