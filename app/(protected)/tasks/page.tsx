import Todos from "@/components/Tasks/Tasks";

import React from "react";

function TodosPage() {
  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-1 md:flex">
      <Todos />
    </div>
  );
}

export default TodosPage;
