import PropTypes from "prop-types";

const PDFRenderer = ({ pdfUrl = "" }) => {
  return (
    <iframe
      src={pdfUrl}
      width="100%"
      height="700px"
      style={{ border: "none" }}
      title="PDF Viewer"
    ></iframe>
  );
};

PDFRenderer.propTypes = {
  pdfUrl: PropTypes.string,
};

export default PDFRenderer;
