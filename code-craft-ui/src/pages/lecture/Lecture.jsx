import { useEffect, useState } from "react";
import { IoMdAddCircle } from "react-icons/io";
import { FaChalkboardTeacher } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { RiRefreshFill } from "react-icons/ri";
import { FcFilledFilter, FcClearFilters } from "react-icons/fc";

import { setLectureOperation, setSelectedLecture } from "./lectureSlice";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { useGetModuleQuery } from "../module/moduleApi";
import { useGetLectureQuery } from "./lectureApi";
import LectureList from "./lectureList/LectureList";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Lecture = () => {
  const [moduleId, setModuleId] = useState("");

  const moduleResponse = useGetModuleQuery();
  const { data: modules } = moduleResponse;
  const lectureResponse = useGetLectureQuery();
  const { refetch, isLoading } = lectureResponse;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleAddLecture() {
    dispatch(setLectureOperation("Create"));
    navigate("/create-update-lecture");
  }

  function handleModuleChange(moduleId) {
    setModuleId(`${moduleId}`);
  }

  function handleClearFilter() {
    setModuleId("");
  }

  useEffect(() => {
    dispatch(setLectureOperation(""));
    dispatch(setSelectedLecture(null));
  }, [dispatch]);

  return (
    <Card>
      <CardHeader className="flex flex-row space-y-0">
        <div className="flex aspect-square size-12 mr-3 items-center justify-center rounded-lg bg-accent text-accent-foreground">
          <Icon Icon={FaChalkboardTeacher} className="size-7" />
        </div>
        <div>
          <CardTitle className="text-xl">Lecture</CardTitle>
          <CardDescription className="text-xs">
            List of all lectures in the database.
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
            onClick={handleAddLecture}
            icon={IoMdAddCircle}
            disabled={isLoading}
          >
            Lecture
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row gap-4 justify-start items-start my-5 bg-slate-200 rounded-md px-4 py-2 shadow border border-slate-300">
          <div>
            <Icon Icon={FcFilledFilter} className="size-7" />
          </div>
          <div className="w-1/3">
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
          <Button icon={FcClearFilters} size="xs" onClick={handleClearFilter}>
            Clear
          </Button>
        </div>
        <LectureList
          lectureResponse={lectureResponse}
          globalFilter={moduleId}
        />
      </CardContent>
    </Card>
  );
};

export default Lecture;
