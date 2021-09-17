import Separate from "./Separate"
import NoNameExport from "./NoNameExport";
import { First, Second } from "./gather/index";
const ChapterFive = (props) => {
    return (
        <div>
            <Separate />
            <NoNameExport />
            <firstExport />
            <secondExport />
            <First />
            <Second />
        </div>
    );
};

export default ChapterFive;
