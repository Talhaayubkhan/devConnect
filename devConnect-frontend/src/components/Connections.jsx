import ConnectionCards from "./ConnectionCards";
import { useFetchConnections } from "../hooks/useFetchConnections";

const Connections = () => {
  const { connectionData } = useFetchConnections();

  return (
    <div className="p-6 min-h-screen bg-gradient-to-b from-slate-800 to-slate-900">
      <h2 className="text-5xl mb-8 text-center font-bold text-white hover:text-indigo-400 transition-colors cursor-pointer">
        My Connections
      </h2>
      {connectionData && connectionData.length > 0 ? (
        <div className="flex flex-col items-center gap-8">
          {connectionData.map((connection) => (
            <ConnectionCards key={connection._id} connections={connection} />
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-center text-lg mt-10">
          No connections found 🤝
        </p>
      )}
    </div>
  );
};

export default Connections;
