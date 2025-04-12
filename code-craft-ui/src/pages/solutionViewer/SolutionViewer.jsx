import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useGetLectureByIdMutation } from "../lecture/lectureApi";
import Icon from "@/components/ui/icon";
import { FaPersonChalkboard } from "react-icons/fa6";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BsFileEarmarkPdfFill } from "react-icons/bs";
import { CgNotes } from "react-icons/cg";
import { PiQuestionMarkFill } from "react-icons/pi";
import { FaQuestionCircle } from "react-icons/fa";
import { TbUserQuestion } from "react-icons/tb";
import DisplayPDF from "./DisplayPDF";
import DisplayNotes from "./DisplayNotes";
import DisplayProblemSolution from "./DisplayProblemSolution";
import { TbDeviceImacQuestion } from "react-icons/tb";

const tabItems = [
  {
    label: "Notes",
    value: "notes",
    icon: CgNotes,
  },
  {
    label: "PDF Notes",
    value: "pdfNotes",
    icon: BsFileEarmarkPdfFill,
  },
  {
    label: "Lecture Problems",
    value: "lectureProblems",
    icon: TbUserQuestion,
  },
  {
    label: "Assignment",
    value: "assignment",
    icon: FaQuestionCircle,
  },
  {
    label: "Additional Problems",
    value: "additionalProblems",
    icon: PiQuestionMarkFill,
  },
];

const SolutionViewer = () => {
  const selectedLectureId = useSelector(
    (state) => state.solutionViewer.selectedLectureId
  );
  const [getLectureById, { data: lectureDetails, isLoading, isError }] =
    useGetLectureByIdMutation();

  useEffect(() => {
    if (selectedLectureId) {
      getLectureById({ lectureId: selectedLectureId });
    }
  }, [selectedLectureId, getLectureById]);

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (isError) {
    return (
      <div>
        <h1>Error</h1>
      </div>
    );
  }

  return (
    lectureDetails && (
      <div>
        <div className="flex flex-row space-y-0">
          <div className="flex aspect-square size-12 mr-3 items-center justify-center rounded-lg bg-accent text-accent-foreground">
            <Icon Icon={FaPersonChalkboard} className="size-7" />
          </div>
          <div>
            <div className="text-xl font-semibold leading-6">
              {lectureDetails.name} : {lectureDetails.moduleShortDescription} (
              {lectureDetails.lectureNumber})
            </div>
            <span className="text-xs">{lectureDetails.moduleName}</span>
          </div>
        </div>
        <div className="mt-4">
          <Tabs defaultValue="notes" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              {tabItems.map((tabItem) => (
                <TabsTrigger key={tabItem.value} value={tabItem.value}>
                  <Icon Icon={tabItem.icon} className="size-4 mr-1" />
                  {tabItem.label}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent className="w-full" value="notes">
              <DisplayNotes notes={lectureDetails.notes} />
            </TabsContent>
            <TabsContent className="w-full" value="pdfNotes">
              <DisplayPDF pdfUrl={lectureDetails.pdfUrl} />
            </TabsContent>
            <TabsContent className="w-full" value="lectureProblems">
              <DisplayProblemSolution
                title="Lecture Problem Viewer"
                description="View the problems for the selected lecture."
                problems={lectureDetails.lectureProblems}
                noDataText="No lecture problems found for this lecture."
              />
            </TabsContent>
            <TabsContent className="w-full" value="assignment">
              <DisplayProblemSolution
                title="Assignment Problem Viewer"
                description="View the problems for the selected assignment."
                problems={lectureDetails.assignmentProblems}
                problemIcon={TbDeviceImacQuestion}
                noDataText="No assignment problems found for this assignment."
              />
            </TabsContent>
            <TabsContent className="w-full" value="additionalProblems">
              <DisplayProblemSolution
                title="Additional Problem Viewer"
                description="View the problems for the selected additional problems."
                problems={lectureDetails.additionalProblems}
                noDataText="No additional problems found for this assignment."
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    )
  );
};

export default SolutionViewer;
