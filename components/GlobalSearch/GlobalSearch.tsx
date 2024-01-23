import { Input } from "../ui/input";

export function GlobalSearch() {
    return (
      <div>
        <Input
          type="search"
          placeholder="Search..."
          className="md:w-[100px] lg:w-[400px]"
        />
      </div>
    )
  }