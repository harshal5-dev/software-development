import { Boxes } from "lucide-react";
import { IoMdAddCircle } from "react-icons/io";
import { RiRefreshFill } from "react-icons/ri";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import ModuleList from "./moduleList/ModuleList";
import CreateUpdateModule from "./createUpdateModule/CreateUpdateModule";
import { useGetModuleQuery } from "./moduleApi";

const Module = () => {
  const moduleResponse = useGetModuleQuery();
  const { refetch, isLoading } = moduleResponse;

  return (
    <Card>
      <CardHeader className="flex flex-row space-y-0">
        <div className="flex aspect-square size-12 mr-3 items-center justify-center rounded-lg bg-accent text-accent-foreground">
          <Icon Icon={Boxes} className="size-7" />
        </div>
        <div>
          <CardTitle className="text-xl">Module</CardTitle>
          <CardDescription className="text-xs">
            List of all modules in the database.
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
          <CreateUpdateModule
            dialogTriggerButton={
              <Button icon={IoMdAddCircle} disabled={isLoading}>
                Module
              </Button>
            }
          />
        </div>
      </CardHeader>
      <CardContent>
        <ModuleList moduleResponse={moduleResponse} />
      </CardContent>
    </Card>
  );
};

export default Module;
