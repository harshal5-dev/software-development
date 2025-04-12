import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import List from "@/components/ui/list";
import { Separator } from "@/components/ui/separator";
import PropTypes from "prop-types";
import { FaEye } from "react-icons/fa";
import { IoIosSwitch } from "react-icons/io";
import { LuFileType } from "react-icons/lu";
import { TbMessage2Question } from "react-icons/tb";

const DisplayProblem = ({
  title,
  description,
  problems,
  problemIcon = TbMessage2Question,
  noDataText = "No data found",
  onSelectProblem,
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row space-y-0">
        <div className="flex aspect-square size-12 mr-3 items-center justify-center rounded-lg bg-accent text-accent-foreground">
          <Icon Icon={problemIcon} className="size-7" />
        </div>
        <div>
          <CardTitle className="text-xl">{title}</CardTitle>
          <CardDescription className="text-xs">{description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <List
          items={problems}
          noDataText={noDataText}
          renderItem={(problem, index) => (
            <div className="flex flex-row justify-start items-center gap-3">
              <div className="flex flex-row items-center gap-3 w-1/3">
                <Avatar>
                  <AvatarFallback>Q {index + 1}</AvatarFallback>
                </Avatar>
                <span>{problem.name}</span>
              </div>
              <div className="flex flex-row items-center gap-3 w-1/4">
                <Icon Icon={LuFileType} className="size-4" />
                <span className="text-slate-500">Problem Type</span>
                <Separator
                  orientation="vertical"
                  className="m-0 h-4 bg-accent"
                />
                {problem.problemType}
              </div>
              <div className="flex flex-row items-center gap-3 w-1/4">
                <Icon Icon={IoIosSwitch} className="size-4" />
                <span className="text-slate-500">Problem Mode</span>
                <Separator
                  orientation="vertical"
                  className="m-0 h-4 bg-accent"
                />
                {problem.problemMode}
              </div>
              <div className="flex flex-row items-center gap-3 ml-auto">
                <Button
                  variant="icon"
                  className="text-secondary"
                  onClick={() => onSelectProblem(problem)}
                >
                  <FaEye />
                </Button>
              </div>
            </div>
          )}
        />
      </CardContent>
    </Card>
  );
};

DisplayProblem.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  problems: PropTypes.array,
  noDataText: PropTypes.string,
  problemIcon: PropTypes.func,
  onSelectProblem: PropTypes.func,
};

export default DisplayProblem;
