export function Sidebar() {

  return (
    <div className="bg-light dark:bg-dark rounded-lg shadow-lg col-span-1 p-6 flex flex-col gap-4 overflow-y-auto overflow-x-hidden">
      <img className="rounded-md" src="/public/makin.jpeg"/>
      <h1 className="text-3xl"><strong>Thomas Makin</strong></h1>
      <div className="flex flex-col gap-2">
        <p>Engineer</p>
        <p>OSS contributor</p>
        <p>IT hobbyist</p>
        <p>Framework owner</p>
        <p>Phone folder</p>
        <p>Amateur cyclist</p>
        <p>Beer enthusiast</p>
      </div>
    </div>
  );
}

export default Sidebar;
