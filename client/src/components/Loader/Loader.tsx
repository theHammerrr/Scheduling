interface iLoaderProps extends React.PropsWithChildren {
  showLoader: boolean;
}

const Loader: React.FC<iLoaderProps> = ({
  showLoader,
  children,
}: iLoaderProps) => {
  //   useEffect(() => {
  //     if (!showLoader) return;

  //     sortWorker().then((result) => {});
  //   }, [showLoader]);

  //   const onWorkerSortClick = () => {
  //     sortWorker(numbers).then((result) => {
  //       console.log("Buble Sort useWorker()", result);
  //       //   addToast("Finished: Sort using useWorker.", { appearance: "success" });
  //     });
  //   };

  return (
    // <>{showLoader ? <img src="/animations/Bean-Eater.svg" /> : { children }}</>
    <>
      {showLoader ? (
        <img
          src="/animations/Bean-Eater.svg"
          style={{ mixBlendMode: "multiply" }}
        ></img>
      ) : (
        children
      )}
    </>
  );
};

export default Loader;
