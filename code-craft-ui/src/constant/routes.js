import { Boxes, FileSpreadsheet, Presentation } from "lucide-react";
import { FaChalkboardTeacher } from "react-icons/fa";
import { BsFillQuestionOctagonFill } from "react-icons/bs";
import { RiQuestionAnswerFill } from "react-icons/ri";

export const ROUTES = [
  {
    id: "dashboard",
    path: "/",
    label: "Dashboard",
    icon: Presentation,
  },
  {
    id: "cheat-sheet",
    path: "/cheat-sheet",
    label: "Cheat sheet",
    icon: FileSpreadsheet,
  },
  {
    id: "module",
    path: "/module",
    label: "Module",
    icon: Boxes,
  },
  {
    id: "lecture",
    path: "/lecture",
    label: "Lecture",
    icon: FaChalkboardTeacher,
  },
  {
    id: "problem",
    path: "/problem",
    label: "Problem",
    icon: BsFillQuestionOctagonFill,
  },
  {
    id: "problem-solution",
    path: "/problem-solution",
    label: "Problem Solution",
    icon: RiQuestionAnswerFill,
  },
];
