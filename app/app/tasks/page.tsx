import Todos from "@/components/Screens/Tasks/Tasks";

import React from "react";

function TodosPage() {
  return (
    <div className=" h-full flex-1 flex-col space-y-8 p-1 ">
      <Todos />
    </div>
  );
}

export default TodosPage;
