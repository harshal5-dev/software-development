import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { IoChevronBackCircleSharp } from "react-icons/io5";
import { MdCreditScore } from "react-icons/md";
import { useGetProblemSolutionByProblemIdMutation } from "../problemSolution/problemSolutionApi";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const DisplaySolution = ({ problem, onClearProblem }) => {
  const [getProblemSolutionByProblemId, { data: problemSolutions }] =
    useGetProblemSolutionByProblemIdMutation();

  useEffect(() => {
    if (problem) {
      getProblemSolutionByProblemId({ problemId: problem.id });
    }
  }, [problem, getProblemSolutionByProblemId]);

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row space-y-0">
          <div className="flex aspect-square size-12 mr-3 items-center justify-center rounded-lg bg-accent text-accent-foreground">
            <Icon Icon={MdCreditScore} className="size-7" />
          </div>
          <div>
            <CardTitle className="text-xl">
              Viewing Solution for {problem.name}
            </CardTitle>
            <CardDescription className="text-xs">
              View the solutions for the selected problem.
            </CardDescription>
          </div>
          <Button
            className="ml-auto"
            onClick={onClearProblem}
            icon={IoChevronBackCircleSharp}
          >
            Back
          </Button>
        </CardHeader>
      </Card>
      <ResizablePanelGroup
        direction="horizontal"
        className="w-full rounded-lg border border-accent mt-3 h-96"
      >
        <ResizablePanel defaultSize={50}>
          <div className="flex flex-col items-start justify-start space-y-2 p-4">
            <p className="font-semibold">Problem Description</p>
            <div
              className="tiptap-content px-2 py-3 border border-slate-300 rounded-md shadow-sm bg-slate-200 font-semibold text-sm text-slate-700 w-full"
              dangerouslySetInnerHTML={{ __html: problem.description }}
            />
            <p className="font-semibold">Problem Constraints</p>
            <div
              className="tiptap-content px-2 py-3 border border-slate-300 rounded-md shadow-sm bg-slate-200 font-semibold text-sm text-slate-700 w-full"
              dangerouslySetInnerHTML={{ __html: problem.constraints }}
            />
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50}>
          <div className="flex items-center justify-center p-4">
            <Accordion type="single" collapsible className="w-full">
              {problemSolutions && problemSolutions.length > 0 ? (
                problemSolutions.map((problemSolution) => (
                  <AccordionItem
                    key={problemSolution.id}
                    value={problemSolution.id}
                  >
                    <AccordionTrigger className="text-sm">
                      {problemSolution.name} (
                      {problemSolution.problemSolutionNumber})
                    </AccordionTrigger>
                    <AccordionContent>
                      <img
                        src={problemSolution.fileInfo.url}
                        className="w-full"
                        alt="solution"
                      />
                      <div className="px-5 flex flex-col items-end font-semibold">
                        <p>
                          <span className="text-slate-500 mr-1">
                            Time Complexity
                          </span>
                          : {problemSolution.timeComplexity}
                        </p>
                        <p>
                          <span className="text-slate-500 mr-1">
                            Space Complexity
                          </span>
                          : {problemSolution.spaceComplexity}
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))
              ) : (
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-sm">
                    No Solution has been created for this problem
                  </AccordionTrigger>
                </AccordionItem>
              )}
            </Accordion>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
};

DisplaySolution.propTypes = {
  problem: PropTypes.object,
  onClearProblem: PropTypes.func,
};

export default DisplaySolution;
