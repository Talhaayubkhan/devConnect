import ConnectionCards from "./ConnectionCards";
import { useFetchConnections } from "../hooks/useFetchConnections";

const Connections = () => {
  const { connectionData } = useFetchConnections();

  return (
    <div className="p-6">
      <h2 className="text-5xl mb-7 text-center font-bold text-white hover:text-indigo-400 transition-colors cursor-pointer">
        Connections
      </h2>
      <div className="flex justify-center items-center flex-col gap-10">
        {connectionData && connectionData.length > 0 ? (
          connectionData.map((connection) => (
            <ConnectionCards key={connection._id} connections={connection} />
          ))
        ) : (
          <p className="text-gray-500">No connections found.</p>
        )}
      </div>
    </div>
  );
};

export default Connections;
