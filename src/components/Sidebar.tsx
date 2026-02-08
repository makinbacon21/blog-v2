export function Sidebar() {

  return (
    <div className="hidden md:flex flex-col bg-light dark:bg-dark rounded-lg shadow-lg col-span-1 p-6 gap-4 overflow-y-auto overflow-x-hidden">
      <img className="rounded-md" src="/public/makin.jpeg" />
      {/* extra col so mobile works */}
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl"><strong>Thomas Makin</strong></h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-1 gap-2">
          <p>Engineer</p>
          <p>OSS contributor</p>
          <p>IT hobbyist</p>
          <p>Framework owner</p>
          <p>Phone folder</p>
          <p>Amateur cyclist</p>
          <p>Beer enthusiast</p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
