import PDFViewer from "@/components/pdfViewer/PDFViewer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { RiFilePdfFill } from "react-icons/ri";
import PropTypes from "prop-types";

const DisplayPDF = ({ pdfUrl }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row space-y-0">
        <div className="flex aspect-square size-12 mr-3 items-center justify-center rounded-lg bg-accent text-accent-foreground">
          <Icon Icon={RiFilePdfFill} className="size-7" />
        </div>
        <div>
          <CardTitle className="text-xl">Lecture PDF Notes Viewer</CardTitle>
          <CardDescription className="text-xs">
            View the PDF notes for the selected lecture.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <PDFViewer pdfUrl={pdfUrl} />
      </CardContent>
    </Card>
  );
};

DisplayPDF.propTypes = {
  pdfUrl: PropTypes.string,
};

export default DisplayPDF;
