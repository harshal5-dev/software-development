import PropTypes from "prop-types";
import PDFRenderer from "./PDFRenderer";

const PDFViewer = ({ pdfUrl = "" }) => {
  if (!pdfUrl) return <p>Loading...</p>;

  return <PDFRenderer pdfUrl={pdfUrl} />;
};

PDFViewer.propTypes = {
  pdfUrl: PropTypes.string,
};

export default PDFViewer;
