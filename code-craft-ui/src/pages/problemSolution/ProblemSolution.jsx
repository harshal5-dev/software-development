import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { IoMdAddCircle } from "react-icons/io";
import { FcClearFilters, FcFilledFilter } from "react-icons/fc";
import { RiQuestionAnswerFill, RiRefreshFill } from "react-icons/ri";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import ProblemSolutionList from "./problemSolutionList/ProblemSolutionList";
import { useGetModuleQuery } from "../module/moduleApi";
import { useGetLectureByModuleIdMutation } from "../lecture/lectureApi";
import {
  setProblemSolutionOperation,
  setSelectedProblemSolution,
} from "./problemSolutionSlice";
import { useGetProblemSolutionQuery } from "./problemSolutionApi";
import { useGetProblemsByLectureIdMutation } from "../problem/problemApi";

const ProblemSolution = () => {
  const [moduleId, setModuleId] = useState("");
  const [lectureId, setLectureId] = useState("");
  const [problemId, setProblemId] = useState("");
  const [globalFilter, setGlobalFilter] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const moduleResponse = useGetModuleQuery();
  const { data: modules } = moduleResponse;

  const [getLectureByModuleId, { data: lectures }] =
    useGetLectureByModuleIdMutation();

  const [getProblemsByLectureId, { data: problems }] =
    useGetProblemsByLectureIdMutation();

  const problemSolutionResponse = useGetProblemSolutionQuery();
  const { refetch, isLoading } = problemSolutionResponse;

  function handleAddProblemSolution() {
    dispatch(setProblemSolutionOperation("Create"));
    navigate("/create-update-problem-solution");
  }

  function handleModuleChange(moduleId) {
    setModuleId(`${moduleId}`);
    setLectureId("");
    getLectureByModuleId({ moduleId });
  }

  function handleLectureChange(lectureId) {
    setLectureId(`${lectureId}`);
    setProblemId("");
    getProblemsByLectureId({ lectureId });
  }

  function handleProblemChange(problemId) {
    setProblemId(`${problemId}`);
  }

  function handleClearFilter() {
    setModuleId("");
    setLectureId("");
    setProblemId("");
  }

  useEffect(() => {
    setGlobalFilter([moduleId, lectureId, problemId]);
  }, [moduleId, lectureId, problemId]);

  useEffect(() => {
    dispatch(setProblemSolutionOperation(""));
    dispatch(setSelectedProblemSolution(null));
  }, [dispatch]);

  return (
    <Card>
      <CardHeader className="flex flex-row space-y-0">
        <div className="flex aspect-square size-12 mr-3 items-center justify-center rounded-lg bg-accent text-accent-foreground">
          <Icon Icon={RiQuestionAnswerFill} className="size-7" />
        </div>
        <div>
          <CardTitle className="text-xl">Problem Solution</CardTitle>
          <CardDescription className="text-xs">
            List of all problem solutions in the database.
          </CardDescription>
        </div>
        <div className="flex flex-row gap-4 ml-auto">
          <Button
            icon={RiRefreshFill}
            variant="accent"
            onClick={refetch}
            disabled={isLoading}
            isLoading={isLoading}
          >
            Refresh
          </Button>
          <Button
            icon={IoMdAddCircle}
            onClick={handleAddProblemSolution}
            disabled={isLoading}
          >
            Problem Solution
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row gap-4 justify-start items-start my-5 bg-slate-200 rounded-md px-4 py-2 shadow border border-slate-300">
          <div>
            <Icon Icon={FcFilledFilter} className="size-7" />
          </div>
          <div className="w-[27%]">
            <Select value={moduleId} onValueChange={handleModuleChange}>
              <SelectTrigger className="h-8 text-xs">
                <SelectValue placeholder="please select a module" />
              </SelectTrigger>

              <SelectContent>
                {modules?.map((module) => (
                  <SelectItem
                    key={module.id}
                    value={`${module.id}`}
                    className="text-xs"
                  >
                    {module.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="w-[27%]">
            <Select value={lectureId} onValueChange={handleLectureChange}>
              <SelectTrigger className="h-8 text-xs">
                <SelectValue placeholder="please select a lecture" />
              </SelectTrigger>

              <SelectContent>
                {lectures?.map((lecture) => (
                  <SelectItem
                    key={lecture.id}
                    value={`${lecture.id}`}
                    className="text-xs"
                  >
                    {lecture.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="w-[27%]">
            <Select value={problemId} onValueChange={handleProblemChange}>
              <SelectTrigger className="h-8 text-xs">
                <SelectValue placeholder="please select a problem" />
              </SelectTrigger>

              <SelectContent>
                {problems?.map((problem) => (
                  <SelectItem
                    key={problem.id}
                    value={`${problem.id}`}
                    className="text-xs"
                  >
                    {problem.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button icon={FcClearFilters} size="xs" onClick={handleClearFilter}>
            Clear
          </Button>
        </div>
        <ProblemSolutionList
          problemSolutionResponse={problemSolutionResponse}
          globalFilter={globalFilter}
        />
      </CardContent>
    </Card>
  );
};

export default ProblemSolution;
