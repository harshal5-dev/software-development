import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { MdNoteAlt } from "react-icons/md";
import PropTypes from "prop-types";

const DisplayNotes = ({ notes = "" }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row space-y-0">
        <div className="flex aspect-square size-12 mr-3 items-center justify-center rounded-lg bg-accent text-accent-foreground">
          <Icon Icon={MdNoteAlt} className="size-7" />
        </div>
        <div>
          <CardTitle className="text-xl">Lecture Notes Viewer</CardTitle>
          <CardDescription className="text-xs">
            View the notes for the selected lecture.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div
          className="tiptap-content"
          dangerouslySetInnerHTML={{ __html: notes }}
        />
      </CardContent>
    </Card>
  );
};

DisplayNotes.propTypes = {
  notes: PropTypes.string,
};

export default DisplayNotes;
