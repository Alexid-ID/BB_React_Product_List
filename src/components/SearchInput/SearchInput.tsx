import React from "react";
import "./styles.css";
import { RxCross2 } from "react-icons/rx";

interface Props {
	keyword: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput = ({ keyword, onChange }: Props) => {
	return (
		<div className="search-container">
			<input
				type="text"
				value={keyword}
				onChange={onChange}
				placeholder="Enter product name"
				className="search-input"
			/>
			<span className="clear-icon" 
                onClick={() => onChange({ target: { value: "" } } as React.ChangeEvent<HTMLInputElement>)}
            >
				<RxCross2 />
			</span>
		</div>
	);
};

export default SearchInput;
