import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { BsFillQuestionOctagonFill } from "react-icons/bs";
import { FcFilledFilter, FcClearFilters } from "react-icons/fc";
import { IoMdAddCircle } from "react-icons/io";

import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card.jsx";
import Icon from "@/components/ui/icon.jsx";
import { Button } from "@/components/ui/button.jsx";
import {
  setProblemOperation,
  setSelectedProblem,
} from "@/pages/problem/problemSlice.js";
import { useGetModuleQuery } from "../module/moduleApi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetLectureByModuleIdMutation } from "../lecture/lectureApi";
import ProblemList from "./problemList/ProblemList";
import { useGetProblemQuery } from "./problemApi";
import { RiRefreshFill } from "react-icons/ri";

function Problem() {
  const [moduleId, setModuleId] = useState("");
  const [lectureId, setLectureId] = useState("");
  const [globalFilter, setGlobalFilter] = useState([]);

  const moduleResponse = useGetModuleQuery();
  const { data: modules } = moduleResponse;

  const [getLectureByModuleId, { data: lectures }] =
    useGetLectureByModuleIdMutation();

  const problemResponse = useGetProblemQuery();
  const { refetch, isLoading } = problemResponse;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleAddProblem() {
    dispatch(setProblemOperation("Create"));
    navigate("/create-update-problem");
  }

  function handleModuleChange(moduleId) {
    setModuleId(`${moduleId}`);
    setLectureId("");
    getLectureByModuleId({ moduleId });
  }

  function handleLectureCHange(lectureId) {
    setLectureId(`${lectureId}`);
  }

  function handleClearFilter() {
    setModuleId("");
    setLectureId("");
  }

  useEffect(() => {
    setGlobalFilter([moduleId, lectureId]);
  }, [moduleId, lectureId]);

  useEffect(() => {
    dispatch(setProblemOperation(""));
    dispatch(setSelectedProblem(null));
  }, [dispatch]);

  return (
    <Card>
      <CardHeader className="flex flex-row space-y-0">
        <div className="flex aspect-square size-12 mr-3 items-center justify-center rounded-lg bg-accent text-accent-foreground">
          <Icon Icon={BsFillQuestionOctagonFill} className="size-7" />
        </div>
        <div>
          <CardTitle className="text-xl">Problem</CardTitle>
          <CardDescription className="text-xs">
            List of all problems in the database.
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
            onClick={handleAddProblem}
            icon={IoMdAddCircle}
            disabled={isLoading}
          >
            Problem
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row gap-4 justify-start items-start my-5 bg-slate-200 rounded-md px-4 py-2 shadow border border-slate-300">
          <div>
            <Icon Icon={FcFilledFilter} className="size-7" />
          </div>
          <div className="w-[30%]">
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

          <div className="w-[30%]">
            <Select value={lectureId} onValueChange={handleLectureCHange}>
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
          <Button icon={FcClearFilters} size="xs" onClick={handleClearFilter}>
            Clear
          </Button>
        </div>
        <ProblemList
          problemResponse={problemResponse}
          globalFilter={globalFilter}
        />
      </CardContent>
    </Card>
  );
}

export default Problem;
