import io
import fitz  # PyMuPDF
from docx import Document
from typing import Optional

class ResumeParser:
    @staticmethod
    def extract_text_from_pdf(pdf_bytes: bytes) -> str:
        text = ""
        with fitz.open(stream=pdf_bytes, filetype="pdf") as doc:
            for page in doc:
                text += page.get_text()
        return text

    @staticmethod
    def extract_text_from_docx(docx_bytes: bytes) -> str:
        doc = Document(io.BytesIO(docx_bytes))
        text = ""
        for para in doc.paragraphs:
            text += para.text + "\n"
        return text

    @classmethod
    def parse(cls, file_bytes: bytes, filename: str) -> Optional[str]:
        if filename.endswith(".pdf"):
            return cls.extract_text_from_pdf(file_bytes)
        elif filename.endswith(".docx"):
            return cls.extract_text_from_docx(file_bytes)
        else:
            return None
