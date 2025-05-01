import DocxDisplay from "@/components/DOCXDisplay";
import PdfDisplay from "@/components/PDFDisplay";

export default function Beta() {
  return (
    <main>
      <div>
        <PdfDisplay />
        <DocxDisplay />
      </div>
    </main>
  );
}
