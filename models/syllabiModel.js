import { Schema, model, models } from "mongoose";

const syllabiSchema = new Schema(
  {
    syllabusClass: String,
    syllabusFaculty: String,
    syllabusTerm: String,
    syllabusFile: String,
  },
  { _id: true },
  { timestamps: true }
);

const syllabiModel = models.syllabi || model("syllabi", syllabiSchema);

export default syllabiModel;
export { syllabiSchema };
