import re

class ResumeParser:
    """Extracts text from resume files (PDF, DOCX, TXT)."""

    @staticmethod
    def extract_text_from_pdf(file_bytes):
        """Extract text from PDF using PyMuPDF."""
        try:
            import fitz
            doc = fitz.open(stream=file_bytes, filetype="pdf")
            text = ""
            for page in doc:
                text += page.get_text()
            doc.close()
            return text
        except ImportError:
            return "PyMuPDF not installed. Install with: pip install pymupdf"
        except Exception as e:
            return f"Error parsing PDF: {str(e)}"

    @staticmethod
    def extract_text_from_docx(file_bytes):
        """Extract text from DOCX using python-docx."""
        try:
            from docx import Document
            import io
            doc = Document(io.BytesIO(file_bytes))
            return "\n".join([para.text for para in doc.paragraphs])
        except ImportError:
            return "python-docx not installed. Install with: pip install python-docx"
        except Exception as e:
            return f"Error parsing DOCX: {str(e)}"
