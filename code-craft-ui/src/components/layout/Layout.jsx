import { Route, Routes } from "react-router-dom";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Module from "@/pages/module/Module";
import Dashboard from "@/pages/dashboard/Dashboard";
import CheatSheet from "@/pages/cheatSheet/CheatSheet";
import Lecture from "@/pages/lecture/Lecture";
import Problem from "@/pages/problem/Problem";
import CreateUpdateLecture from "@/pages/lecture/createUpdateLecture/CreateUpdateLecture";
import CreateUpdateProblem from "@/pages/problem/createUpdateProblem/CreateUpdateProblem";

import ProblemSolution from "@/pages/problemSolution/ProblemSolution";
import CreateUpdateProblemSolution from "@/pages/problemSolution/createUpdateProblemSolution/CreateUpdateProblemSolution";

import AppSidebar from "./Sidebar";
import Header from "./Header";
import SolutionViewer from "@/pages/solutionViewer/SolutionViewer";

function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <section className="m-7">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/cheat-sheet" element={<CheatSheet />} />
            <Route path="/module" element={<Module />} />
            <Route path="/lecture" element={<Lecture />} />
            <Route
              path="/create-update-lecture"
              element={<CreateUpdateLecture />}
            />
            <Route
              path="/create-update-problem"
              element={<CreateUpdateProblem />}
            />
            <Route path="/problem" element={<Problem />} />
            <Route path="/problem-solution" element={<ProblemSolution />} />
            <Route
              path="/create-update-problem-solution"
              element={<CreateUpdateProblemSolution />}
            />
            <Route path="/solution-viewer" element={<SolutionViewer />} />
            <Route path="*" element={<Dashboard />} />
          </Routes>
        </section>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default Layout;
