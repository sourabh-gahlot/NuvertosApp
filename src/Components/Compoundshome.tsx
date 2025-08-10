import CompoundCard from "./CompoundCard";

export default function Compoundhome() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center mb-12 text-center">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-700 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4 ">
          Compound Gallery
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Explore the fascinating world of chemical compounds. Discover their
          structures, properties, and applications.
        </p>
      </div>
      <CompoundCard></CompoundCard>
    </div>
  );
}
