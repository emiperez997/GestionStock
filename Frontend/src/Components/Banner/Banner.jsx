function Banner({ text }) {
  return (
    <div className="bg-gray-800 border-gray-200 dark:bg-white w-full h-60 dark:text-gray-800 flex justify-center items-center">
      <h1 className="text-3xl mx-5 font-bold">{text}</h1>
    </div>
  );
}

export { Banner };
